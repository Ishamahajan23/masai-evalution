const { User, Appointment, SupportTicket } = require('../model/hospital.model');
const { asyncHandler } = require('../utils/helpers');

const getAllUsers = (async (req, res) => {
  const { role, isActive, page = 1, limit = 10, search } = req.query;
  const query = {};

  if (role) query.role = role;
  if (isActive !== undefined) query.isActive = isActive === 'true';
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  const users = await User.find(query)
    .select('-password')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await User.countDocuments(query);

  res.status(200).json({
    success: true,
    data: {
      users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        total,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1
      }
    }
  });
});

const getSystemStats = (async (req, res) => {
  try {
    const [totalPatients, totalDoctors] = await Promise.all([
      User.countDocuments({ role: 'patient', isActive: true }),
      User.countDocuments({ role: 'doctor', isActive: true })
    ]);

    const appointmentsPerDoctor = await Appointment.aggregate([
      {
        $match: { status: { $ne: 'cancelled' } }
      },
      {
        $group: {
          _id: '$doctorId',
          appointmentCount: { $sum: 1 },
          completedAppointments: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'doctor'
        }
      },
      {
        $unwind: '$doctor'
      },
      {
        $project: {
          doctorName: '$doctor.name',
          specialization: '$doctor.specialization',
          appointmentCount: 1,
          completedAppointments: 1
        }
      },
      {
        $sort: { appointmentCount: -1 }
      }
    ]);

    const ticketsByPriority = await SupportTicket.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 },
          openTickets: {
            $sum: { $cond: [{ $eq: ['$status', 'open'] }, 1, 0] }
          },
          resolvedTickets: {
            $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] }
          }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const monthlyAppointmentStats = await Appointment.aggregate([
      {
        $match: {
          appointmentDate: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth() - 5, 1)
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$appointmentDate' },
            month: { $month: '$appointmentDate' }
          },
          totalAppointments: { $sum: 1 },
          completedAppointments: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          cancelledAppointments: {
            $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
          }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      },
      {
        $project: {
          month: {
            $concat: [
              { $toString: '$_id.year' },
              '-',
              { $toString: '$_id.month' }
            ]
          },
          totalAppointments: 1,
          completedAppointments: 1,
          cancelledAppointments: 1,
          _id: 0
        }
      }
    ]);

    // Overall system health metrics
    const systemHealth = await Promise.all([
      Appointment.countDocuments({ status: 'booked' }),
      SupportTicket.countDocuments({ status: 'open' }),
      SupportTicket.countDocuments({ status: 'in-progress' })
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalPatients,
          totalDoctors,
          totalAppointments: await Appointment.countDocuments(),
          totalTickets: await SupportTicket.countDocuments(),
          pendingAppointments: systemHealth[0],
          openTickets: systemHealth[1],
          inProgressTickets: systemHealth[2]
        },
        appointmentsPerDoctor,
        ticketsByPriority,
        monthlyAppointmentStats
      }
    });

  } catch (error) {
    console.error('Error fetching system stats:', error);
    throw error;
  }
});

const deactivateUser = (async (req, res) => {
  const { userId } = req.params;

  if (userId === req.user.id) {
    return res.status(400).json({
      success: false,
      error: 'Cannot deactivate your own account'
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  user.isActive = false;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'User deactivated successfully'
  });
});

// Reactivate user
const reactivateUser = (async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  user.isActive = true;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'User reactivated successfully'
  });
});

// Assign ticket to doctor
const assignTicketToDoctor = (async (req, res) => {
  const { ticketId } = req.params;
  const { doctorId } = req.body;

  if (!doctorId) {
    return res.status(400).json({
      success: false,
      error: 'Doctor ID is required'
    });
  }

  // Verify doctor exists and is active
  const doctor = await User.findOne({
    _id: doctorId,
    role: 'doctor',
    isActive: true
  });

  if (!doctor) {
    return res.status(404).json({
      success: false,
      error: 'Doctor not found or inactive'
    });
  }

  const ticket = await SupportTicket.findById(ticketId);
  if (!ticket) {
    return res.status(404).json({
      success: false,
      error: 'Ticket not found'
    });
  }

  if (ticket.status === 'resolved') {
    return res.status(400).json({
      success: false,
      error: 'Cannot reassign a resolved ticket'
    });
  }

  ticket.assignedDoctorId = doctorId;
  ticket.status = 'in-progress';
  await ticket.save();

  const updatedTicket = await SupportTicket.findById(ticketId)
    .populate('patientId', 'name email')
    .populate('assignedDoctorId', 'name specialization');

  res.status(200).json({
    success: true,
    message: 'Ticket assigned successfully',
    data: { ticket: updatedTicket }
  });
});

const getAllAppointments = (async (req, res) => {
  const { status, doctorId, patientId, page = 1, limit = 10 } = req.query;
  const query = {};

  if (status) query.status = status;
  if (doctorId) query.doctorId = doctorId;
  if (patientId) query.patientId = patientId;

  const appointments = await Appointment.find(query)
    .populate('patientId', 'name email')
    .populate('doctorId', 'name specialization')
    .sort({ appointmentDate: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Appointment.countDocuments(query);

  res.status(200).json({
    success: true,
    data: {
      appointments,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        total,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1
      }
    }
  });
});

const getAllTickets =(async (req, res) => {
  const { status, priority, assignedDoctorId, page = 1, limit = 10 } = req.query;
  const query = {};

  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (assignedDoctorId) query.assignedDoctorId = assignedDoctorId;

  const tickets = await SupportTicket.find(query)
    .populate('patientId', 'name email')
    .populate('assignedDoctorId', 'name specialization')
    .sort({ priority: -1, createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await SupportTicket.countDocuments(query);

  res.status(200).json({
    success: true,
    data: {
      tickets,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        total,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1
      }
    }
  });
});

module.exports = {
  getAllUsers,
  getSystemStats,
  deactivateUser,
  reactivateUser,
  assignTicketToDoctor,
  getAllAppointments,
  getAllTickets
};

const mongoose = require('mongoose');
const { User, Appointment, SupportTicket } = require('../model/hospital.model');


const getMyAppointments = (async (req, res) => {
  const { status, date, page = 1, limit = 10 } = req.query;
  const query = { doctorId: req.user.id };

  if (status) query.status = status;
  if (date) {
    const startDate = new Date(date);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);
    query.appointmentDate = { $gte: startDate, $lt: endDate };
  }

  const appointments = await Appointment.find(query)
    .populate('patientId', 'name email')
    .sort({ appointmentDate: 1 })
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

const updateAppointment = (async (req, res) => {
  const { appointmentId } = req.params;
  const { prescription, notes, status } = req.body;

  const appointment = await Appointment.findOne({
    _id: appointmentId,
    doctorId: req.user.id
  });

  if (!appointment) {
    return res.status(404).json({
      success: false,
      error: 'Appointment not found or not assigned to you'
    });
  }

  if (appointment.status === 'cancelled') {
    return res.status(400).json({
      success: false,
      error: 'Cannot update a cancelled appointment'
    });
  }

  // Start transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Update appointment
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        ...(prescription && { prescription }),
        ...(notes && { notes }),
        ...(status && { status })
      },
      { new: true, session }
    ).populate('patientId', 'name email');

    // If appointment is completed, add to patient's medical history
    if (status === 'completed') {
      await User.findByIdAndUpdate(
        appointment.patientId,
        {
          $push: {
            medicalHistory: {
              appointmentId: appointment._id,
              diagnosis: prescription || 'No prescription provided',
              notes: notes || 'No additional notes',
              date: new Date()
            }
          }
        },
        { session }
      );
    }

    await session.commitTransaction();

    res.status(200).json({
      success: true,
      message: 'Appointment updated successfully',
      data: { appointment: updatedAppointment }
    });

  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
});

const getMyTickets = (async (req, res) => {
  const { status, priority, page = 1, limit = 10 } = req.query;
  const query = { assignedDoctorId: req.user.id };

  if (status) query.status = status;
  if (priority) query.priority = priority;

  const tickets = await SupportTicket.find(query)
    .populate('patientId', 'name email')
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

const updateTicket = (async (req, res) => {
  const { ticketId } = req.params;
  const { status, resolution } = req.body;

  if (!status) {
    return res.status(400).json({
      success: false,
      error: 'Status is required'
    });
  }

  const ticket = await SupportTicket.findOne({
    _id: ticketId,
    assignedDoctorId: req.user.id
  });

  if (!ticket) {
    return res.status(404).json({
      success: false,
      error: 'Ticket not found or not assigned to you'
    });
  }

  if (ticket.status === 'resolved') {
    return res.status(400).json({
      success: false,
      error: 'Cannot update a resolved ticket'
    });
  }

  const updateData = { status };
  if (status === 'resolved') {
    updateData.closedAt = new Date();
    if (resolution) updateData.resolution = resolution;
  }

  const updatedTicket = await SupportTicket.findByIdAndUpdate(
    ticketId,
    updateData,
    { new: true }
  ).populate('patientId', 'name email');

  res.status(200).json({
    success: true,
    message: 'Ticket updated successfully',
    data: { ticket: updatedTicket }
  });
});

const getDashboardStats =   (async (req, res) => {
  const doctorId = req.user.id;

  const [
    totalAppointments,
    todayAppointments,
    pendingTickets,
    completedAppointments
  ] = await Promise.all([
    Appointment.countDocuments({ doctorId }),
    Appointment.countDocuments({
      doctorId,
      appointmentDate: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lt: new Date().setHours(23, 59, 59, 999)
      }
    }),
    SupportTicket.countDocuments({
      assignedDoctorId: doctorId,
      status: { $in: ['open', 'in-progress'] }
    }),
    Appointment.countDocuments({
      doctorId,
      status: 'completed'
    })
  ]);

  res.status(200).json({
    success: true,
    data: {
      stats: {
        totalAppointments,
        todayAppointments,
        pendingTickets,
        completedAppointments
      }
    }
  });
});

module.exports = {
  getMyAppointments,
  updateAppointment,
  getMyTickets,
  updateTicket,
  getDashboardStats
};

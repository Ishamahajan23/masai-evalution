const mongoose = require('mongoose');
const { User, Appointment, SupportTicket } = require('../model/hospital.model');

const bookAppointment = (async (req, res) => {
  const { doctorId, appointmentDate, symptoms } = req.body;
  const patientId = req.user.id;

  // Validation
  if (!doctorId || !appointmentDate || !symptoms) {
    return res.status(400).json({
      success: false,
      error: 'Please provide all required fields'
    });
  }

  // Validate appointment time
  if (!(appointmentDate)) {
    return res.status(400).json({
      success: false,
      error: 'Appointment must be in the future and within business hours (9 AM - 5 PM)'
    });
  }

  // Check if doctor exists and is active
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

  // Start transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Create appointment
    const appointment = await Appointment.create([{
      patientId,
      doctorId,
      appointmentDate,
      symptoms
    }], { session });

    await session.commitTransaction();

    // Populate appointment data
    const populatedAppointment = await Appointment.findById(appointment[0]._id)
      .populate('patientId', 'name email')
      .populate('doctorId', 'name specialization');

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: { appointment: populatedAppointment }
    });

  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
});

const getMyAppointments = (async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;
  const query = { patientId: req.user.id };
  
  if (status) {
    query.status = status;
  }

  const appointments = await Appointment.find(query)
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

// Cancel appointment
const cancelAppointment = (async (req, res) => {
  const { appointmentId } = req.params;

  const appointment = await Appointment.findOne({
    _id: appointmentId,
    patientId: req.user.id,
    status: 'booked'
  });

  if (!appointment) {
    return res.status(404).json({
      success: false,
      error: 'Appointment not found or cannot be cancelled'
    });
  }

  // Start transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Update appointment status
    appointment.status = 'cancelled';
    await appointment.save({ session });

    // Add to medical history
    await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          medicalHistory: {
            appointmentId: appointment._id,
            diagnosis: 'Appointment cancelled',
            notes: 'Patient cancelled the appointment',
            date: new Date()
          }
        }
      },
      { session }
    );

    await session.commitTransaction();

    res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully'
    });

  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
});

// Raise support ticket
const raiseSupportTicket = (async (req, res) => {
  const { title, description, priority = 'medium' } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      success: false,
      error: 'Please provide title and description'
    });
  }

  const ticket = await SupportTicket.create({
    title,
    description,
    priority,
    patientId: req.user.id
  });

  const populatedTicket = await SupportTicket.findById(ticket._id)
    .populate('patientId', 'name email');

  res.status(201).json({
    success: true,
    message: 'Support ticket created successfully',
    data: { ticket: populatedTicket }
  });
});

// Get patient's support tickets
const getMySupportTickets = (async (req, res) => {
  const { status, priority, page = 1, limit = 10 } = req.query;
  const query = { patientId: req.user.id };

  if (status) query.status = status;
  if (priority) query.priority = priority;

  const tickets = await SupportTicket.find(query)
    .populate('assignedDoctorId', 'name specialization')
    .sort({ createdAt: -1 })
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
  bookAppointment,
  getMyAppointments,
  cancelAppointment,
  raiseSupportTicket,
  getMySupportTickets
};
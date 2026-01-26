const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['patient', 'doctor', 'admin'],
    required: true
  },
  specialization: {
    type: String,
    required: function() { return this.role === 'doctor'; }
  },
  medicalHistory: [{
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment'
    },
    diagnosis: String,
    notes: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['booked', 'completed', 'cancelled'],
    default: 'booked'
  },
  symptoms: {
    type: String,
    required: true
  },
  prescription: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Support Ticket Schema
const supportTicketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved'],
    default: 'open'
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedDoctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  closedAt: Date,
  resolution: String
}, {
  timestamps: true
});

appointmentSchema.pre('save', async function(next) {
  if (this.isNew) {
    const startTime = new Date(this.appointmentDate);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    const overlappingAppointment = await mongoose.model('Appointment').findOne({
      doctorId: this.doctorId,
      status: { $ne: 'cancelled' },
      appointmentDate: {
        $gte: startTime,
        $lt: endTime
      }
    });

    if (overlappingAppointment) {
      const error = new Error('Doctor already has an appointment at this time');
      error.statusCode = 400;
      return next(error);
    }
  }
  next();
});

const User = mongoose.model('User', userSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);
const SupportTicket = mongoose.model('SupportTicket', supportTicketSchema);

module.exports = {
  User,
  Appointment,
  SupportTicket
};
const express = require('express');
const {
  getMyAppointments,
  updateAppointment,
  getMyTickets,
  updateTicket,
  getDashboardStats
} = require('../controllers/doctor.controller');
const { authenticate, authorize } = require('../middleware/auth');

const docrouter = express.Router();

docrouter.use(authenticate);
docrouter.use(authorize('doctor'));

docrouter.get('/dashboard', getDashboardStats);

docrouter.get('/appointments', getMyAppointments);
docrouter.patch('/appointments/:appointmentId', updateAppointment);

docrouter.get('/tickets', getMyTickets);
docrouter.patch('/tickets/:ticketId', updateTicket);

module.exports = docrouter;
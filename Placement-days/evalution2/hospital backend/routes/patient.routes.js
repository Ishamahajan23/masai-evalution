const express = require('express');
const {
  bookAppointment,
  getMyAppointments,
  cancelAppointment,
  raiseSupportTicket,
  getMySupportTickets
} = require('../controllers/patient.controller');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);
router.use(authorize('patient'));

router.post('/appointments', bookAppointment);
router.get('/appointments', getMyAppointments);
router.patch('/appointments/:appointmentId/cancel', cancelAppointment);

router.post('/tickets', raiseSupportTicket);
router.get('/tickets', getMySupportTickets);

module.exports = router;
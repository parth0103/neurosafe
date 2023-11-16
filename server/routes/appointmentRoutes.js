import express from 'express';
const router = express.Router();
import { createAppointment, getTherapistAppointments, getPatientAppointments } from '../controllers/appointmentControllers.js';

router.post('/', createAppointment);
router.get('/therapist/:userId', getTherapistAppointments);
router.get('/patient/:userId/', getPatientAppointments);

export default router;
import Appointment from "../models/appointmentModel.js";
// import User from "../models/userModel";

export const createAppointment = async (req, res) => {
  const { therapist, patient, date, prescription, comment } = req.body;
  try {
    const appointment = await Appointment.create({
      therapist,
      patient,
      date,
      prescription,
      comment,
    });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};


export const getPatientAppointments = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const currentDate = new Date();

    const pastAppointments = await Appointment.find({
      patient: userId,
      date: { $lt: currentDate },
    }).sort({date:-1}).populate("patient", "name profilePic email");
    console.log(pastAppointments);
    const upcomingAppointments = await Appointment.find({
      patient: userId,
      date: { $gt: currentDate },
    }).sort({date:1}).populate("patient", "name profilePic email");

    res.status(200).json({ pastAppointments, upcomingAppointments });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};


export const getTherapistAppointments = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const currentDate = new Date();

    const pastAppointments = await Appointment.find({
      therapist: userId,
      date: { $lt: currentDate },
    }).populate("therapist", "name profilePic email");
    console.log(pastAppointments);
    const upcomingAppointments = await Appointment.find({
      therapist: userId,
      date: { $gt: currentDate },
    }).populate("therapist", "name profilePic email");

    res.status(200).json({ pastAppointments, upcomingAppointments });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

import { mongoose } from "mongoose";

const appointmentSchema = mongoose.Schema(
  {
    therapist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    prescription: {
      type: String,
    },
    comment: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const appointmentModel = mongoose.model("Appointment", appointmentSchema);
export default appointmentModel;
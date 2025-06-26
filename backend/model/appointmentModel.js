const { Schema, model } = require("mongoose");

const appointmentSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Patient",
    },
    clinic: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Clinic",
    },
    receptionist: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Appointment", appointmentSchema);

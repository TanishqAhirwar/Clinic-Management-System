const { Schema, model } = require("mongoose");

const patientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    receptionist: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    clinic: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Clinic",
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    diagnose: {
      type: String,
      required: true,
    },
    MedicalHistory: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Patient", patientSchema);

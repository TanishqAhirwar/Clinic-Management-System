const Appointment = require("../model/appointmentModel");
require("../model/patientModel");
require("../model/clinicModel");
require("../model/userModel");
const ApiResponse = require("../response/pattern");

async function bookAppointment(req, res) {
  const { patient, date, time, status } = req.body;
  try {
    let appointment = await Appointment.create({
      patient,
      clinic: req.user.clinic,
      date,
      time,
      status,
      receptionist: req.user._id,
    });

    if (!appointment) {
      return res.json(new ApiResponse(false, null, "appointment not book"));
    }

    return res.json(
      new ApiResponse(true, appointment, "appointment booked successfully")
    );
  } catch (error) {
    console.error(error);
    return res.json(new ApiResponse(false, null, error.message));
  }
}

async function getAllAppointments(req, res) {
  try {
    let appointments = await Appointment.find()
      .populate("Patient", "name")
      .populate("Clinic", "name");

    if (!appointments) {
      return res.json(new ApiResponse(false, null, "appointments not found"));
    }

    return res.json(new ApiResponse(true, appointments, "success"));
  } catch (error) {
    console.error(error);
    return res.json(new ApiResponse(false, null, error.message));
  }
}

const getAppointmentsByClinic = async (req, res) => {
  try {
    const { clinicId } = req.params;

    const appointments = await Appointment.find({ clinic: clinicId })
      .populate("patient", "name")
      .populate("clinic", "name");

    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    const filteredAppointments = appointments.filter(
      (d) => d.date === formattedDate
    );

    if (!filteredAppointments || filteredAppointments.length === 0) {
      return res.json(new ApiResponse(true, [], "No patients found"));
    }

    return res.json(
      new ApiResponse(
        true,
        filteredAppointments,
        "Appointments fetched successfully"
      )
    );
  } catch (error) {
    console.error(error);
    return res.json(new ApiResponse(false, null, error.message));
  }
};

// PUT /api/appointments/:id/status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "completed", "cancelled"].includes(status)) {
      return res
        .status(400)
        .json(new ApiResponse(false, null, "Invalid status value"));
    }

    const updated = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json(new ApiResponse(false, null, "Appointment not found"));
    }

    return res.json(
      new ApiResponse(true, updated, "Appointment status updated successfully")
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiResponse(false, null, "Server Error"));
  }
};

module.exports = {
  bookAppointment,
  getAllAppointments,
  getAppointmentsByClinic,
  updateAppointmentStatus,
};

const express = require("express");
const authMiddleware = require('../middleware/authMiddileware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { getAllAppointments, bookAppointment, getAppointmentsByClinic, updateAppointmentStatus } = require("../controller/appointmentController");
const router = express.Router();

// http://localhost:8000/api/appointments
router.post("/",authMiddleware,roleMiddleware("Receptionist"), bookAppointment);

// http://localhost:8000/api/appointments
router.get("/",authMiddleware,roleMiddleware("Doctor"), getAllAppointments);

// http://localhost:8000/api/appointments/clinic/:clinicId
router.get("/clinic/:clinicId", authMiddleware, roleMiddleware("Doctor"), getAppointmentsByClinic);

// http://localhost:8000/api/appointments/:id
router.put("/:id", authMiddleware, roleMiddleware("Doctor"), updateAppointmentStatus)

module.exports = router;
const express = require('express');
const router = express.Router();

const authRoutes = require("../routes/authRoute")
const clinicRoutes = require("../routes/clinicRoutes")
const Patients = require("../routes/patientRoutes")
const Appointments = require("../routes/appointmentRoutes")
const User = require("../routes/userRoute")

router.use('/auth', authRoutes); 

router.use('/clinics', clinicRoutes);

router.use('/patients',Patients);

router.use('/appointments',Appointments);

router.use('/add-receptionist',User)

module.exports = router;
const express = require('express');
const { addPatients, getMyPatients, getPatientsByClinic } = require('../controller/patientController');
const authMiddleware = require('../middleware/authMiddileware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

// http://localhost:8000/api/patients
router.post("/",authMiddleware,roleMiddleware("Receptionist"), addPatients);

// http://localhost:8000/api/patients
router.get("/",authMiddleware,roleMiddleware("Doctor","Receptionist"), getMyPatients);

// http://localhost:8000/api/patients/clinic/:clinicId
router.get("/clinic/:clinicId", authMiddleware, roleMiddleware("Doctor"), getPatientsByClinic);

module.exports = router;
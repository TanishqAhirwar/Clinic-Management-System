const express = require("express");
const {getAllClinics, getClinicById} = require("../controller/clinicController")
const authMiddleware = require('../middleware/authMiddileware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

// http://localhost:8000/api/clinics
router.get('/',authMiddleware,roleMiddleware("Doctor"), getAllClinics);

// http://localhost:8000/api/clinics/:id
router.get("/:id",authMiddleware,roleMiddleware("Receptionist"), getClinicById);

module.exports = router;
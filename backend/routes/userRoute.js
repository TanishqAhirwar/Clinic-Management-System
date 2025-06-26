const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddileware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { addReceptionist } = require('../controller/userController');

// Only Doctor can access this router
// http://localhost:8000/api/doctor
router.get('/doctor',authMiddleware,roleMiddleware('Doctor'),  (req, res) => {
   res.json({message: "Welcome Doctor"})
});

// Only Receptionist can access this router
// http://localhost:8000/api/receptionist
router.get('/receptionist',authMiddleware, roleMiddleware('Receptionist'), (req, res) => {
   res.json({message: "Welcome Receptionist"})
});

// http://localhost:8000/api/add-receptionist
router.post('/',authMiddleware,roleMiddleware('Doctor'), addReceptionist)

module.exports = router;
const express = require("express");
const { userLogin } = require("../controller/userController");
const router = express.Router();

// http://localhost:8000/api/login
router.post("/login", userLogin);

module.exports = router;
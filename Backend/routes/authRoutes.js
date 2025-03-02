const express = require("express");
const { registerUser, loginUser } = require("../controller/authController"); // Update with your actual path

const router = express.Router();

// Route for registering a user
router.post("/signup", registerUser);

// Route for logging in a user
router.post("/login", loginUser);

module.exports = router;

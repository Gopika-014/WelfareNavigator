const express = require("express");
const { getUserProfile } = require("../controllers/userController");
const { isAuthenticated } = require("../middleware/authMiddleware");

const router = express.Router();

// Profile Route
router.get("/user-profile", isAuthenticated, getUserProfile);

module.exports = router;

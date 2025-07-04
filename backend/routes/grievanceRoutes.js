const express = require("express");
const { submitGrievance, getAllGrievances, resolveGrievance ,getGrievancesByUserId,getChatbotResponse} = require("../controllers/grievanceController");
const { isAuthenticated} = require("../middleware/authMiddleware");

const router = express.Router();

// User submits a grievance
router.post("/submit",isAuthenticated,express.urlencoded({ extended: true }),submitGrievance);

// User fetches their grievances
router.get("/allgrievances", getAllGrievances);
router.get("/user/:userId",isAuthenticated,getGrievancesByUserId);
// Admin resolves a grievance
router.put("/resolve/:id",resolveGrievance);
router.post("/chatbot",getChatbotResponse);

module.exports = router;

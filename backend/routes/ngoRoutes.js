const express = require("express");
const router = express.Router();
const { getAllNGOs } = require("../controllers/ngoController");

// Route: GET /api/ngos — fetch all NGOs
router.get("/ngo", getAllNGOs);

module.exports = router;

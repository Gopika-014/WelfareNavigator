const express = require("express");
const router = express.Router();
const { getRationDataByState } = require("../controllers/rationInfoController");

// Route for fetching ration data by state
router.get("/state/:state", getRationDataByState);

module.exports = router;

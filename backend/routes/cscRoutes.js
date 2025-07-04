const express = require("express");
const { getCscCenters ,getCscFilters} = require("../controllers/cscController");

const router = express.Router();

// Define route to fetch CSC centers
router.get("/csc-centers", getCscCenters);
router.get("/csc-filters", getCscFilters);

module.exports = router;

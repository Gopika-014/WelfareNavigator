const express = require("express");
const router = express.Router();

const { fetchCommoditiesByStateAndCard } = require("../controllers/commodityController");

router.post("/fetch", fetchCommoditiesByStateAndCard);

module.exports = router;

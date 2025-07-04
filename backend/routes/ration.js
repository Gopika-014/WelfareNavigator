const express = require("express");
const router = express.Router();
const RationCard = require("../models/RationCard");

router.post("/ration-card-schemes", async (req, res) => {
  try {
    const { rationCardType, state, category } = req.body; // Use req.body instead of req.query

    let query = {};

    // Apply Ration Card Type filter if provided
    if (rationCardType) {
      query.rationCardType = rationCardType;
    }

    const rationCardData = await RationCard.find(query);

    if (!rationCardData.length) {
      return res.status(404).json({ message: "No schemes found for the given filters." });
    }

    let responseData = [];

    rationCardData.forEach((card) => {
      let filteredSchemes = {
        rationCardType: card.rationCardType,
        generalBenefits: card.generalBenefits,
        nationalSchemes: card.nationalSchemes,
        stateSchemes: [],
      };

      // **Fix for State-wise filtering**
      if (state) {
        const stateData = card.stateSchemes.filter(
          (item) => item.state.toLowerCase() === state.toLowerCase()
        );
        filteredSchemes.stateSchemes = stateData;
      } else {
        filteredSchemes.stateSchemes = card.stateSchemes;
      }

      // **Fix for Category-based filtering**
      if (category === "national") {
        filteredSchemes.stateSchemes = []; // Only national schemes should be returned
      } else if (category === "state") {
        filteredSchemes.nationalSchemes = []; // Only state schemes should be returned
      }

      responseData.push(filteredSchemes);
    });

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
});

module.exports = router;

const Commodity = require("../models/Commodity");

const fetchCommoditiesByStateAndCard = async (req, res) => {
  const { state, cardType } = req.body;

  console.log("Commodity request payload:", req.body);

  try {
    let query = {};

    // Filter by state if provided
    if (state) {
      query.state = state;
    }

    const stateDataList = await Commodity.find(query);

    if (!stateDataList || stateDataList.length === 0) {
      return res.status(404).json({ message: "No commodities found for the given criteria." });
    }

    let matchedCommodities = [];

    // Loop through each state's commodity list
    stateDataList.forEach((stateData) => {
      const filtered = stateData.commodities.filter((item) => {
        if (cardType) {
          if (!item.cardType) return false;

          // Support multiple card types like "PHH, AAY"
          const itemCardTypes = item.cardType
            .split(",")
            .map((type) => type.trim().toLowerCase());

          return itemCardTypes.includes(cardType.toLowerCase());
        }

        // If no cardType specified, include all
        return true;
      });

      matchedCommodities.push(...filtered);
    });

    if (matchedCommodities.length === 0) {
      return res.status(404).json({ message: "No commodities found for the given card type." });
    }

    res.status(200).json(matchedCommodities);
  } catch (err) {
    console.error("Error fetching commodities:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { fetchCommoditiesByStateAndCard };

/*const Scheme = require("../models/rationScheme");

const fetchSchemesByCardType = async (req, res) => {
  const { cardType } = req.body;

  console.log("Scheme fetch payload:", req.body);

  try {
    if (!cardType) {
      return res.status(400).json({ message: "cardType is required." });
    }

    const schemes = await Scheme.find({
      eligibleCardTypes: { $in: [cardType.toUpperCase()] },
    });

    if (!schemes || schemes.length === 0) {
      return res.status(404).json({ message: "No schemes found for the given card type." });
    }

    res.status(200).json(schemes);
  } catch (error) {
    console.error("Error fetching schemes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { fetchSchemesByCardType };*/

/*const Scheme = require("../models/rationScheme");

const fetchSchemesByCardType = async (req, res) => {
  let { cardType, schemeType } = req.body;

  console.log("Scheme fetch payload:", req.body);

  try {
    const query = {};

    // Normalize cardType and schemeType
    cardType = cardType?.toUpperCase();
    schemeType = schemeType?.toLowerCase();

    // Handle cardType filter
    if (cardType && cardType !== "ALL") {
      query.eligibleCardTypes = { $in: [cardType] };
    }

    // Handle schemeType filter
    if (schemeType && schemeType !== "all") {
      if (schemeType === "central") {
        query.state = "All India";
      } else {
        query.state = { $ne: "All India" }; // Exclude central schemes
      }
      
    }

    const schemes = await Scheme.find(query);

    if (!schemes || schemes.length === 0) {
      return res.status(404).json({ message: "No schemes found for the selected filters." });
    }

    res.status(200).json(schemes);
  } catch (error) {
    console.error("Error fetching schemes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { fetchSchemesByCardType };*/
/*const Scheme = require("../models/rationScheme");

const fetchSchemesByCardType = async (req, res) => {
  let { cardType, schemeType } = req.body;

  console.log("Scheme fetch payload:", req.body);

  try {
    const query = {};

    // Normalize inputs
    cardType = cardType?.toUpperCase();
    schemeType = schemeType?.toLowerCase();

    // Apply cardType filter if not 'ALL' or empty
    if (cardType && cardType !== "ALL") {
      query.eligibleCardTypes = { $in: [cardType] };
    }

    // Apply schemeType filter
    if (schemeType && schemeType !== "all") {
      if (schemeType === "central") {
        query.state = "All India"; // Central schemes
      } else if (schemeType === "state") {
        query.state = { $ne: "All India" }; // Only state schemes
      }
    }

    // Fetch schemes based on filters
    const schemes = await Scheme.find(query);

    res.status(200).json(schemes); // Always return 200 (even if empty array)
  } catch (error) {
    console.error("Error fetching schemes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { fetchSchemesByCardType };*/


const Scheme = require("../models/rationScheme");

const fetchSchemesByCardType = async (req, res) => {
  let { cardType, schemeType } = req.body;

  console.log("Scheme fetch payload:", req.body);

  try {
    const query = {};

    // Normalize inputs
    cardType = cardType?.toUpperCase();
    schemeType = schemeType?.toLowerCase();

    if (cardType && cardType !== "ALL") {
      query.eligibleCardTypes = { $in: [cardType] };
    }

    if (schemeType && schemeType !== "all") {
      if (schemeType === "central") {
        query.state = "All India";
      } else if (schemeType === "state") {
        query.state = { $ne: "All India" };
      }
    }

    const schemes = await Scheme.find(query);

    res.status(200).json(schemes);
  } catch (error) {
    console.error("Error fetching schemes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const fetchSchemesByState = async (req, res) => {
  console.log("raeched fetch scheme by state");
  const { state } = req.body;

  if (!state) {
    return res.status(400).json({ message: "State is required." });
  }

  try {
    const schemes = await Scheme.find({
      state: new RegExp(`^${state}$`, "i"), // case-insensitive exact match
    });

    res.status(200).json(schemes);
  } catch (error) {
    console.error("Error fetching schemes by state:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Export both
module.exports = {
  fetchSchemesByCardType,
  fetchSchemesByState,
};

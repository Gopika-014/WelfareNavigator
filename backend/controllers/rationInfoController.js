// controllers/rationController.js
const Commodity = require("../models/Commodity");
const Gift = require("../models/Gift");
const Scheme = require("../models/rationScheme");

const getRationDataByState = async (req, res) => {
  try {
    const state = req.params.state;

    const [commodities, gifts, schemes] = await Promise.all([
      Commodity.findOne({ state }),
      Gift.find({ state }),
      Scheme.find({ state }),
    ]);

    res.status(200).json({
      commodities,
      gifts,
      schemes,
    });
  } catch (err) {
    console.error("Error fetching ration data:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getRationDataByState };

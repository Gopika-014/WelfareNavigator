const NGO = require("../models/ngoModel");

const getAllNGOs = async (req, res) => {
  try {
    const ngos = await NGO.find({});
    res.status(200).json({ success: true, data: ngos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllNGOs };

// models/Commodity.js
const mongoose = require("mongoose");

const commoditySchema = new mongoose.Schema({
  state: { type: String, required: true },
  commodities: [
    {
      name: { type: String, required: true },
      scaleOfSupply: { type: String, required: true },
      price: { type: String, required: true },
      remarks: { type: String, required: true },
      cardType: { type: String, required: true }, // e.g. AAY, PHH, etc.
    },
  ],
});

module.exports = mongoose.model("Commodity", commoditySchema);

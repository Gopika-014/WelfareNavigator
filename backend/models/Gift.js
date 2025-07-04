const mongoose = require("mongoose");

const giftSchema = new mongoose.Schema({
  state: { type: String, required: true },
  year: { type: Number, required: true },
  giftName: { type: String, required: true }, 
  cardType: [{ type: String, required: true }],
  giftItems: [
    {
      name: { type: String, required: true },
      quantity: { type: String },
      description: { type: String }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Gift", giftSchema);

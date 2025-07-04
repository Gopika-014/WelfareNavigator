const mongoose = require("mongoose");

const RationCardSchema = new mongoose.Schema(
  {
    rationCardType: {
      type: String,
      enum: ["AAY", "PHH", "BPL", "APL", "NPHH"],
      required: true,
      unique: true, // Ensure one entry per ration card type
    },
    description: {
      type: String,
      required: true, // Explanation of the ration card type
    },
    generalBenefits: {
      type: [String], // List of benefits (common across all states)
      required: true,
    },
    nationalSchemes: [
      {
        name: { type: String, required: true },
        description: { type: String, required: true },
        eligibilityCriteria: { type: String, required: true },
        applyLink: { type: String, required: false },
      },
    ],
    stateSchemes: [
      {
        state: { type: String, required: true }, // State name
        schemes: [
          {
            name: { type: String, required: true },
            description: { type: String, required: true },
            eligibilityCriteria: { type: String, required: true },
            applyLink: { type: String, required: false },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("RationCard", RationCardSchema);

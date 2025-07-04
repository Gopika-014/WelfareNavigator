const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  objective: {
    type: String,
    required: true,
  },
  benefits: {
    type: String,
    required: true,
  },
  eligibleCardTypes: [
    {
      type: String, // e.g., "AAY", "PHH", "BPL", "APL", "NPHH"
      uppercase: true,
      trim: true,
    },
  ],
  applyLink: {
    type: String,
    default: '',
  },
  state: {
    type: String,
    default: 'All India', // Use specific state if needed
  },
  launchedBy: {
    type: String,
    default: 'Central Government',
  },
  additionalInfo: {
    type: String,
  },
  components: [
    {
      name: { type: String, required: true },
      benefit: { type: String, required: true }
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('RationScheme', schemeSchema);

const mongoose = require("mongoose");

const ngoSchema = new mongoose.Schema({
  name: String,
  sector: String,
  district: String,
  address: String,
  phone: String,
  email: String,
  support: [String],
  languages: [String],
  availability: String,
  website: String
});
module.exports = mongoose.model('NGO', ngoSchema);

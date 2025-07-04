
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  profile: {
    gender: String,
    dob: String,
    incomeLevel: String,
    education: String,
    occupation: String,
    address: String,
    profilePicture: String,
    casteCategory: String, // e.g., SC/ST/OBC/General/EWS
    religion: String, // e.g., Hindu/Muslim/Christian etc.
    state: String,
    documents: [String], // Array of document URLs
  },
});

module.exports = mongoose.model("User", UserSchema);

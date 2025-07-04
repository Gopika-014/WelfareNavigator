/*const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  eligibility: { type: String, required: true },
  applicationProcess: String,
  applyLink: String,
  benefits: String,
  documentsRequired: [String],
  contactDetails: String,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Linking to Category
  schemeType: { type: String, enum: ["central", "state"], required: true },
  stateName: { type: String }, // Only for state-specific schemes
});

const Scheme = mongoose.model("Scheme", schemeSchema);
module.exports = Scheme;*/
/*const mongoose = require("mongoose");


const schemeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  eligibility: { type: String, required: true },
  applicationProcess: String,
  applyLink: String,
  benefits: String,
  documentsRequired: [String],
  contactDetails: String,
  categoryId: { type: Number, required: true, ref: "Category" }, // Linking to Category
  schemeType: { type: String, enum: ["central", "state"], required: true },
  stateName: { type: String },
});

const Scheme = mongoose.model("Scheme", schemeSchema);
module.exports = Scheme;*/

const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  eligibility: { type: String, required: true },
  applicationProcess: String,
  applyLink: String,
  benefits: String,
  documentsRequired: [String],
  contactDetails: String,
  categoryId: { type: Number, required: true, ref: "Category" },
  schemeType: { type: String, enum: ["central", "state"], required: true },
  stateName: { type: String },
  //tags: [{ type: String }] // New field for filtering/search
});

const Scheme = mongoose.model("Scheme", schemeSchema);
module.exports = Scheme;

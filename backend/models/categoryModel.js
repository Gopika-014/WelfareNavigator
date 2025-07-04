const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;

const express = require("express");
const Category = require("../models/categoryModel");

const router = express.Router();

// Create a new category
router.post("/add", async (req, res) => {
  try {
    const { categoryId, name } = req.body;
    const category = new Category({ categoryId, name });
    await category.save();
    res.status(201).json({ message: "Category added successfully", category });
  } catch (error) {
    res.status(500).json({ error: "Failed to add category" });
  }
});

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

module.exports = router;

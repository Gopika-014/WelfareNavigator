const express = require("express");
const Scheme = require("../models/schemeModel");
const Category = require("../models/categoryModel");

const router = express.Router();


router.post("/add", async (req, res) => {
  try {
    const { 
      name, 
      description, 
      eligibility, 
      applicationProcess, 
      applyLink, 
      benefits, 
      documentsRequired, 
      contactDetails, 
      categoryId, 
      schemeType, 
      stateName 
    } = req.body;

    // 🔹 Ensure categoryId is a Number
    const categoryIdNumber = Number(categoryId);
    if (isNaN(categoryIdNumber)) {
      return res.status(400).json({ error: "Invalid category ID format" });
    }

    // 🔹 Validate category using `categoryId` as a number
    const category = await Category.findOne({ categoryId: categoryIdNumber });
    if (!category) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    // 🔹 Create new scheme entry
    const scheme = new Scheme({
      name,
      description,
      eligibility,
      applicationProcess,
      applyLink,
      benefits,
      documentsRequired,
      contactDetails,
      categoryId: categoryIdNumber,  // Ensure it's stored as a Number
      schemeType,
      stateName,
    });

    await scheme.save();
    res.status(201).json({ message: "Scheme added successfully", scheme });
  } catch (error) {
    console.error("Error adding scheme:", error);
    res.status(500).json({ error: "Failed to add scheme" });
  }
});


// Get all schemes
router.get("/", async (req, res) => {
  try {
    console.log("Fetching all schemes...");
    const schemes = await Scheme.find();
    res.json(schemes);
  } catch (error) {
    console.error("Error fetching schemes:", error);
    res.status(500).json({ error: "Failed to fetch schemes" });
  }
});

// Get schemes by category
/*router.get("/category/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;
    const schemes = await Scheme.find({ categoryId });
    res.json(schemes);
  } catch (error) {
    console.error("Error fetching schemes by category:", error);
    res.status(500).json({ error: "Failed to fetch schemes" });
  }
});*/
const categories = [
  { id: 1, name: "Health & Welfare" },
  { id: 5, name: "Education & Scholarships" },
  { id: 3, name: "Employment & Skill Development" },
  { id: 4, name: "Women & Child Development" },
  { id: 2, name: "Agriculture & Rural" },
  { id: 6, name: "Housing & Urban Development" },
  { id: 7, name: "Transport" },
  { id: 8, name: "Senior Citizen & Disabled" },
];

router.get("/category/:categoryId", async (req, res) => {
  try {
    console.log("getting schemes ");
    const { categoryId } = req.params;
    console.log(categoryId);
    const schemes = await Scheme.find({ categoryId });
    console.log(schemes);
    const category = categories.find(
      (cat) => cat.id === parseInt(categoryId)
    );

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({
      categoryName: category.name,
      schemes,
    });
  } catch (error) {
    console.error("Error fetching schemes by category:", error);
    res.status(500).json({ error: "Failed to fetch schemes" });
  }
});


// Fetch Central Government Schemes
router.get("/type/central", async (req, res) => {
  try {
    const schemes = await Scheme.find({ schemeType: "central" });
    res.json(schemes);
  } catch (error) {
    console.error("Error fetching central government schemes:", error);
    res.status(500).json({ error: "Failed to fetch central government schemes" });
  }
});

// Fetch State Government Schemes
router.get("/type/state", async (req, res) => {
  try {
    const schemes = await Scheme.find({ schemeType: "state" });
    res.json(schemes);
  } catch (error) {
    console.error("Error fetching state government schemes:", error);
    res.status(500).json({ error: "Failed to fetch state government schemes" });
  }
});

// Fetch Schemes by State Name
router.get("/state/:stateName", async (req, res) => {
  try {
    const { stateName } = req.params;
    const schemes = await Scheme.find({ schemeType: "state", stateName });
    res.json(schemes);
  } catch (error) {
    console.error("Error fetching schemes by state:", error);
    res.status(500).json({ error: "Failed to fetch schemes by state" });
  }
});

router.get("/scheme-counts", async (req, res) => {
  try {
    const stateSchemes = await Scheme.countDocuments({ schemeType: "state" });
    const centralSchemes = await Scheme.countDocuments({ schemeType: "central" });
    console.log("state:",stateSchemes);
    res.json({
      totalSchemes: stateSchemes + centralSchemes,
      stateSchemes,
      centralSchemes,
    });
    console.log("returned response");
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Get scheme by ID
router.get("/:id", async (req, res) => {
  try {
    console.log("Reached scheme fetch by id");
    const { id } = req.params;
    const scheme = await Scheme.findById(id);

    if (!scheme) {
      return res.status(404).json({ error: "Scheme not found" });
    }

    res.json(scheme);
  } catch (error) {
    console.error("Error fetching scheme by ID:", error);
    res.status(500).json({ error: "Failed to fetch scheme" });
  }
});

// Update scheme in the background
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedScheme = await Scheme.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedScheme) {
      return res.status(404).json({ error: "Scheme not found" });
    }

    res.json({ message: "Scheme updated successfully", updatedScheme });
  } catch (error) {
    console.error("Error updating scheme:", error);
    res.status(500).json({ error: "Failed to update scheme" });
  }
});

//delete scheme

router.delete("/delete/:id",async(req,res)=>{
  try{
  const {id}= req.params;
  const deletedScheme=await Scheme.findByIdAndDelete(id);
  if(!deletedScheme){
    return res.status(404).json({error:"Scheme not found"});
  }
  res.json({message:"Scheme deleted successfully"});}
  catch(error){
    console.error("Error deleting scheme:",error);
    res.status(500).json({error:"Failed to delete scheme"});
  }
});


module.exports = router;

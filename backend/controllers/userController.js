const User = require("../models/User"); // Ensure correct path to your model

exports.getUserProfile = async (req, res) => {
    try {
      console.log("reached user profile");
      console.log("Authenticated User ID:", req.user.id); // Debug User ID
  
      const user = await User.findById(req.user.id).select("-password");
      console.log("Fetched User:", user); // Debug user data
  
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.json(user);
    } catch (error) {
      console.error("Profile Fetch Error:", error.message);
      res.status(500).json({ message: error.message });
    }
  };
  
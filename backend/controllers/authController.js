const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, aadhaar } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, phone, password: hashedPassword, aadhaar });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "3h" });
    res.json({ token, userId: user._id, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const cloudinary = require("../config/Cloudinary");

// Update Profile
/*exports.updateProfile = async (req, res) => {
  console.log("reached update profile");
  console.log("Received profile update request:", req.body); // Debugging log

  try {
    console.log("update profile backend:",req.body);
    const userId = req.params.id;
    console.log("user id:",req.params.id);
    const { gender, dob, incomeLevel, education, occupation, familySize, address } = req.body;

    let profilePictureUrl = null;
    let documentUrls = [];

    // Upload profile picture to Cloudinary if provided
    if (req.body.profilePicture) {
      const uploadedResponse = await cloudinary.uploader.upload(req.body.profilePicture, {
        folder: "profile_pictures",
      });
      profilePictureUrl = uploadedResponse.secure_url;
    }

    // Upload documents to Cloudinary if provided
    if (req.body.documents && req.body.documents.length > 0) {
      documentUrls = await Promise.all(
        req.body.documents.map(async (doc) => {
          const uploadedDoc = await cloudinary.uploader.upload(doc, { folder: "documents" });
          return uploadedDoc.secure_url;
        })
      );
    }

    // Update user profile in database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          "profile.gender": gender,
          "profile.dob": dob,
          "profile.incomeLevel": incomeLevel,
          "profile.education": education,
          "profile.occupation": occupation,
          "profile.familySize": familySize,
          "profile.address": address,
          "profile.profilePicture": profilePictureUrl,
          "profile.documents": documentUrls,
        },
      },
      { new: true }
    );

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Error updating profile" });
  }
};*/

exports.updateProfile = async (req, res) => {
  console.log("Reached update profile controller");
  console.log("Received profile update request:", req.body);

  try {
    const userId = req.params.id;
    const {
      gender,
      dob,
      incomeLevel,
      education,
      occupation,
      familySize,
      address,
      profilePicture,
      documents,
      casteCategory,
      religion,
      state,
    } = req.body.profile; // 💥 FIX: pull from req.body.profile

    let profilePictureUrl = profilePicture;
    let documentUrls = documents || [];

    // Upload profile picture to Cloudinary if it's a base64 or file string
    if (profilePicture && !profilePicture.startsWith("https://")) {
      const uploadedResponse = await cloudinary.uploader.upload(profilePicture, {
        folder: "profile_pictures",
      });
      profilePictureUrl = uploadedResponse.secure_url;
    }

    // Upload documents to Cloudinary if they're not already URLs
    if (documents && documents.length > 0 && !documents[0].startsWith("https://")) {
      documentUrls = await Promise.all(
        documents.map(async (doc) => {
          const uploadedDoc = await cloudinary.uploader.upload(doc, {
            folder: "documents",
            resource_type: "auto", // handles PDFs and images both
          });
          return uploadedDoc.secure_url;
        })
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          "profile.gender": gender,
          "profile.dob": dob,
          "profile.incomeLevel": incomeLevel,
          "profile.education": education,
          "profile.occupation": occupation,
          "profile.address": address,
          "profile.profilePicture": profilePictureUrl,
          "profile.documents": documentUrls,
          "profile.casteCategory":casteCategory,
          "profile.religion":religion,
          "profile.state":state,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("Updated user:", updatedUser);
    res.json({ message: "Profile updated successfully", user: updatedUser });

  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Error updating profile" });
  }
};




// Fetch All Users with Name, Email, and Profile Link
exports.getAllUsers = async (req, res) => {
  try {
    console.log("reached fetch profile backend");
    const users = await User.find().select("name email _id"); // Fetch only name and email

    const usersWithProfileLinks = users.map(user => ({
      name: user.name,
      email: user.email,
      profileLink:user._id // API endpoint to fetch full user details
    }));
    

    res.json(usersWithProfileLinks);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Fetch Single User's Full Details by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // Exclude password

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Failed to fetch user details" });
  }
};

// DELETE User by ID
exports.deleteUser = async (req, res) => {
  console.log("reached delete");
  console.log(req);
  try {
    console.log("Deleting user with ID:", req.params.id);
    
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};
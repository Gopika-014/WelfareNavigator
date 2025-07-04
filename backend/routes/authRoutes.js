const express = require("express");
const { register, login, updateProfile,getAllUsers,getUserById,deleteUser } = require("../controllers/authController");
const { isAuthenticated } = require("../middleware/authMiddleware");
//const upload = require("../middleware/multer");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/profile/:id",isAuthenticated,updateProfile);
router.get("/details",getAllUsers);
router.get("/details/:id", getUserById);
router.delete("/delete/:id", deleteUser);


module.exports = router;

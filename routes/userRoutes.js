const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/roleMiddleware");
const { profile, getAllUsers } = require("../controllers/userController");

// User routes
router.get("/profile", auth, profile);

// Admin-only routes
router.get("/admin/users", auth, adminOnly, getAllUsers);

module.exports = router;
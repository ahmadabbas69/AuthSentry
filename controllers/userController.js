const User = require("../models/User");

// Protected: Get current logged-in user profile
exports.profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password"); // Exclude password
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Admin Only: Get all registered users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
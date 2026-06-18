module.exports = (req, res, next) => {
    // authMiddleware runs first, so req.user is guaranteed to exist here
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access Denied: Admins Only" });
    }
    next();
};
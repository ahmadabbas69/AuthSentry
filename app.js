const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes"); // 👈 1. Import new routes

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes); // 👈 2. Register CRUD endpoint

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

module.exports = app;
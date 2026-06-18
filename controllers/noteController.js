const Note = require("../models/Note");

// CREATE
exports.createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await Note.create({ user: req.user.userId, title, content });
        res.status(201).json(note);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// READ (Only fetch notes belonging to the logged-in user)
exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.userId }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE
exports.updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user.userId }, // Protects against updating others' notes
            { title, content },
            { new: true }
        );
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE
exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
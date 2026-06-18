require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db.js");

const PORT = process.env.PORT || 5000;

// Connect to local MongoDB Database, then spin up the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🎯 Server is actively running on port ${PORT}`);
    });
});
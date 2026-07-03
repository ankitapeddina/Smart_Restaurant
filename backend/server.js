const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./src/config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("Smart Restaurant Backend is Running...");
});

const PORT = process.env.PORT || 5000;

connectDB();
// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
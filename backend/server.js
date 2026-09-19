const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const db = require("./config/db");

const authRoutes = require("./routes/auth");
const assessmentRoutes = require("./routes/assessment");
const competencyRoutes = require("./routes/competency");
const weakAreaRoutes = require("./routes/weakArea");
const materialRoutes = require("./routes/material");
const quizRoutes = require("./routes/quiz");
const recommendationRoutes = require("./routes/recommendation");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/competencies", competencyRoutes);
app.use("/api/weak-areas", weakAreaRoutes);
app.use("/api/material", materialRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/recommendations", recommendationRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("AI Learning Platform Backend is Running");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
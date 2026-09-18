const express = require("express");
const router = express.Router();

const {
    startAssessment,
    submitAssessment
} = require("../controllers/assessmentController");

// Start assessment
router.post("/start", startAssessment);

// Submit assessment
router.post("/submit", submitAssessment);

module.exports = router;
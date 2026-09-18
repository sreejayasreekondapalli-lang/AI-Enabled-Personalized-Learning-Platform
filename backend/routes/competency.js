const express = require("express");
const router = express.Router();

const {
    getCompetencies
} = require("../controllers/competencyController");

// Get all competencies
router.get("/", getCompetencies);

module.exports = router;
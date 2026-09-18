const express = require("express");
const router = express.Router();

const {
    getRecommendations
} = require("../controllers/recommendationController");

// Get personalized recommendations
router.get("/", getRecommendations);

module.exports = router;
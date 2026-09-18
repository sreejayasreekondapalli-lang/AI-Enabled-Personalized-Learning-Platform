const express = require("express");
const router = express.Router();

const {
    getWeakAreas
} = require("../controllers/weakAreaController");

// Get user's weak areas
router.get("/", getWeakAreas);

module.exports = router;
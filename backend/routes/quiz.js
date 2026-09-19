const express = require("express");
const router = express.Router();

const { generateQuiz, getQuiz, submitQuiz } = require("../controllers/quizController");

router.post("/generate", generateQuiz);
router.get("/:id", getQuiz);
router.post("/submit", submitQuiz);

module.exports = router;
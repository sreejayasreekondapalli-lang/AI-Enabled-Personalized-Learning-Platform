const db = require("../config/db");

// START ASSESSMENT
const startAssessment = async (req, res) => {
    try {
        const { userId, competency } = req.body;

        if (!userId || !competency) {
            return res.status(400).json({ message: "userId and competency are required" });
        }

        const sql = `INSERT INTO assessments (user_id, competency_id, total_questions, correct_answers, score, submitted_at) VALUES (?, ?, 0, 0, 0, NOW())`;
        db.query(sql, [userId, competency], (err, result) => {
            if (err) return res.status(500).json({ message: "Failed to start assessment", error: err.message });
            res.status(200).json({ message: "Assessment started", assessmentId: result.insertId, userId, competency });
        });

    } catch (error) {
        res.status(500).json({ message: "Failed to start assessment", error: error.message });
    }
};


// SUBMIT ASSESSMENT
const submitAssessment = async (req, res) => {
    try {
        const { userId, competencyId, answers } = req.body;

        if (!userId || !answers) {
            return res.status(400).json({ message: "userId and answers are required" });
        }

        const totalQuestions = answers.length;
        let correctAnswers = 0;
        answers.forEach((answer) => {
            if (answer.correct === true) correctAnswers++;
        });

        const score = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

        const sql = `INSERT INTO assessments (user_id, competency_id, answers, total_questions, correct_answers, score, submitted_at) VALUES (?, ?, ?, ?, ?, ?, NOW())`;
        db.query(sql, [userId, competencyId || null, JSON.stringify(answers), totalQuestions, correctAnswers, score], (err, result) => {
            if (err) return res.status(500).json({ message: "Failed to submit assessment", error: err.message });
            res.status(200).json({ message: "Assessment submitted", assessmentId: result.insertId, userId, totalQuestions, correctAnswers, score });
        });

    } catch (error) {
        res.status(500).json({ message: "Failed to submit assessment", error: error.message });
    }
};


// EXPORT FUNCTIONS
module.exports = {
    startAssessment,
    submitAssessment
};
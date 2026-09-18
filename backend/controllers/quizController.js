const db = require("../config/db");

// GENERATE QUIZ
const generateQuiz = async (req, res) => {
    try {
        const { userId, materialId, topic } = req.body;

        if (!userId || !materialId || !topic) {
            return res.status(400).json({ message: "userId, materialId and topic are required" });
        }

        const sql = `SELECT id, question_text, options, correct_answer, difficulty, topic FROM questions WHERE topic = ? LIMIT 20`;
        db.query(sql, [topic], (err, results) => {
            if (err) return res.status(500).json({ message: "Quiz generation failed", error: err.message });

            if (!results || results.length === 0) {
                // Fallback to sample questions if DB doesn't have questions
                const questions = [
                    {
                        question: "What is the main purpose of statistical analysis?",
                        options: ["To analyze data", "To delete data", "To hide data", "To ignore data"],
                        correctAnswer: "To analyze data",
                        difficulty: "Easy",
                        topic: topic
                    },
                    {
                        question: "Which method is commonly used to represent data visually?",
                        options: ["Charts", "Passwords", "Folders", "Files"],
                        correctAnswer: "Charts",
                        difficulty: "Easy",
                        topic: topic
                    }
                ];

                return res.status(200).json({ message: "Quiz generated (fallback)", userId, materialId, topic, totalQuestions: questions.length, questions });
            }

            // Map options from JSON string if needed
            const questions = results.map((r) => ({
                id: r.id,
                question: r.question_text,
                options: typeof r.options === 'string' ? JSON.parse(r.options) : r.options,
                correctAnswer: r.correct_answer,
                difficulty: r.difficulty,
                topic: r.topic
            }));

            res.status(200).json({ message: "Quiz generated successfully", userId, materialId, topic, totalQuestions: questions.length, questions });
        });

    } catch (error) {
        res.status(500).json({ message: "Quiz generation failed", error: error.message });
    }
};


// GET QUIZ
const getQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `SELECT q.id as quiz_id, q.title, q.difficulty, qu.id as question_id, qu.question_text, qu.options, qu.correct_answer FROM quizzes q LEFT JOIN questions qu ON qu.quiz_id = q.id WHERE q.id = ?`;
        db.query(sql, [id], (err, results) => {
            if (err) return res.status(500).json({ message: "Failed to retrieve quiz", error: err.message });
            if (!results || results.length === 0) return res.status(404).json({ message: "Quiz not found" });

            const quizInfo = { id: results[0].quiz_id, title: results[0].title, difficulty: results[0].difficulty };
            const questions = results.filter(r => r.question_id).map(r => ({ id: r.question_id, question: r.question_text, options: typeof r.options === 'string' ? JSON.parse(r.options) : r.options, correctAnswer: r.correct_answer }));
            res.status(200).json({ message: "Quiz retrieved successfully", quiz: quizInfo, questions });
        });

    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve quiz", error: error.message });
    }
};


// SUBMIT QUIZ
const submitQuiz = async (req, res) => {
    try {
        const { userId, quizId, answers } = req.body;

        if (!userId || !answers) return res.status(400).json({ message: "userId and answers are required" });

        let correctAnswers = 0;
        answers.forEach((answer) => { if (answer.correct === true) correctAnswers++; });
        const totalQuestions = answers.length;
        const score = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

        const sql = `INSERT INTO quiz_attempts (quiz_id, user_id, answers, total_questions, correct_answers, score, attempted_at) VALUES (?, ?, ?, ?, ?, ?, NOW())`;
        db.query(sql, [quizId || null, userId, JSON.stringify(answers), totalQuestions, correctAnswers, score], (err, result) => {
            if (err) return res.status(500).json({ message: "Quiz submission failed", error: err.message });
            res.status(200).json({ message: "Quiz submitted successfully", attemptId: result.insertId, userId, totalQuestions, correctAnswers, score });
        });

    } catch (error) {
        res.status(500).json({ message: "Quiz submission failed", error: error.message });
    }
};


module.exports = {
    generateQuiz,
    getQuiz,
    submitQuiz
};
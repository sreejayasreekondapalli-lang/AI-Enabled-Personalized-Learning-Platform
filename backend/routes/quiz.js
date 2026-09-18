// GENERATE QUIZ
const generateQuiz = async (req, res) => {
    try {
        const { userId, materialId, topic } = req.body;

        if (!userId || !materialId || !topic) {
            return res.status(400).json({
                message: "userId, materialId and topic are required"
            });
        }

        // Temporary MCQs
        const questions = [
            {
                question: "What is the main purpose of statistical analysis?",
                options: [
                    "To analyze data",
                    "To delete data",
                    "To hide data",
                    "To ignore data"
                ],
                correctAnswer: "To analyze data",
                difficulty: "Easy",
                topic: topic
            },
            {
                question: "Which method is commonly used to represent data visually?",
                options: [
                    "Charts",
                    "Passwords",
                    "Folders",
                    "Files"
                ],
                correctAnswer: "Charts",
                difficulty: "Easy",
                topic: topic
            }
        ];

        res.status(200).json({
            message: "Quiz generated successfully",
            userId,
            materialId,
            topic,
            totalQuestions: questions.length,
            questions
        });

    } catch (error) {
        res.status(500).json({
            message: "Quiz generation failed",
            error: error.message
        });
    }
};


// GET QUIZ
const getQuiz = async (req, res) => {
    try {
        const { id } = req.params;

        res.status(200).json({
            message: "Quiz retrieved successfully",
            quizId: id
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve quiz",
            error: error.message
        });
    }
};


// SUBMIT QUIZ
const submitQuiz = async (req, res) => {
    try {
        const { userId, answers } = req.body;

        if (!userId || !answers) {
            return res.status(400).json({
                message: "userId and answers are required"
            });
        }

        let correctAnswers = 0;

        answers.forEach((answer) => {
            if (answer.correct === true) {
                correctAnswers++;
            }
        });

        const totalQuestions = answers.length;

        const score =
            totalQuestions > 0
                ? (correctAnswers / totalQuestions) * 100
                : 0;

        res.status(200).json({
            message: "Quiz submitted successfully",
            userId,
            totalQuestions,
            correctAnswers,
            score
        });

    } catch (error) {
        res.status(500).json({
            message: "Quiz submission failed",
            error: error.message
        });
    }
};


module.exports = {
    generateQuiz,
    getQuiz,
    submitQuiz
};
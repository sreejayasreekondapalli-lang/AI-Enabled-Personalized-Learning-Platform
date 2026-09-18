// START ASSESSMENT
const startAssessment = async (req, res) => {
    try {
        const { userId, competency } = req.body;

        if (!userId || !competency) {
            return res.status(400).json({
                message: "userId and competency are required"
            });
        }

        res.status(200).json({
            message: "Assessment started",
            userId,
            competency
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to start assessment",
            error: error.message
        });
    }
};


// SUBMIT ASSESSMENT
const submitAssessment = async (req, res) => {
    try {
        const { userId, answers } = req.body;

        if (!userId || !answers) {
            return res.status(400).json({
                message: "userId and answers are required"
            });
        }

        // Temporary scoring
        const totalQuestions = answers.length;
        let correctAnswers = 0;

        answers.forEach((answer) => {
            if (answer.correct === true) {
                correctAnswers++;
            }
        });

        const score =
            totalQuestions > 0
                ? (correctAnswers / totalQuestions) * 100
                : 0;

        res.status(200).json({
            message: "Assessment submitted",
            userId,
            totalQuestions,
            correctAnswers,
            score
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to submit assessment",
            error: error.message
        });
    }
};


// EXPORT FUNCTIONS
module.exports = {
    startAssessment,
    submitAssessment
};
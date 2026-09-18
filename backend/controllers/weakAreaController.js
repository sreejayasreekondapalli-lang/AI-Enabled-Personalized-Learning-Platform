// FIND USER'S WEAK AREAS
const getWeakAreas = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({
                message: "userId is required"
            });
        }

        // Temporary assessment result
        const results = [
            {
                competency: "Statistical Analysis",
                score: 45
            },
            {
                competency: "Data Collection",
                score: 82
            },
            {
                competency: "Data Interpretation",
                score: 55
            },
            {
                competency: "Data Visualization",
                score: 75
            }
        ];

        // Consider score below 60 as a weak area
        const weakAreas = results.filter(
            (item) => item.score < 60
        );

        res.status(200).json({
            message: "Weak areas identified",
            userId,
            weakAreas
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to identify weak areas",
            error: error.message
        });
    }
};

module.exports = {
    getWeakAreas
};
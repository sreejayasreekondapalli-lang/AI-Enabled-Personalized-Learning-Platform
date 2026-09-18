// GET ALL COMPETENCIES
const getCompetencies = async (req, res) => {
    try {
        // Temporary competency data
        const competencies = [
            {
                id: 1,
                name: "Statistical Analysis",
                description: "Understanding and analyzing statistical data"
            },
            {
                id: 2,
                name: "Data Collection",
                description: "Knowledge of collecting official statistical data"
            },
            {
                id: 3,
                name: "Data Interpretation",
                description: "Ability to interpret statistical results"
            },
            {
                id: 4,
                name: "Data Visualization",
                description: "Understanding charts and graphical representation"
            },
            {
                id: 5,
                name: "Statistical Methods",
                description: "Knowledge of statistical methods and techniques"
            }
        ];

        res.status(200).json({
            message: "Competencies retrieved successfully",
            competencies
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve competencies",
            error: error.message
        });
    }
};

module.exports = {
    getCompetencies
};
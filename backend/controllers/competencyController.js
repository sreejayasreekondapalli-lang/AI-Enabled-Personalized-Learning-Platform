const db = require("../config/db");

// GET ALL COMPETENCIES
const getCompetencies = async (req, res) => {
    try {
        const sql = `SELECT id, name, description FROM competencies ORDER BY id`;
        db.query(sql, (err, results) => {
            if (err) return res.status(500).json({ message: "Failed to retrieve competencies", error: err.message });
            res.status(200).json({ message: "Competencies retrieved successfully", competencies: results });
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve competencies", error: error.message });
    }
};

module.exports = {
    getCompetencies
};
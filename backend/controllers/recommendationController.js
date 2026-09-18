const db = require("../config/db");

// GET PERSONALIZED RECOMMENDATIONS
const getRecommendations = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) return res.status(400).json({ message: "userId is required" });

        const sql = `SELECT r.id, r.recommendation_text, r.priority, c.name as competency FROM recommendations r LEFT JOIN competencies c ON r.competency_id = c.id WHERE r.user_id = ? ORDER BY FIELD(r.priority,'High','Medium','Low'), r.created_at DESC`;
        db.query(sql, [userId], (err, results) => {
            if (err) return res.status(500).json({ message: "Failed to generate recommendations", error: err.message });
            if (!results || results.length === 0) {
                // fallback: generate based on weak_areas
                const fallbackSql = `SELECT wa.score, c.name as competency FROM weak_areas wa JOIN competencies c ON wa.competency_id = c.id WHERE wa.user_id = ? ORDER BY wa.score ASC LIMIT 3`;
                db.query(fallbackSql, [userId], (fErr, fRes) => {
                    if (fErr) return res.status(500).json({ message: "Failed to generate recommendations", error: fErr.message });
                    const recommendations = fRes.map(r => ({ competency: r.competency, recommendation: `Review materials for ${r.competency}`, priority: 'High' }));
                    return res.status(200).json({ message: "Personalized recommendations generated (fallback)", userId, recommendations });
                });
            } else {
                const recommendations = results.map(r => ({ id: r.id, competency: r.competency, recommendation: r.recommendation_text, priority: r.priority }));
                res.status(200).json({ message: "Personalized recommendations generated", userId, recommendations });
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Failed to generate recommendations", error: error.message });
    }
};

module.exports = {
    getRecommendations
};
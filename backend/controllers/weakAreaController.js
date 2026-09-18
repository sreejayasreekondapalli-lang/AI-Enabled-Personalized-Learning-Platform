const db = require("../config/db");

// FIND USER'S WEAK AREAS
const getWeakAreas = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) return res.status(400).json({ message: "userId is required" });

        const sql = `SELECT wa.score, c.name as competency FROM weak_areas wa JOIN competencies c ON wa.competency_id = c.id WHERE wa.user_id = ? ORDER BY wa.score ASC`;
        db.query(sql, [userId], (err, results) => {
            if (err) return res.status(500).json({ message: "Failed to identify weak areas", error: err.message });
            if (!results || results.length === 0) {
                // fallback: compute from latest assessments
                const fallbackSql = `SELECT a.score, c.name as competency FROM assessments a JOIN competencies c ON a.competency_id = c.id WHERE a.user_id = ? ORDER BY a.submitted_at DESC LIMIT 10`;
                db.query(fallbackSql, [userId], (fErr, fRes) => {
                    if (fErr) return res.status(500).json({ message: "Failed to identify weak areas", error: fErr.message });
                    const weakAreas = (fRes || []).filter(r => r.score < 60).map(r => ({ competency: r.competency, score: r.score }));
                    return res.status(200).json({ message: "Weak areas identified (fallback)", userId, weakAreas });
                });
            } else {
                const weakAreas = results.map(r => ({ competency: r.competency, score: r.score }));
                res.status(200).json({ message: "Weak areas identified", userId, weakAreas });
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Failed to identify weak areas", error: error.message });
    }
};

module.exports = {
    getWeakAreas
};
const db = require("../config/db");

const uploadMaterial = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "Please upload a PDF file" });

        const { title, description, uploaderId, competencyId } = req.body;
        const sql = `INSERT INTO materials (title, description, filename, filepath, uploader_id, competency_id, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())`;
        db.query(sql, [title || req.file.originalname, description || null, req.file.filename, req.file.path, uploaderId || null, competencyId || null], (err, result) => {
            if (err) return res.status(500).json({ message: "Material save failed", error: err.message });
            res.status(200).json({ message: "Learning material uploaded successfully", materialId: result.insertId, file: { filename: req.file.filename, originalName: req.file.originalname, size: req.file.size, path: req.file.path } });
        });

    } catch (error) {
        res.status(500).json({ message: "Material upload failed", error: error.message });
    }
};

module.exports = {
    uploadMaterial
};
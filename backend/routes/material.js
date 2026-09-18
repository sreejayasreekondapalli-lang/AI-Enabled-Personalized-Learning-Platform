const uploadMaterial = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a PDF file"
            });
        }

        res.status(200).json({
            message: "Learning material uploaded successfully",
            file: {
                filename: req.file.filename,
                originalName: req.file.originalname,
                size: req.file.size,
                path: req.file.path
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Material upload failed",
            error: error.message
        });
    }
};

module.exports = {
    uploadMaterial
};
const express = require("express");
const router = express.Router();

const { uploadMaterial } = require("../controllers/materialController");

router.post("/upload", uploadMaterial);

module.exports = router;
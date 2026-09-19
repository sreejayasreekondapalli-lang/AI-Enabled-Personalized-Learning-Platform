const path = require("path");
const mysql = require("mysql2");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "learning_platform",
    port: Number(process.env.DB_PORT) || 3306
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
        console.error("Check that MySQL is running and the DB credentials in backend/.env are correct.");
        return;
    }

    console.log("MySQL Connected!");
});

module.exports = db;
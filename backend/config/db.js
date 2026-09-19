const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "learning_platform",
    port: Number(process.env.DB_PORT) || 3306
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err.message);
        return;
    }

    console.log("MySQL Connected!");
});

module.exports = db;
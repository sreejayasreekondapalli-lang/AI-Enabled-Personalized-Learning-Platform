const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// SIGNUP
const signup = async (req, res) => {
    try {
        const { name, email, password, mobile } = req.body;

        if (!name || !email || !password || !mobile) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `INSERT INTO users (name, email, password_hash, mobile) VALUES (?, ?, ?, ?)`;
        db.query(sql, [name, email, hashedPassword, mobile], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Signup failed", error: err.message });
            }

            const user = { id: result.insertId, name, email, mobile };
            res.status(201).json({ message: "User created", user });
        });

    } catch (error) {
        res.status(500).json({
            message: "Signup failed",
            error: error.message
        });
    }
};


// LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const sql = `SELECT * FROM users WHERE email = ?`;
        db.query(sql, [email], async (err, results) => {
            if (err) return res.status(500).json({ message: "Login failed", error: err.message });

            if (!results || results.length === 0) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const user = results[0];
            const match = await bcrypt.compare(password, user.password_hash);
            if (!match) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "secret", {
                expiresIn: "7d"
            });

            res.status(200).json({ message: "Login successful", token, user: { id: user.id, name: user.name, email: user.email } });
        });

    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
};


module.exports = {
    signup,
    login
};
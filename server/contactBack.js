const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express(); // ✅ Declare 'app' first
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve static files (like contact.html) from SCHOOL folder
app.use(express.static(path.join(__dirname, "../"))); // Adjust if needed

// ✅ MySQL2 Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "clever"
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database.");
  }
});

// ✅ Optional: Root route for browser test
app.get("/", (req, res) => {
  res.send("✅ Server is running. Use POST /api/contact to send form data.");
});

// ✅ Handle contact form submission
app.post("/api/contact", (req, res) => {
  const { names, email, message } = req.body;
  if (!names || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const sql = "INSERT INTO contacts (names, email, message) VALUES (?, ?, ?)";
  db.query(sql, [names, email, message], (err, result) => {
    if (err) {
      console.error("❌ Insert error:", err);
      return res.status(500).json({ message: "Database error." });
    }
    res.status(200).json({ message: "✅ Message sent successfully!" });
  });
});

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

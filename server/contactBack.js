const express = require('express');
const mysql = require('mysql2');
const path = require('path');
require('dotenv').config(); // to read .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'contact_db'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }
  console.log('Connected to MySQL database');
});

// Handle form submission
app.post('/contact', (req, res) => {
  const { names, email, message } = req.body;
  console.log('Received form data:', { names, email, message });

  if (!names || !email || !message) {
    console.log('Missing fields!');
    return res.status(400).json({ message: 'Please fill in all fields.' });
  }

  const sql = 'INSERT INTO contacts (names, email, message) VALUES (?, ?, ?)';
  db.query(sql, [names, email, message], (err, result) => {
    if (err) {
      console.error('Failed to insert data:', err.message);
      return res.status(500).json({ message: 'Database error' });
    }

    console.log('Data inserted into DB successfully.');
    res.json({ message: 'Thank you for contacting us!' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

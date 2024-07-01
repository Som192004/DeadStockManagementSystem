import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql2/promise'; // Use the promise version of mysql2

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createPool({
  host: 'localhost',
  port: 1000, // Specify your custom MySQL port here
  user: 'root',
  password: 'RAHUL#2004',
  database: 'deadstockmanagementsystem'
});

// Register endpoint
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if email already exists
    const checkEmailQuery = 'SELECT email FROM users WHERE email = ?';
    const [rows] = await db.query(checkEmailQuery, [email]);

    if (rows.length > 0) {
      // Email already exists
      res.status(400).send('Email already in use');
    } else {
      // Email does not exist, proceed with registration
      const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      await db.query(insertUserQuery, [username, email, password]);
      res.status(200).send('User registered successfully');
    }
  } catch (err) {
    console.error(err);
    if (err.code) { // Handle database errors specifically
      res.status(500).send('Database error during registration');
    } else {
      res.status(500).send('Server error');
    }
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';

  try {
    const [rows] = await db.query(query, [email, password]);
    if (rows.length > 0) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

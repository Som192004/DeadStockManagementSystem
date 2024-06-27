import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',  // Replace with your MySQL host if different
  port: 1000,         // Specify your custom MySQL port here
  user: 'root',
  password: 'RAHUL#2004',
  database: 'deadstockmanagementsystem'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Register endpoint
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

  db.query(query, [username, email, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.status(200).send('User registered successfully');
    }
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';

  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else if (result.length > 0) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

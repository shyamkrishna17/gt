// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const users = []; // Store users as objects in an array

// SignUp API
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  
  // Validation checks
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newUser = { username, email, password };
  users.push(newUser);

  return res.status(201).json({ message: 'User registered successfully' });
});

// SignIn API
app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  
  // Find user by email
  const user = users.find(user => user.email === email);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  return res.status(200).json({ message: 'Sign in successful' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

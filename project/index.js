const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/apiRoutes');
const path = require('path');
const bodyParser = require('body-parser'); // Added body-parser for form data parsing

const app = express();
const PORT = process.env.PORT || 3000;

// Use bodyParser for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  // Use path.join() to create an absolute path to your HTML file
  const indexPath = path.join(__dirname, 'public', 'index.html');

  // Send the HTML file as the response
  res.sendFile(indexPath);
});

app.get('/profile', (req, res) => {
  const profilePath = path.join(__dirname, 'public', 'profile.html');
  res.sendFile(profilePath);
});

app.get('/friends', (req, res) => {
  const friendsPath = path.join(__dirname, 'public', 'friends.html');
  res.sendFile(friendsPath);
});

app.get('/logout', (req, res) => {
  // Perform any logout logic here if needed
  // Redirect to the home page (index.html)
  res.redirect('/');
});



mongoose.connect('mongodb://localhost/socialnetworkdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', apiRoutes);

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB database');
});

db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Sync Mongoose models with MongoDB
require('./models/User');
require('./models/Thought');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
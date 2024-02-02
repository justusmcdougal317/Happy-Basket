const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/apiRoutes');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.get('/', (req, res) => {
  // Use path.join() to create an absolute path to your HTML file
  const indexPath = path.join(__dirname, 'public', 'index.html');
  
  // Send the HTML file as the response
  res.sendFile(indexPath);
})

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
const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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
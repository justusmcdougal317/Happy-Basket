const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define a schema
const userSchema = new Schema({
  username: String,
  email: String,
  age: Number
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a new user
const newUser = new User({
  username: 'john_doe',
  email: 'john@example.com',
  age: 25
});

// Save the user to the database
newUser.save()
  .then(() => {
    console.log('User saved successfully');
  })
  .catch((error) => {
    console.error('Error saving user:', error);
  });
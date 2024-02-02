const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  // Add other fields as needed
});

const User = mongoose.model('User', userSchema);

(async () => {
  const newUser = new User({
    username: 'john_doe',
    email: 'john@example.com',
  });

  try {
    const user = await newUser.save();
    console.log('User saved successfully:', user);
  } catch (err) {
    console.error('Error saving user:', err);
  }
})();
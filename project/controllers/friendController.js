const mongoose = require('mongoose');
const User = require('../models/User');

// Controller functions
const addFriend = async (req, res) => {
  const { userId } = req.params;
  const { friendId } = req.body;

  try {
    // Find the user by their ID and add the friend's ID to their friends array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { friends: friendId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeFriend = async (req, res) => {
  const { userId, friendId } = req.params;

  try {
    // Find the user by their ID and remove the friend's ID from their friends array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Other controller functions...

module.exports = {
  addFriend,
  removeFriend,
  // Export other controller functions...
};
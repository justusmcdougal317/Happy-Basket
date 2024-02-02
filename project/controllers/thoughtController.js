const mongoose = require('mongoose');
const Thought = require('../models/Thought');

// Controller functions
const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find().populate('user', 'username').populate('reactions');
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getThoughtById = async (req, res) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findById(thoughtId).populate('user', 'username').populate('reactions');
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createThought = async (req, res) => {
  try {
    const { text, user } = req.body;
    const thought = await Thought.create({ text, user });
    res.status(201).json(thought);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateThought = async (req, res) => {
  const { thoughtId } = req.params;
  const { text } = req.body;

  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { text },
      { new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    res.json(updatedThought);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteThought = async (req, res) => {
  const { thoughtId } = req.params;

  try {
    const deletedThought = await Thought.findByIdAndDelete(thoughtId);

    if (!deletedThought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    res.json({ message: 'Thought deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
};
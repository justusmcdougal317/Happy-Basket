const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Thought = require('../models/Thought'); // Import your Thought model

// Handle thought submission without authMiddleware
router.post('/post-thought-without-auth', async (req, res) => {
    try {
        const { thought } = req.body;

        // Save thought to the database
        const newThought = new Thought({ content: thought });
        await newThought.save();

        // Send a success response
        res.status(201).json({ message: 'Thought shared successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error sharing thought:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Handle thought submission with authMiddleware
router.post('/post-thought', authMiddleware, async (req, res) => {
    try {
        const { user, text } = req.body;
        // Use 'user' and 'text' to create and save the thought to the database
        // For example:
        const newThought = new Thought({ user, text });
        await newThought.save();

        res.status(200).json({ message: 'Thought saved successfully' });
    } catch (error) {
        console.error('Error saving thought:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
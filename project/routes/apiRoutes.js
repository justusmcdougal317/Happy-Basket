const express = require('express');
const router = express.Router();

// Define a POST route with a callback function
router.post('/example', (req, res) => {
  // Your route logic here
  res.send('This is a POST request');
});

module.exports = router;
const express = require('express');
const router = express.Router();

// Placeholder routes for media handling
router.post('/upload', (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'Media upload not implemented yet'
  });
});

module.exports = router; 
const express = require('express');
const { register, login, getMe } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// Placeholder routes for authentication
router.post('/login', (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'Authentication not implemented yet'
  });
});

router.post('/register', (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'Registration not implemented yet'
  });
});

router.get('/me', protect, getMe);

module.exports = router; 
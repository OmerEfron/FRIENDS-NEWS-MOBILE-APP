const express = require('express');
const {
  getUsers,
  getUser,
  updateUser,
  joinGroup,
  leaveGroup,
  getUserGroups
} = require('../controllers/user.controller');

const router = express.Router();

// User management routes
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);

// Group membership routes
router.get('/:id/groups', getUserGroups);
router.post('/:id/groups/join', joinGroup);
router.post('/:id/groups/leave', leaveGroup);

module.exports = router; 
const express = require('express');
const {
  getGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  updateMemberCount
} = require('../controllers/group.controller');

const router = express.Router();

router.get('/', getGroups);
router.get('/:id', getGroup);
router.post('/', createGroup);
router.put('/:id', updateGroup);
router.delete('/:id', deleteGroup);
router.post('/:id/members', updateMemberCount);

module.exports = router; 
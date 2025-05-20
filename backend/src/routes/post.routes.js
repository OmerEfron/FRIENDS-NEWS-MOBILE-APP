const express = require('express');
const {
  getPosts,
  getBreakingNews,
  getPost,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/post.controller');

const router = express.Router();

router.get('/', getPosts);
router.get('/breaking', getBreakingNews);
router.get('/:id', getPost);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router; 
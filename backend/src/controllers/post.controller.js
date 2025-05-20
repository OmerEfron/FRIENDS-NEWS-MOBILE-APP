const FileDb = require('../utils/fileDb');
const Validator = require('../utils/validator');
const { ApiError } = require('../middleware/error');

const POSTS_FILE = 'posts.json';

// Get all posts with optional filters
const getPosts = async (req, res, next) => {
  try {
    const { groupId, isBreakingNews, limit = 10, page = 1 } = req.query;
    let posts = await FileDb.findAll(POSTS_FILE);

    // Apply filters
    if (groupId) {
      posts = posts.filter(post => post.groupId === groupId);
    }
    if (isBreakingNews !== undefined) {
      posts = posts.filter(post => post.isBreakingNews === (isBreakingNews === 'true'));
    }

    // Sort by date descending
    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = posts.length;
    posts = posts.slice(startIndex, endIndex);

    res.json({
      status: 'success',
      data: posts,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
        limit: Number(limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get breaking news
const getBreakingNews = async (req, res, next) => {
  try {
    const posts = await FileDb.findAll(POSTS_FILE);
    const breakingNews = posts
      .filter(post => post.isBreakingNews)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      status: 'success',
      data: breakingNews
    });
  } catch (error) {
    next(error);
  }
};

// Get single post
const getPost = async (req, res, next) => {
  try {
    const post = await FileDb.findById(POSTS_FILE, req.params.id);
    if (!post) {
      throw new ApiError(404, 'Post not found');
    }
    res.json({
      status: 'success',
      data: post
    });
  } catch (error) {
    next(error);
  }
};

// Create post
const createPost = async (req, res, next) => {
  try {
    Validator.validate('post', req.body);
    
    // Verify group exists
    const group = await FileDb.findById('groups.json', req.body.groupId);
    if (!group) {
      throw new ApiError(400, 'Invalid group ID');
    }

    const post = await FileDb.create(POSTS_FILE, req.body);
    res.status(201).json({
      status: 'success',
      data: post
    });
  } catch (error) {
    next(error);
  }
};

// Update post
const updatePost = async (req, res, next) => {
  try {
    Validator.validate('post', req.body);
    
    // Verify group exists if groupId is being updated
    if (req.body.groupId) {
      const group = await FileDb.findById('groups.json', req.body.groupId);
      if (!group) {
        throw new ApiError(400, 'Invalid group ID');
      }
    }

    const post = await FileDb.update(POSTS_FILE, req.params.id, req.body);
    res.json({
      status: 'success',
      data: post
    });
  } catch (error) {
    next(error);
  }
};

// Delete post
const deletePost = async (req, res, next) => {
  try {
    await FileDb.delete(POSTS_FILE, req.params.id);
    res.json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPosts,
  getBreakingNews,
  getPost,
  createPost,
  updatePost,
  deletePost
}; 
const FileDb = require('../utils/fileDb');
const Validator = require('../utils/validator');
const { ApiError } = require('../middleware/error');

const GROUPS_FILE = 'groups.json';
const POSTS_FILE = 'posts.json';

// Get all groups
const getGroups = async (req, res, next) => {
  try {
    const groups = await FileDb.findAll(GROUPS_FILE);
    
    // Sort by member count descending
    groups.sort((a, b) => b.memberCount - a.memberCount);

    res.json({
      status: 'success',
      data: groups
    });
  } catch (error) {
    next(error);
  }
};

// Get single group
const getGroup = async (req, res, next) => {
  try {
    const group = await FileDb.findById(GROUPS_FILE, req.params.id);
    if (!group) {
      throw new ApiError(404, 'Group not found');
    }

    // Get group's posts count
    const posts = await FileDb.findAll(POSTS_FILE);
    const postsCount = posts.filter(post => post.groupId === group.id).length;

    res.json({
      status: 'success',
      data: {
        ...group,
        postsCount
      }
    });
  } catch (error) {
    next(error);
  }
};

// Create group
const createGroup = async (req, res, next) => {
  try {
    Validator.validate('group', req.body);

    const group = await FileDb.create(GROUPS_FILE, {
      ...req.body,
      memberCount: 0 // Initialize with 0 members
    });

    res.status(201).json({
      status: 'success',
      data: group
    });
  } catch (error) {
    next(error);
  }
};

// Update group
const updateGroup = async (req, res, next) => {
  try {
    Validator.validate('group', req.body);

    const group = await FileDb.findById(GROUPS_FILE, req.params.id);
    if (!group) {
      throw new ApiError(404, 'Group not found');
    }

    const updatedGroup = await FileDb.update(GROUPS_FILE, req.params.id, req.body);
    res.json({
      status: 'success',
      data: updatedGroup
    });
  } catch (error) {
    next(error);
  }
};

// Delete group
const deleteGroup = async (req, res, next) => {
  try {
    const group = await FileDb.findById(GROUPS_FILE, req.params.id);
    if (!group) {
      throw new ApiError(404, 'Group not found');
    }

    // Check if group has any posts
    const posts = await FileDb.findAll(POSTS_FILE);
    const groupPosts = posts.filter(post => post.groupId === group.id);
    if (groupPosts.length > 0) {
      throw new ApiError(400, 'Cannot delete group with existing posts');
    }

    await FileDb.delete(GROUPS_FILE, req.params.id);
    res.json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

// Update member count
const updateMemberCount = async (req, res, next) => {
  try {
    const { action } = req.body;
    if (!['increment', 'decrement'].includes(action)) {
      throw new ApiError(400, 'Invalid action. Must be increment or decrement');
    }

    const group = await FileDb.findById(GROUPS_FILE, req.params.id);
    if (!group) {
      throw new ApiError(404, 'Group not found');
    }

    const newCount = action === 'increment' ? group.memberCount + 1 : Math.max(0, group.memberCount - 1);
    const updatedGroup = await FileDb.update(GROUPS_FILE, req.params.id, {
      ...group,
      memberCount: newCount
    });

    res.json({
      status: 'success',
      data: updatedGroup
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  updateMemberCount
}; 
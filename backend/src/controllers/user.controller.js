const FileDb = require('../utils/fileDb');
const Validator = require('../utils/validator');
const { ApiError } = require('../middleware/error');

const USERS_FILE = 'users.json';
const GROUPS_FILE = 'groups.json';

// Get all users
const getUsers = async (req, res, next) => {
  try {
    const users = await FileDb.findAll(USERS_FILE);
    
    // Remove sensitive information
    const sanitizedUsers = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    res.json({
      status: 'success',
      data: sanitizedUsers
    });
  } catch (error) {
    next(error);
  }
};

// Get user profile
const getUser = async (req, res, next) => {
  try {
    const user = await FileDb.findById(USERS_FILE, req.params.id);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    // Remove sensitive information
    const { password, ...userWithoutPassword } = user;

    res.json({
      status: 'success',
      data: userWithoutPassword
    });
  } catch (error) {
    next(error);
  }
};

// Update user profile
const updateUser = async (req, res, next) => {
  try {
    Validator.validate('userUpdate', req.body);

    const user = await FileDb.findById(USERS_FILE, req.params.id);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    // Don't allow updating sensitive fields through this endpoint
    const { password, email, groups, ...updateData } = req.body;

    const updatedUser = await FileDb.update(USERS_FILE, req.params.id, {
      ...user,
      ...updateData,
      updatedAt: new Date().toISOString()
    });

    // Remove sensitive information from response
    const { password: _, ...userWithoutPassword } = updatedUser;

    res.json({
      status: 'success',
      data: userWithoutPassword
    });
  } catch (error) {
    next(error);
  }
};

// Join group
const joinGroup = async (req, res, next) => {
  try {
    const { groupId } = req.body;
    if (!groupId) {
      throw new ApiError(400, 'Group ID is required');
    }

    // Check if user exists
    const user = await FileDb.findById(USERS_FILE, req.params.id);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    // Check if group exists
    const group = await FileDb.findById(GROUPS_FILE, groupId);
    if (!group) {
      throw new ApiError(404, 'Group not found');
    }

    // Check if user is already in group
    if (user.groups.includes(groupId)) {
      throw new ApiError(400, 'User is already a member of this group');
    }

    // Add user to group
    const updatedUser = await FileDb.update(USERS_FILE, req.params.id, {
      ...user,
      groups: [...user.groups, groupId],
      updatedAt: new Date().toISOString()
    });

    // Increment group member count
    await FileDb.update(GROUPS_FILE, groupId, {
      ...group,
      memberCount: group.memberCount + 1,
      updatedAt: new Date().toISOString()
    });

    // Remove sensitive information from response
    const { password: _, ...userWithoutPassword } = updatedUser;

    res.json({
      status: 'success',
      data: userWithoutPassword
    });
  } catch (error) {
    next(error);
  }
};

// Leave group
const leaveGroup = async (req, res, next) => {
  try {
    const { groupId } = req.body;
    if (!groupId) {
      throw new ApiError(400, 'Group ID is required');
    }

    // Check if user exists
    const user = await FileDb.findById(USERS_FILE, req.params.id);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    // Check if group exists
    const group = await FileDb.findById(GROUPS_FILE, groupId);
    if (!group) {
      throw new ApiError(404, 'Group not found');
    }

    // Check if user is in group
    if (!user.groups.includes(groupId)) {
      throw new ApiError(400, 'User is not a member of this group');
    }

    // Remove user from group
    const updatedUser = await FileDb.update(USERS_FILE, req.params.id, {
      ...user,
      groups: user.groups.filter(id => id !== groupId),
      updatedAt: new Date().toISOString()
    });

    // Decrement group member count
    await FileDb.update(GROUPS_FILE, groupId, {
      ...group,
      memberCount: Math.max(0, group.memberCount - 1),
      updatedAt: new Date().toISOString()
    });

    // Remove sensitive information from response
    const { password: _, ...userWithoutPassword } = updatedUser;

    res.json({
      status: 'success',
      data: userWithoutPassword
    });
  } catch (error) {
    next(error);
  }
};

// Get user's groups
const getUserGroups = async (req, res, next) => {
  try {
    const user = await FileDb.findById(USERS_FILE, req.params.id);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const allGroups = await FileDb.findAll(GROUPS_FILE);
    const userGroups = allGroups.filter(group => user.groups.includes(group.id));

    res.json({
      status: 'success',
      data: userGroups
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  joinGroup,
  leaveGroup,
  getUserGroups
}; 
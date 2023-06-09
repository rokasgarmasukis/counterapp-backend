const User = require('../models/User');
const Counter = require('../models/Counter');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const USER_NOT_FOUND_MESSAGE = 'User not found';

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').lean();
  if (!users.length) {
    return res.status(400).json({ message: 'No users found' });
  }
  res.json(users);
});

// @desc Get one user
// @route GET /users/:id
// @access Private
const getUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ messsage: 'invalid id' });
  }

  const user = await User.findById(userId).select('-password').lean().exec();

  if (!user) {
    return res.status(404).json({ message: USER_NOT_FOUND_MESSAGE });
  }

  return res.json(user);
});

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;

  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate username' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userObject = { username, password: hashedPassword, roles };

  const user = await User.create(userObject);

  if (user) {
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: 'Invalid user data received' });
  }
});

// @desc Update user
// @route PATCH /users/:userId
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const { roles, password } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ messsage: 'invalid id' });
  }

  if (!Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // no lean(), because method on it like save will be used
  const user = await User.findById(userId).exec();

  if (!user) {
    return res.status(404).json({ message: USER_NOT_FOUND_MESSAGE });
  }

  user.roles = roles;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await user.save();

  res.json({ message: `user ${user.username} updated` });
});

// @desc Delete user
// @route DELETE /users/:userId
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ messsage: 'invalid id' });
  }

  const user = await User.findById(userId).exec();

  if (!user) {
    return res.status(404).json({ message: USER_NOT_FOUND_MESSAGE });
  }

  const deletedUser = await user.deleteOne();

  return res.json({
    message: `User ${deletedUser.username} with ID ${deletedUser._id} deleted`,
  });
});

module.exports = {
  getAllUsers,
  getUser,
  createNewUser,
  updateUser,
  deleteUser,
};

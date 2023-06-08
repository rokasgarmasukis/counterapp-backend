const User = require('../models/User');
const Counter = require('../models/Counter');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').lean();
  if (!users) {
    return res.status(400).json({ message: 'No users found' });
  }
  res.json(users);
});

// @desc Get one user
// @route GET /users/:id
// @access Private
const getUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.find({ id }).select('-password').lean();

  if (!user) {
    return res.status(400).json({ message: `No user with id ${id}` });
  }

  return res.json(user);
});

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;

  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: 'All fields required' });
  }
});

// @desc Update user
// @route POST /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {});

module.exports = { getAllUsers, getUser, createNewUser, updateUser };

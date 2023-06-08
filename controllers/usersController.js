const User = require('../models/User');
const Counter = require('../models/Counter');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

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
  const id = req.params.id;
  const user = await User.findOne({ id }).select('-password').lean();

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
    return res.status(400).json({ message: 'All fields are required' });
  }

  const duplicate = await User.findOne({username}).lean().exec()

  if (duplicate) {
    return res.status(409).json({message: "Duplicate username"})
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const userObject = {username, "password": hashedPassword, roles}

  const user = await User.create(userObject)

  if (user) {
    res.status(201).json({message: `New user ${username} created`})
  } else {
    res.status(400).json({message: 'Invalid user data received'})
  }


});

// @desc Update user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const {id, roles, password} = req.body

    if (!id || !username || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({message: "All fields are required"})
    }

    // no lean(), because method on it like save will be used 
    const user = await User.findById(id).exec()

    if(!user) {
        return res.status(400).json({message: "User not found"})
    }

    user.roles = roles

    if (password) {
        user.password = bcrypt.hash(password, 10)
    }

    const updatedUser = await user.save()

    res.json({message: `user ${user.username} updated`})
});

module.exports = { getAllUsers, getUser, createNewUser, updateUser };

const Counter = require('../models/Counter');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc Get all user counters
// @route GET /users/:id/counters
// @access Private
const getAllCounters = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  console.log(req.params);

  const user = User.findById(userId).lean().exec();

  if (!user) {
    res.status(400).json({ message: 'No user found' });
  }

  //   const username = user.username

  res.json({ message: 'all counters controller' });
});

// @desc Get one user counter
// @route GET /users/:id/counters/:id
// @access Private
const getCounter = asyncHandler(async (req, res) => {
  res.json({ message: 'one counter route' });
});

// @desc Create new counter
// @route POST /users/:id/counters
// @access Private
const createNewCounter = asyncHandler(async (req, res) => {
  res.json({ message: 'create counter route' });
});

// @desc Update counter
// @route PATCH /users/:id/counters
// @access Private
const updateCounter = asyncHandler(async (req, res) => {
  res.json({ message: 'update counter route' });
});

// @desc Delete counter
// @route DELETE /users/:id/counters/:id
// @access Private
const deleteCounter = asyncHandler(async (req, res) => {
  res.json({ message: 'delete counter route' });
});

module.exports = {
  getAllCounters,
  getCounter,
  createNewCounter,
  updateCounter,
  deleteCounter,
};

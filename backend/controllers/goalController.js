const asynkHandler = require('express-async-handler');

// @desc    Get all the Goals
// @route   GET to /api/goals
// @access  Private
const getGoals = asynkHandler(async (req, res) => {
  res.status(200).json({ message: 'Get all the Goals!' });
});

// @desc    Create a new Goal
// @route   POST to /api/goals
// @access  Private
const setGoal = asynkHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add Text field!!!');
  }
  res.status(201).json(req.body);
});

// @desc    Update a Goal by ID
// @route   PUT to /api/goals/:id
// @access  Private
const updateGoal = asynkHandler(async (req, res) => {
  res
    .status(200)
    .json({ message: `Update a Goal with ID = '${req.params.id}'` });
});

// @desc    Delete a Goal by ID
// @route   DELETE to /api/goals/:id
// @access  Private
const deleteGoal = asynkHandler(async (req, res) => {
  res
    .status(200)
    .json({ message: `Delete a Goal with ID = '${req.params.id}'` });
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };

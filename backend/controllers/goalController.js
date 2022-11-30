const asynkHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');
// @desc    Get all MY Goals
// @route   GET to /api/goals
// @access  Private
const getGoals = asynkHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json({
    action: 'Get all my goals',
    message: `All the Goals that belong to user with ID = '${req.user.id}'`,
    goals,
  });
});
// @desc    Create a new Goal
// @route   POST to /api/goals
// @access  Private
const setGoal = asynkHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add Text field!!!');
  }
  const goal = await Goal.create({ user: req.user.id, text: req.body.text });
  res.status(201).json(goal);
});
// @desc    Update a Goal by ID
// @route   PUT to /api/goals/:id
// @access  Private
const updateGoal = asynkHandler(async (req, res) => {
  //To update the Goal user have to provide Text field
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add Text field!!!');
  }
  //Get the Goal with given GoalID from DB
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found!');
  }
  //Check if user with given ID (that was extracted from token in auth middleware) exists as User in DB
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User is not found');
  }
  //Check if the Goal with given GoalID belongs to the User with ID from given token
  if (goal.user !== user.id) {
    res.status(401);
    throw new Error('User is not authorized!');
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});
// @desc    Delete a Goal by ID
// @route   DELETE to /api/goals/:id
// @access  Private
const deleteGoal = asynkHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found!');
  }
  //Check if user with given ID (that was extracted from token in auth middleware) exists as User in DB
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User is not found');
  }
  //Check if the Goal with given GoalID belongs to the User with ID from given token
  if (goal.user !== user.id) {
    res.status(401);
    throw new Error('User is not authorized!');
  }
  await goal.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };

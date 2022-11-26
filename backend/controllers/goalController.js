const asynkHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
// @desc    Get all the Goals
// @route   GET to /api/goals
// @access  Private
const getGoals = asynkHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});
// @desc    Create a new Goal
// @route   POST to /api/goals
// @access  Private
const setGoal = asynkHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add Text field!!!');
  }
  const goal = await Goal.create({ text: req.body.text });
  res.status(201).json(goal);
});
// @desc    Update a Goal by ID
// @route   PUT to /api/goals/:id
// @access  Private
const updateGoal = asynkHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add Text field!!!');
  }
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found!');
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
  await goal.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };

// @desc    Get all the Goals
// @route   GET to /api/goals
// @access  Private
const getGoals = (req, res) => {
  res.status(200).json({ message: 'Get all the Goals!' });
};

// @desc    Create a new Goal
// @route   POST to /api/goals
// @access  Private
const setGoal = (req, res) => {
  res.status(201).json({ message: 'Set a new Goal!' });
};

// @desc    Update a Goal by ID
// @route   PUT to /api/goals/:id
// @access  Private
const updateGoal = (req, res) => {
  res
    .status(200)
    .json({ message: `Update a Goal with ID = '${req.params.id}'` });
};

// @desc    Delete a Goal by ID
// @route   DELETE to /api/goals/:id
// @access  Private
const deleteGoal = (req, res) => {
  res
    .status(200)
    .json({ message: `Delete a Goal with ID = '${req.params.id}'` });
};

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };

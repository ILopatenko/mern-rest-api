const asynkHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// @desc    Register a new User
// @route   POST to /api/users
// @access  Public
const registerUser = asynkHandler(async (req, res) => {
  // 1 - save name, email and password from request to separate variables
  const { name, email, password } = req.body;
  // 2 - if name, email or password are missing - throw an error
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all the required fields!');
  }
  // 3 - If user with given email is already exists in DB - throw an error
  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    res.status(400);
    throw new Error('User with given email is already exists');
  }
  // 4 -  Create salt and hash for the provided password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // 5 - Create a new User with name, email and hash of given password
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  // 6 - If user was created send back status 201 and an object with user's data. Else throw an error
  if (user) {
    res.status(201).json({
      message: 'User was registered successfuly!',
      userObject: { id: user.id, name: user.name, email: user.email },
    });
  } else {
    res.status(400);
    throw new Error('Invalid Credential');
  }
});

// @desc    Log in (Authenticate) a user
// @route   POST to /api/users/login
// @access  Public
const loginUser = asynkHandler(async (req, res) => {
  // 1 - save name, email and password from request to separate variables
  const { email, password } = req.body;
  // 2 - if name, email or password are missing - throw an error
  if (!email || !password) {
    res.status(400);
    throw new Error('Please add all the required fields!');
  }
  // 3 - Find user with given email in DB
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      message: 'User was Logged In successfuly!',
      userID: user.id,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid Credential');
  }
});

// @desc    Get users's (that is logged in currently) profile information
// @route   GET to /api/users/me
// @access  Private
const getMe = asynkHandler(async (req, res) => {
  res.status(201).json({
    message: `Logged In User's profile was red successfuly!`,
    userObject: {
      userID: req.user.id,
      name: req.user.name,
      email: req.user.email,
    },
  });
});

//HELPERS:
// 1 - Generate JWT
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '10d' });

module.exports = { registerUser, loginUser, getMe };

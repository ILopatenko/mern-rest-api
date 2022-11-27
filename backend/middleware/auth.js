const jwt = require('jsonwebtoken');
const asynkHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asynkHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      // Get the token from Authorization Header
      token = req.headers.authorization.split(' ')[1];
      // Decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get the User from atoken
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not Authorized');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not Authorized! No token!');
  }
});
module.exports = { protect };

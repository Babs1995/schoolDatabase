const express = require('express');
// Construct a router instance.
const router = express.Router();
const User = require('../models').User;

// global async function to catch errors in each route
function asyncHandler (cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      // Forward error to the global error handler
      next(error);
    }
  }
}
// Route that returns a list of users.
router.get('/users', asyncHandler(async (req, res) => {
  const user = req.currentUser;
  User.findAll()
      res.status(200).json(user);
}));
// post method
router.post('/users', asyncHandler(async (req, res) => {
   try {
     // declaring user and returning 201 status 
    const user = await User.create(req.body);
    res.status(201).location("/").json(user).end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });   
    } else {
      throw error;
    }
  }
}));


module.exports = router;

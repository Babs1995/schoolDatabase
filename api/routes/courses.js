const express = require('express');
const router = express.Router();
const Course = require('../models').Course;
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
// GET route that will return all courses including the User associated with each course and a 200 HTTP status code.
router.get('/courses', asyncHandler(async (req, res) => {
    const course = req.currentCourse;
    Course.findAll()
        res.status(200).json(course);
}));
// GET route that will return the corresponding course including the User associated with that course and a 200 HTTP status code.
router.get('/courses/:id', asyncHandler(async (req, res) => {
    const course = req.currentCourse;
    Course.findOne()
        res.status(200).json(course);
}
));
// POST route that will create a new course, set the Location header to the URI for the newly created course, and return a 201 HTTP status code and no content.
router.post('/courses', asyncHandler(async (req, res) => {
    try {
      // declaring user and returning 201 status 
     const course = await Course.create(req.body);
     res.status(201).location("/courses/"+"course.id").json(course).end();
   } catch (error) {
     if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
       const errors = error.errors.map(err => err.message);
       res.status(400).json({ errors });   
     } else {
       throw error;
     }
   }
 }));

// PUT route that will update the corresponding course and return a 204 HTTP status code and no content.

router.put('/courses/:id', asyncHandler(async (req, res) => {
    try {
      // declaring user and returning 204 status 
     const course = await Course.findByPk(req.params.id);
     await course.update(req.body)
     res.status(204).end();
   } catch (error) {
     if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
       const errors = error.errors.map(err => err.message);
       res.status(400).json({ errors });   
     } else {
       throw error;
     }
   }
 }));

 // DELETE route that will delete the corresponding course and return a 204 HTTP status code and no content.
 router.delete('/courses/:id', asyncHandler(async (req, res) => {
      // declaring user and returning 204 status 
     const course = await Course.findByPk(req.params.id);
     if(course) {
        await course.destroy()
        res.status(204).end();
     } else {
         res.status(404).json({ errors })
     }
     
 }));

module.exports = router;
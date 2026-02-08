const express = require('express');

const router = express.Router();
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutController');

// GET all workouts
router.get('/', getWorkouts);

// GET a single workout by ID
router.get('/:id', getWorkout);

// POST a new workout
router.post('/', createWorkout);

// DELETE a workout by ID
router.delete('/:id', deleteWorkout);

// UPDATE a workout by ID
router.put('/:id', updateWorkout);  




                      



module.exports = router;
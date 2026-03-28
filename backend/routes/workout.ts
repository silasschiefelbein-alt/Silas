// workout.ts

import { Router } from 'express';

const router = Router();

// Mock database for workouts
let workouts = [];

// Create a new workout plan
router.post('/workout', (req, res) => {
    const { name, exercises, schedule } = req.body;
    const newWorkout = {
        id: workouts.length + 1,
        name,
        exercises,
        schedule
    };
    workouts.push(newWorkout);
    res.status(201).json(newWorkout);
});

// Retrieve all workout plans
router.get('/workouts', (req, res) => {
    res.json(workouts);
});

// Update a workout plan by ID
router.put('/workout/:id', (req, res) => {
    const { id } = req.params;
    const index = workouts.findIndex(w => w.id === parseInt(id));
    if (index === -1) return res.status(404).send('Workout not found');
    const updatedWorkout = { ...workouts[index], ...req.body };
    workouts[index] = updatedWorkout;
    res.json(updatedWorkout);
});

// Delete a workout plan by ID
router.delete('/workout/:id', (req, res) => {
    const { id } = req.params;
    const index = workouts.findIndex(w => w.id === parseInt(id));
    if (index === -1) return res.status(404).send('Workout not found');
    workouts.splice(index, 1);
    res.status(204).send();
});

// Add an exercise to a workout plan
router.post('/workout/:id/exercise', (req, res) => {
    const { id } = req.params;
    const index = workouts.findIndex(w => w.id === parseInt(id));
    if (index === -1) return res.status(404).send('Workout not found');
    const { name, sets, reps, weight, duration } = req.body;
    const newExercise = { name, sets, reps, weight, duration };
    workouts[index].exercises.push(newExercise);
    res.status(201).json(newExercise);
});

export default router;

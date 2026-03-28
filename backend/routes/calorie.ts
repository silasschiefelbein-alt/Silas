import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Sample in-memory storage for meals and calories
let meals = [];
let dailyCalorieSummary = {};
let calorieGoal = 0;

// Endpoint to log a meal
router.post('/log-meal', [
  body('name').isString().notEmpty(),
  body('calories').isNumeric().isInt({ min: 0 }),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, calories } = req.body;
  meals.push({ name, calories });
  res.status(201).json({ message: 'Meal logged successfully!' });
});

// Endpoint to get daily calorie summary
router.get('/daily-summary', (req, res) => {
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  dailyCalorieSummary = { totalCalories, calorieGoal };
  res.json(dailyCalorieSummary);
});

// Endpoint to set calorie goal
router.post('/set-calorie-goal', [
  body('goal').isNumeric().isInt({ min: 0 }),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  calorieGoal = req.body.goal;
  res.json({ message: 'Calorie goal set successfully!', calorieGoal });
});

// Endpoint to manage meals (delete meal)
router.delete('/meal/:name', (req, res) => {
  const { name } = req.params;
  meals = meals.filter(meal => meal.name !== name);
  res.json({ message: 'Meal deleted successfully!' });
});

export default router;
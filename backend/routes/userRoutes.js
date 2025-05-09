const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/usersModel');

// Admin credentials (dev mode)
const adminCredentials = {
  username: 'admin',
  password: 'password123'
};

// Create new user (signup)
router.post('/users', async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Login
router.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    if (username === adminCredentials.username && password === adminCredentials.password) {
      return res.status(200).json({ message: 'Admin login successful', user: 'admin' });
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.status(200).json({ message: 'Login successful', user: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Login error', error });
  }
});

// Get user profile
router.get('/users/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
  }
});

// Update survey data (PUT /users/:username/survey)
router.put('/users/:username/survey', async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: req.params.username },
      { $set: req.body },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'Survey data updated', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating survey', error });
  }
});

// Update BMI
router.put('/users/:username/bmi', async (req, res) => {
  const { bmi } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      { $set: { bmi } },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'BMI updated', bmi: user.bmi });
  } catch (error) {
    res.status(500).json({ message: 'Error updating BMI', error });
  }
});

// Update/Add weight entry
router.put('/users/:username/weights', async (req, res) => {
  const { weight, date } = req.body;
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const existingIndex = user.weights.findIndex(
      w => w.date.toISOString().slice(0, 10) === new Date(date).toISOString().slice(0, 10)
    );

    if (existingIndex > -1) {
      user.weights[existingIndex].weight = weight;
    } else {
      user.weights.push({ weight, date });
    }

    await user.save();
    res.status(200).json({ message: 'Weight updated', weights: user.weights });
  } catch (error) {
    res.status(500).json({ message: 'Error updating weight', error });
  }
});

// Get all weights for a user
router.get('/users/:username/weights', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select('weights -_id');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ weights: user.weights });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving weights', error });
  }
});

// Update workout plan
router.put('/users/:username/workout-plan', async (req, res) => {
  const { workoutPlan } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      { $set: { workoutPlan } },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'Workout plan updated', workoutPlan: user.workoutPlan });
  } catch (error) {
    res.status(500).json({ message: 'Error updating workout plan', error });
  }
});

// Get workout plan
router.get('/users/:username/workout-plan', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select('workoutPlan -_id');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ workoutPlan: user.workoutPlan });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving workout plan', error });
  }
});

module.exports = router;

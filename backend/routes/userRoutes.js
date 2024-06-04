// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/usersModel'); // Adjust the path according to your structure

// POST /signup route for registering a new user
router.post('/signup', async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const { username, gender, height, weight, fitnessGoals, currentActivityLevel, dietaryPreferences } = req.body;

    // Create a new user
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      gender,
      height,
      weight,
      fitnessGoals,
      currentActivityLevel,
      dietaryPreferences
    });

    // Save the user in the database
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating the user', error: error });
  }
});

router.post('/login', async (req, res) => {
    console.log(req.body);
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log("User Found: ", user)

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(user.password);
    console.log(password);
    if (isMatch) {
        console.log(!isMatch);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If login is successful, send a positive response
    res.status(200).json({ message: 'Login successful', user: user._id });
    // Optionally, you could create and send a JWT token here
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



// POST endpoint to save user's BMI
router.post('/save-bmi', async (req, res) => {
    const { username, bmi } = req.body;
    console.log(username + " " + bmi)

    // Optional: Add authentication check here

    try {
        const user = await User.findOneAndUpdate(
            { username },
            { $set: { bmi: bmi } },
            { new: true }
        );

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).json({ message: 'BMI updated successfully', updatedBMI: user.bmi });
    } catch (error) {
        res.status(500).json({ message: 'Error updating BMI', error: error });
    }
});



// POST route to handle survey data
router.post('/fitness-survey', async (req, res) => {
    const { username, gender, height, weight, fitnessGoals, currentActivityLevel, dietaryPreferences } = req.body;

    // Optional: Add authentication check here

    try {
        // Update the user with survey data
        const updatedUser = await User.findOneAndUpdate(
            { username },
            { 
                $set: { 
                    gender, 
                    height, 
                    weight, 
                    fitnessGoals, 
                    currentActivityLevel, 
                    dietaryPreferences 
                }
            },
            { new: true }
        );

        if (!updatedUser) {
            
            return res.status(404).send('User not found');
        }

        res.status(200).json({ message: 'Survey data updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating survey data', error: error });
    }
});

router.get('/user/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error retrieving user data:', error);
        res.status(500).json({ message: 'Error retrieving user data', error });
    }
});

// Update or add a new weight entry
router.post('/update-weight', async (req, res) => {
    const { username, weight, date } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if weight entry for the specific date exists
        const existingIndex = user.weights.findIndex(w => w.date.toISOString().slice(0, 10) === new Date(date).toISOString().slice(0, 10));

        if (existingIndex > -1) {
            // Update existing weight entry
            user.weights[existingIndex].weight = weight;
        } else {
            // Add new weight entry if not found
            user.weights.push({ weight, date });
        }

        await user.save();
        res.json({ message: 'Weight updated successfully', weights: user.weights });
    } catch (error) {
        console.error('Error updating user weight:', error);
        res.status(500).json({ message: 'Error updating weight', error });
    }
});


// GET weights for a specific user
router.get('/get-weights', async (req, res) => {
    const { username } = req.query; // Assuming username is passed as a query parameter
    try {
        const user = await User.findOne({ username }).select('weights -_id'); // Select only weights and exclude _id
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ weights: user.weights });
    } catch (error) {
        console.error('Error retrieving weights:', error);
        res.status(500).json({ message: 'Error retrieving user weights', error });
    }
});


// POST endpoint to save user's workout plan
router.post('/save-workout-plan', async (req, res) => {
    const { username, workoutPlan } = req.body;

    try {
        const user = await User.findOneAndUpdate(
            { username },
            { $set: { workoutPlan: workoutPlan } },
            { new: true }
        );

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).json({ message: 'Workout plan updated successfully', workoutPlan: user.workoutPlan });
    } catch (error) {
        res.status(500).json({ message: 'Error updating workout plan', error: error });
    }
});

// GET endpoint to retrieve user's workout plan
router.get('/get-workout-plan/:username', async (req, res) => {
    const username = req.params.username;

    try {
        const user = await User.findOne({ username }).select('workoutPlan -_id');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ workoutPlan: user.workoutPlan });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving workout plan', error: error });
    }
});



module.exports = router;
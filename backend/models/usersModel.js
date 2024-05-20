const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [3, 'Username must be at least 3 characters long']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [3, 'Password must be at least 6 characters long']
  },

  //user information
  gender: {
      type: String,
      //required: [true, 'Gender is required'],
    },

    height: {
      type: Number,
      //required: [true, 'Height is required'],
      default: '',
    },
    fitnessGoals: {
      type: String, // or an array or object if you need to store multiple goals or detailed information
      default: '',
    },
    bmi: {
    type: Number,
    default: 0 // Set to 0 or null as default
  },
  weights: [{
    weight: {
      type: Number,
      required: [true, 'Weight is required']
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
    currentActivityLevel: {
    type: String, // e.g., 'sedentary', 'active', 'very active'
    default: '',
  },

  // Dietary Information
  dietaryPreferences: {
    type: String, // e.g., 'vegetarian', 'vegan', 'low-carb'
    default: '',
  },
// Generated Plan
  workoutPlan: {
    type: String,
    default: '' // Default to an empty string or null
  },
  dietPlan: {
    type: String,
    default: '' // Default to an empty string or null
  }

});

// Pre-save hook to hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare password for login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;

require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const session = require('express-session');


const app = express();
console.log('MongoDB URI:', process.env.URI);


// Connect to MongoDB
const mongoDB = process.env.URI;
mongoose.connect(mongoDB)
  .then(() => console.log('DB Connected!'))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });

app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));


app.use(session({
  secret: 'hello', // Secret key for signing the session ID cookie
  resave: false, // Don't save the session if unmodified
  saveUninitialized: false, // Don't create a session until something is stored
  cookie: { secure: false } // Set to true if using https
}));

// Use the userRoutes for any requests to /api/users
app.use('/api/users', userRoutes);

// API endpoint for testing
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the API' });
});

// The catch-all handler for any requests that don't match API endpoints
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Unhandled Rejection at: ${promise} - reason: ${err.message}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

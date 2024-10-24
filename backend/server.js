require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const session = require('express-session');
const OpenAI = require('openai');
const axios = require('axios');

const app = express();

// Load environment variables
const gpt = process.env.OPENAI_API_KEY; // Use the OpenAI API key from .env
const mongoDB = process.env.MONGO_URI; // Use the MongoDB URI from .env

mongoose.connect(mongoDB)
  .then(() => console.log('DB Connectedd!'))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.use(session({
  secret: process.env.SESSION_SECRET, // Use the session secret from .env
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use('/api/users', userRoutes);

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the API' });
});

const openai = new OpenAI({
  apiKey: gpt // Now using the key from the environment variable
});

console.log("OpenAI connected");

app.post('/api/chatgpt', async (req, res) => {
  const { question } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: question }],
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${gpt}`,
        },
      }
    );

    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error fetching ChatGPT response:', error);
    if (error.response) {
      console.error('Error response status:', error.response.status);
      console.error('Error response data:', error.response.data);
      return res.status(error.response.status).json({ error: error.response.data });
    }
    res.status(500).json({ error: 'Failed to fetch response from ChatGPT' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Unhandled Rejection at: ${promise} - reason: ${err.message}`);
});

process.on('uncaughtException', (err) => {
  console.log(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

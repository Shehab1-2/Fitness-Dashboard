require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');
const OpenAI = require('openai');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A sample Express API with Swagger docs',
    },
  },
  apis: ['./routes/*.js'], // Path to your route files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to MongoDB
const mongoDB = process.env.MONGO_URI;
mongoose.connect(process.env.MONGO_URI, {
  ssl: true,
  tlsAllowInvalidCertificates: false, // Optional, use true only for dev
})

  .then(() => console.log('✅ MongoDB connected!'))
  .catch(err => console.error(`❌ MongoDB connection error: ${err.message}`));

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend (React build)
app.use(express.static(path.join(__dirname, 'build')));

// Session management
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' },
}));

// API Routes
app.use('/api/users', userRoutes);

app.get('/health', (req, res) => {
  res.send('OK');
});

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the API' });
});

// OpenAI Setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let openAIAvailable = false;

(async () => {
  try {
    await openai.models.list();
    console.log('✅ OpenAI connected HIPy YAYAYAYAAYAY!');
    openAIAvailable = true;
  } catch (err) {
    console.warn('⚠️ OpenAI not available:', err.message);
  }
})();

app.post('/api/chatgpt', async (req, res) => {
  const { question } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: question }],
      max_tokens: 4096,
    });

    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error('❌ ChatGPT error:', error.message);
    if (error.response) {
      return res.status(error.response.status).json({ error: error.response.data });
    }
    res.status(500).json({ error: 'ChatGPT request failed' });
  }
});

// Catch-all for React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Server listening
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

// Global error handling
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err.message);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err.message);
  process.exit(1);
});



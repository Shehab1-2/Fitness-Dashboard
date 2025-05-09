// app.js - Jest 
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');
const OpenAI = require('openai');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

// Swagger config
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A sample Express API with Swagger docs',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' },
}));

// Static + Routes
app.use(express.static(path.join(__dirname, 'build')));
app.use('/', userRoutes);

// Health & API check routes
app.get('/health', (req, res) => res.send('OK'));
app.get('/data', (req, res) => res.json({ message: 'Hello from the API' }));

// OpenAI setup
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
let openAIAvailable = false;

(async () => {
  try {
    await openai.models.list();
    console.log('✅ OpenAI connected (test env)');
    openAIAvailable = true;
  } catch (err) {
    console.warn('⚠️ OpenAI not available (test env):', err.message);
  }
})();

app.post('/chatgpt', async (req, res) => {
  const { question } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: question }],
      max_tokens: 4096,
    });
    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error('❌ ChatGPT error (test env):', error.message);
    if (error.response) {
      return res.status(error.response.status).json({ error: error.response.data });
    }
    res.status(500).json({ error: 'ChatGPT request failed' });
  }
});

// React SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = app;

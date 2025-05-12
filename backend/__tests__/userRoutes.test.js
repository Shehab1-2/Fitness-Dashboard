const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const User = require('../models/usersModel');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe('User Routes (RESTful)', () => {
  const userData = {
    username: 'testuser',
    password: 'securepass',
    gender: 'male',
    height: 180,
    weight: 75,
    fitnessGoals: 'Lose weight',
    currentActivityLevel: 'Active',
    dietaryPreferences: 'Vegan',
  };

  it('should create a new user', async () => {
    const res = await request(app).post('/signup').send(userData);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User created successfully');
  });

  it('should login with valid credentials', async () => {
    await request(app).post('/signup').send(userData);
    const res = await request(app).post('/auth/login').send({
      username: 'testuser',
      password: 'securepass',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Login successful');
  });

  it('should get user profile', async () => {
    await request(app).post('/signup').send(userData);
    const res = await request(app).get('/users/testuser');
    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe('testuser');
  });

  it('should update survey data', async () => {
    await request(app).post('/signup').send(userData);
    const res = await request(app)
      .put('/users/testuser/survey')
      .send({ dietaryPreferences: 'Keto' });
    expect(res.statusCode).toBe(200);
    expect(res.body.user.dietaryPreferences).toBe('Keto');
  });

  it('should update BMI', async () => {
    await request(app).post('/signup').send(userData);
    const res = await request(app)
      .put('/users/testuser/bmi')
      .send({ bmi: 23.5 });
    expect(res.statusCode).toBe(200);
    expect(res.body.bmi).toBe(23.5);
  });

  it('should update weight', async () => {
    await request(app).post('/signup').send(userData);
    const res = await request(app)
      .put('/users/testuser/weights')
      .send({ weight: 72, date: new Date().toISOString() });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Weight updated');
  });

  it('should get weights', async () => {
    await request(app).post('/signup').send(userData);
    await request(app)
      .put('/users/testuser/weights')
      .send({ weight: 72, date: new Date().toISOString() });
    const res = await request(app).get('/users/testuser/weights');
    expect(res.statusCode).toBe(200);
    expect(res.body.weights.length).toBe(1);
  });

  it('should update workout plan', async () => {
    await request(app).post('/signup').send(userData);
    const res = await request(app)
      .put('/users/testuser/workout-plan')
      .send({ workoutPlan: { monday: 'Chest day' } });
    expect(res.statusCode).toBe(200);
    expect(res.body.workoutPlan.monday).toBe('Chest day');
  });

  it('should get workout plan', async () => {
    await request(app).post('/signup').send(userData);
    await request(app)
      .put('/users/testuser/workout-plan')
      .send({ workoutPlan: { tuesday: 'Back day' } });
    const res = await request(app).get('/users/testuser/workout-plan');
    expect(res.statusCode).toBe(200);
    expect(res.body.workoutPlan.tuesday).toBe('Back day');
  });
});

const axios = require('axios');
const BASE_URL = 'http://localhost:5001/api/users';

const USE_UNIQUE_USER = false; // Set to true if you want to test with a fresh user every time

const baseUsername = 'testuser';
const user = {
  username: USE_UNIQUE_USER ? `${baseUsername}_${Date.now()}` : baseUsername,
  password: 'testpass123',
  gender: 'Male',
  height: 180,
  weight: 75,
  fitnessGoals: 'Build muscle',
  currentActivityLevel: 'Moderate',
  dietaryPreferences: 'High protein',
};

const runTests = async () => {
  try {
    console.log('\n[1] Signup');
    try {
      await axios.post(`${BASE_URL}/signup`, user);
      console.log('✅ Signup successful');
    } catch (err) {
      if (err.response?.status === 409) {
        console.log('ℹ️ User already exists, continuing to login');
      } else {
        throw err;
      }
    }

    console.log('\n[2] Login');
    await axios.post(`${BASE_URL}/login`, {
      username: user.username,
      password: user.password,
    });
    console.log('✅ Login successful');

    console.log('\n[3] Save BMI');
    await axios.post(`${BASE_URL}/save-bmi`, {
      username: user.username,
      bmi: 23.5,
    });
    console.log('✅ BMI saved');

    console.log('\n[4] Fitness Survey');
    await axios.post(`${BASE_URL}/fitness-survey`, {
      ...user,
      height: 181,
      weight: 77,
      fitnessGoals: 'Lose fat',
    });
    console.log('✅ Fitness survey updated');

    console.log('\n[5] Update Weight');
    await axios.post(`${BASE_URL}/update-weight`, {
      username: user.username,
      weight: 76,
      date: new Date().toISOString(),
    });
    console.log('✅ Weight updated');

    console.log('\n[6] Get Weights');
    const weights = await axios.get(`${BASE_URL}/get-weights`, {
      params: { username: user.username },
    });
    console.log('✅ Weights fetched:', weights.data);

    console.log('\n[7] Save Workout Plan');
    await axios.post(`${BASE_URL}/save-workout-plan`, {
      username: user.username,
      workoutPlan: {
        Monday: 'Chest + Triceps',
        Tuesday: 'Back + Biceps',
        Wednesday: 'Legs',
      },
    });
    console.log('✅ Workout plan saved');

    console.log('\n[8] Get Workout Plan');
    const workout = await axios.get(`${BASE_URL}/get-workout-plan/${user.username}`);
    console.log('✅ Workout plan fetched:', workout.data);

    console.log('\n[9] Get User Profile');
    const profile = await axios.get(`${BASE_URL}/user/${user.username}`);
    console.log('✅ Profile fetched:', profile.data);

    console.log('\n[10] ChatGPT Prompt');
    const gpt = await axios.post('http://localhost:5001/api/chatgpt', {
      question: 'Give me a macro-friendly meal plan for cutting.',
    });
    console.log('✅ GPT response:', gpt.data.response);

    console.log('\n🎉 All tests completed successfully!');
  } catch (err) {
    console.error(`❌ Error:`, err.response?.data || err.message);
  }
};

runTests();

const axios = require('axios');

const BASE_API = 'http://localhost:5001';
const BASE_URL = `${BASE_API}`;
const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1370205047253766306/GAHjEyqMj3CIvsFXjoUzA5jXmJTe4j7EiJntfUP-mLjEE2C_S1aCKH8bv18t4YSeDGkh';

const baseUsername = 'testuser';
const user = {
  username: `${baseUsername}_${Date.now()}`,
  password: 'testpass123',
  gender: 'Male',
  height: 180,
  weight: 75,
  fitnessGoals: 'Build muscle',
  currentActivityLevel: 'Moderate',
  dietaryPreferences: 'High protein',
};

const sendToDiscord = async (content) => {
  try {
    await axios.post(DISCORD_WEBHOOK, {
      username: 'Fitness Bot',
      content,
    });
  } catch (err) {
    console.error('❌ Discord webhook error:', err.message);
  }
};

const runTests = async () => {
  let success = true;
  let results = `🧪 **Test Summary**\n\n👤 Username: \`${user.username}\`\n🔑 Password: \`${user.password}\`\n`;

  try {
    const addResult = (label, status, data = '') => {
      results += `${status ? '✅' : '❌'} ${label}${data ? `: \`${JSON.stringify(data).slice(0, 100)}\`` : ''}\n`;
    };

    const post = async (url, body) => (await axios.post(url, body)).data;
    const put = async (url, body) => (await axios.put(url, body)).data;
    const get = async (url) => (await axios.get(url)).data;

    await post(`${BASE_URL}/users`, user); // Signup
    addResult('Signup', true);

    await post(`${BASE_URL}/auth/login`, { username: user.username, password: user.password }); // Login
    addResult('Login', true);

    await put(`${BASE_URL}/users/${user.username}/bmi`, { bmi: 23.5 });
    addResult('Save BMI', true);

    await put(`${BASE_URL}/users/${user.username}/survey`, {
      ...user,
      height: 181,
      weight: 77,
      fitnessGoals: 'Lose fat',
    });
    addResult('Fitness Survey', true);

    await put(`${BASE_URL}/users/${user.username}/weights`, {
      weight: 76,
      date: new Date().toISOString(),
    });
    addResult('Update Weight', true);

    const weights = await get(`${BASE_URL}/users/${user.username}/weights`);
    addResult('Get Weights', true, weights);

    await put(`${BASE_URL}/users/${user.username}/workout-plan`, {
      workoutPlan: {
        Monday: 'Chest + Triceps',
        Tuesday: 'Back + Biceps',
        Wednesday: 'Legs',
      },
    });
    addResult('Save Workout Plan', true);

    const workout = await get(`${BASE_URL}/users/${user.username}/workout-plan`);
    addResult('Get Workout Plan', true, workout);

    const profile = await get(`${BASE_URL}/users/${user.username}`);
    addResult('Get User Profile', true, profile);

    const gpt = await post(`${BASE_URL}/chatgpt`, {
      question: 'Give me a macro-friendly meal plan for cutting.',
    });
    addResult('ChatGPT Prompt', true, { response: gpt.response.slice(0, 60) + '...' });

  } catch (err) {
    success = false;
    results += `\n❌ **Test failed**: ${err.response?.data?.message || err.message}`;
  }

  await sendToDiscord(results);
};

runTests().catch(err => {
  console.error('❌ Unhandled error in runTests:', err.message);
  process.exit(1);
});

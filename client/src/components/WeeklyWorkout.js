import React, { useState, useEffect } from 'react';
import './WeeklyWorkout.css';
import SideNav from './SideNav';

const WeeklyWorkout = () => {
  const [surveyData, setSurveyData] = useState({
    gender: '',
    height: '',
    weight: '',
    fitnessGoals: '',
    currentActivityLevel: '',
    dietaryPreferences: ''
  });

  const [workoutPlan, setWorkoutPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const username = localStorage.getItem('username'); // Retrieve the username from localStorage

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/users/${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const data = await response.json();
        setSurveyData({
          gender: data.gender || '',
          height: data.height || '',
          weight: data.weights.length > 0 ? data.weights[0].weight : '',
          fitnessGoals: data.fitnessGoals || '',
          currentActivityLevel: data.currentActivityLevel || '',
          dietaryPreferences: data.dietaryPreferences || ''
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data.');
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSurveyData({
      ...surveyData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setWorkoutPlan('');

    const prompt = `
      Create a weekly workout plan for a user with the following details:
      - Gender: ${surveyData.gender}
      - Height: ${surveyData.height} in
      - Weight: ${surveyData.weight} lb
      - Fitness Goals: ${surveyData.fitnessGoals}
      - Current Activity Level: ${surveyData.currentActivityLevel}
      - Dietary Preferences: ${surveyData.dietaryPreferences}

      The plan should include exercises from Monday to Sunday, each day should have a minium of 
      5 exercises specifying the type of exercise, sets, reps strictly with no additional information. `;

    try {
      const response = await fetch('http://localhost:5001/chatgpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: prompt }),
      });

      if (response.ok) {
        const data = await response.json();
        setWorkoutPlan(data.response);

        // Save the generated workout plan to the user's profile
        await fetch(`http://localhost:5001/users/${username}/workout-plan`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, workoutPlan: data.response }),
        });
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'An error occurred');
      }
    } catch (error) {
      setError('An error occurred while fetching the workout plan.');
    }

    setLoading(false);
  };

  return (
    <div className="weekly-workout-dashboard">
      <div className="dashboard-grid">
        <div className="weekly-workout-content">
          <h2>Generate Your Weekly Workout Plan</h2>
          <div className="form-group">
            <label>Gender:</label>
            <select name="gender" value={surveyData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Height (in):</label>
            <input 
              type="number" 
              name="height" 
              value={surveyData.height} 
              onChange={handleChange} 
            />
          </div>
          <div className="form-group">
            <label>Weight (lb):</label>
            <input 
              type="number" 
              name="weight" 
              value={surveyData.weight} 
              onChange={handleChange} 
            />
          </div>
          <div className="form-group">
            <label>Fitness Goals:</label>
            <select name="fitnessGoals" value={surveyData.fitnessGoals} onChange={handleChange}>
              <option value="">Select Fitness Goal</option>
              <option value="lose weight">Lose Weight</option>
              <option value="gain muscle">Gain Muscle</option>
              <option value="improve stamina">Improve Stamina</option>
              <option value="increase flexibility">Increase Flexibility</option>
            </select>
          </div>
          <div className="form-group">
            <label>Current Activity Level:</label>
            <select name="currentActivityLevel" value={surveyData.currentActivityLevel} onChange={handleChange}>
              <option value="">Select Activity Level</option>
              <option value="sedentary">Sedentary</option>
              <option value="active">Active</option>
              <option value="very active">Very Active</option>
            </select>
          </div>
          <div className="form-group">
            <label>Dietary Preferences:</label>
            <select name="dietaryPreferences" value={surveyData.dietaryPreferences} onChange={handleChange}>
              <option value="">Select Dietary Preference</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="paleo">Paleo</option>
              <option value="keto">Keto</option>
              <option value="none">None</option>
            </select>
          </div>
          <button className="button" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Workout Plan'}
          </button>
          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}
          {workoutPlan && (
            <div className="workout-plan">
              <h3>Your Weekly Workout Plan</h3>
              <pre>{workoutPlan}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeeklyWorkout;

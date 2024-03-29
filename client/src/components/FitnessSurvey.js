import React, { useState } from 'react';
import axios from 'axios'; // Assuming axios is used for API calls
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './FitnessSurvey.css';

const SurveyForm = () => {
  const [surveyData, setSurveyData] = useState({
    username: '',
    gender: '',
    height: '',
    weight: '',
    fitnessGoals: '',
    currentActivityLevel: '',
    dietaryPreferences: ''
  });

  const handleChange = (e) => {
    setSurveyData({ ...surveyData, [e.target.name]: e.target.value });
  };

const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add validation or processing of data here if needed

    try {
      // Send data to the server using Fetch API
      const response = await fetch('http://localhost:5001/api/users/fitness-survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyData),
      });

      const data = await response.json();

      // Check if the response is successful
      if (response.ok) {
        console.log('Survey Data Saved:', data);
        // Redirect to the dashboard
        navigate('/dashboard'); // Replace '/dashboard' with the actual path to your dashboard
      } else {
        // Handle scenarios where the request was processed but the server response indicates an issue
        throw new Error(data.message || 'Error saving survey data');
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error:', error.message);
        alert('Failed to save survey data: ' + error.message);

    }
  };

  return (
    <form onSubmit={handleSubmit} className="fitness-survey-form">
      <label>Gender:</label>
      <select name="gender" value={surveyData.gender} onChange={handleChange}>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <label>Height (cm):</label>
      <input 
        type="number" 
        name="height" 
        value={surveyData.height} 
        onChange={handleChange} 
      />

      <label>Weight (kg):</label>
      <input 
        type="number" 
        name="weight" 
        value={surveyData.weight} 
        onChange={handleChange} 
      />

      <label>Fitness Goals:</label>
      <textarea 
        name="fitnessGoals" 
        value={surveyData.fitnessGoals} 
        onChange={handleChange}
      ></textarea>

      <label>Current Activity Level:</label>
      <select name="currentActivityLevel" value={surveyData.currentActivityLevel} onChange={handleChange}>
        <option value="">Select Activity Level</option>
        <option value="sedentary">Sedentary</option>
        <option value="active">Active</option>
        <option value="very active">Very Active</option>
      </select>

      <label>Dietary Preferences:</label>
      <textarea 
        name="dietaryPreferences" 
        value={surveyData.dietaryPreferences} 
        onChange={handleChange}
      ></textarea>

      <button type="submit">Submit</button>
    </form>
  );
};

export default SurveyForm;

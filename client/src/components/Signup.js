import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import Header from './Header';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    gender: '',
    height: '',
    heightUnit: 'inches',
    weight: '',
    fitnessGoals: '',
    currentActivityLevel: '',
    dietaryPreferences: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5001/api/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.status === 201) {
        alert('Signup and survey completed successfully');
        navigate('/dashboard'); // Direct to the dashboard or next part of your application
      } else {
        throw new Error(data.message || 'Signup failed');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    
    <div className='signup'>
       <Header />
      <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up and Complete Your Fitness Survey</h2>

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />

          {/* Add the survey questions here */}
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="Height"
          />

          <select name="heightUnit" value={formData.heightUnit} onChange={handleChange}>
            <option value="inches">Inches</option>
            <option value="feet">Feet</option>
          </select>

          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Weight"
          />

          <select name="fitnessGoals" value={formData.fitnessGoals} onChange={handleChange}>
            <option value="">Select Fitness Goal</option>
            <option value="lose weight">Lose Weight</option>
            <option value="gain muscle">Gain Muscle</option>
            <option value="improve stamina">Improve Stamina</option>
          </select>

          <select name="currentActivityLevel" value={formData.currentActivityLevel} onChange={handleChange}>
            <option value="">Select Activity Level</option>
            <option value="sedentary">Sedentary</option>
            <option value="active">Active</option>
            <option value="very active">Very Active</option>
          </select>

          <select name="dietaryPreferences" value={formData.dietaryPreferences} onChange={handleChange}>
            <option value="">Select Dietary Preference</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="paleo">Paleo</option>
            <option value="keto">Keto</option>
          </select>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

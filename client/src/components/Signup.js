// Signup.jsx
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing again
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:5001/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.status === 201) {
        localStorage.setItem('username', formData.username);
        navigate('/dashboard'); // Direct to the dashboard
      } else {
        throw new Error(data.message || 'Signup failed');
      }
    } catch (error) {
      setError(error.message || 'Network error. Please try again later.');
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <Header />
      
      <div className="signup-container">
        <div className="signup-image">
          {/* Background image is handled via CSS */}
        </div>
        
        <div className="signup-form-wrapper">
          <div className="signup-form-content">
            <h1 className="signup-title">Create Account</h1>
            <p className="signup-subtitle">Complete your profile to get personalized fitness recommendations</p>
            
            {error && <div className="error-message">{error}</div>}
            
            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="form-section">
                <h3 className="section-title">Account Information</h3>
                
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div className="form-group">
                  <div className="password-label-group">
                    <label htmlFor="password">Password</label>
                    <a href="#" className="forgot-password" onClick={(e) => e.preventDefault()}>
                      Forgot password?
                    </a>
                  </div>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      required
                      disabled={isLoading}
                    />
                    <button 
                      type="button" 
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? 
                        <span className="eye-icon">👁️</span> : 
                        <span className="eye-icon">👁️‍🗨️</span>
                      }
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h3 className="section-title">Physical Stats</h3>
                
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="form-row">
                  <div className="form-group flex-grow">
                    <label htmlFor="height">Height</label>
                    <input
                      type="number"
                      id="height"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      placeholder="Enter height"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="form-group unit-select">
                    <label htmlFor="heightUnit">Unit</label>
                    <select
                      id="heightUnit"
                      name="heightUnit"
                      value={formData.heightUnit}
                      onChange={handleChange}
                      disabled={isLoading}
                    >
                      <option value="inches">Inches</option>
                      <option value="feet">Feet</option>
                      <option value="cm">Centimeters</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="weight">Weight (lbs)</label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Enter weight"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="form-section">
                <h3 className="section-title">Fitness Profile</h3>
                
                <div className="form-group">
                  <label htmlFor="fitnessGoals">Fitness Goals</label>
                  <select
                    id="fitnessGoals"
                    name="fitnessGoals"
                    value={formData.fitnessGoals}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  >
                    <option value="">Select Fitness Goal</option>
                    <option value="lose weight">Lose Weight</option>
                    <option value="gain muscle">Gain Muscle</option>
                    <option value="improve stamina">Improve Stamina</option>
                    <option value="maintain">Maintain Current Fitness</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="currentActivityLevel">Activity Level</label>
                  <select
                    id="currentActivityLevel"
                    name="currentActivityLevel"
                    value={formData.currentActivityLevel}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  >
                    <option value="">Select Activity Level</option>
                    <option value="sedentary">Sedentary (Little to no exercise)</option>
                    <option value="light">Light (Exercise 1-3 days/week)</option>
                    <option value="moderate">Moderate (Exercise 3-5 days/week)</option>
                    <option value="active">Active (Exercise 6-7 days/week)</option>
                    <option value="very active">Very Active (Professional athlete/physical job)</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="dietaryPreferences">Dietary Preferences</label>
                  <select
                    id="dietaryPreferences"
                    name="dietaryPreferences"
                    value={formData.dietaryPreferences}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  >
                    <option value="">Select Dietary Preference</option>
                    <option value="no restrictions">No Restrictions</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="paleo">Paleo</option>
                    <option value="keto">Keto</option>
                    <option value="mediterranean">Mediterranean</option>
                  </select>
                </div>
              </div>
              
              <button type="submit" className="signup-button" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
            
            <div className="login-prompt">
              Already have an account? <a href="/login">Login</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
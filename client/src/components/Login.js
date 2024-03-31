import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Login.css';
import Header from './Header';
import Dashboard from './Dashboard';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace 'REACT_APP_API_URL' with your actual environment variable
      const response = await fetch(`http://localhost:5001/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          gender: formData.gender
        }),
      });

      const data = await response.json();
      if (response.status === 200) {
        // Handle successful login
        localStorage.setItem('username', formData.username);
        localStorage.setItem('gender', formData.gender);
        localStorage.setItem('weight', formData.weight);
        localStorage.setItem('height', formData.height);
        
        // For example, store the user token in local storage or context
        // localStorage.setItem('userToken', data.token); // Uncomment if you're using JWT tokens
        alert('Login successful');
        navigate('/dashboard'); // Navigate to the dashboard
      } else {
        // Handle errors, e.g., invalid credentials
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      // Handle network errors
      alert('Login request failed: ' + error.message);
    }
  };

  return (
    <div className='login'>
      <Header />
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
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
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

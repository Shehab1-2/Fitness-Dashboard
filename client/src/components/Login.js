import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Header from './Header';
import Dashboard from './Dashboard';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  // Default credentials (hardcoded for offline use)
  const defaultCredentials = {
    username: 'admin',
    password: 'password123', // Replace with your preferred credentials
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5001/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (response.ok) {
        // Successful cloud-based login
        const data = await response.json();
        localStorage.setItem('username', formData.username);
        alert('Login successful');
        navigate('/dashboard');
      } else {
        // Handle cloud-based login error (non-200 status)
        console.log('Server responded with an error, checking local credentials...');
        fallbackToLocalCredentials();
      }
    } catch (error) {
      // Network error or server unreachable
      console.log('Network or server error, checking local credentials...', error.message);
      fallbackToLocalCredentials();
    }
  };

  // Fallback to local credentials in case of server failure or error
  const fallbackToLocalCredentials = () => {
    if (
      formData.username === defaultCredentials.username &&
      formData.password === defaultCredentials.password
    ) {
      // Successful local login
      localStorage.setItem('username', formData.username);
      alert('Login successful (local)');
      navigate('/dashboard');
    } else {
      // If the credentials are invalid, show an error
      alert('Invalid credentials (offline mode)');
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

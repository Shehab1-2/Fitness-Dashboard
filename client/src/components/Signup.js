import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import Header from './Header';

const Signup = () => {
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
      //console.log(process.env.REACT_APP_API_URL);
      // http://localhost:5001/api/users/signup
      const response = await fetch(`http://localhost:5001/api/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.status === 201) {
        alert('Signup successful');
        //navigate('/fitnessanimation')
        navigate('/fitness-survey'); // Redirect to login page
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
        <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
    </div>
  );
};

export default Signup;

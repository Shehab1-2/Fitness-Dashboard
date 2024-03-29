import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from './Header';
import './HomePage.css';

const HomePage = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate(); // Create a navigate function

  useEffect(() => {
    setFadeIn(true);
  }, []);

  // Function to handle button click
  const handleStartNowClick = () => {
    navigate('/signup'); // Navigate to the sign-up page
  };

  return (
    <div className="homepage">
      <Header />
      <div className={`content ${fadeIn ? 'fade-in' : ''}`}>
        <h1>Embark on a fitness journey tailored by AI...</h1>
        <p>Optimize your fitness regimen with the power of AI...</p>
        
        <button className="start-now-btn" onClick={handleStartNowClick}>
          Start Now
        </button>
      </div>
    </div>
  );
};

export default HomePage;

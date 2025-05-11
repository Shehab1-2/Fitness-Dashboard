// HomePage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './HomePage.css';

const HomePage = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleStartNowClick = () => {
    navigate('/signup');
  };

  return (
    <div className="homepage">
      <Header />
      
      <div className={`hero-section ${fadeIn ? 'fade-in' : ''}`}>
        <div className="hero-content">
          <h1 className="hero-title">Train Smarter,<br /><span className="highlight">Not Harder</span></h1>
          <p className="hero-subtitle">Your AI fitness coach that adapts to your unique body and goals</p>
          
          <div className="cta-container">
            <button className="start-now-btn" onClick={handleStartNowClick}>
              Start Your Journey
            </button>
            <p className="no-credit-card">No credit card required • Cancel anytime</p>
          </div>
        </div>
        
        <div className="hero-image">
          {/* Placeholder for a hero image/graphic */}
        </div>
      </div>
      
      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon ai-icon"></div>
          <h3>AI-Powered</h3>
          <p>Workouts that adapt to your progress</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon track-icon"></div>
          <h3>Real-time Tracking</h3>
          <p>Monitor your fitness journey with precision</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon community-icon"></div>
          <h3>Community Driven</h3>
          <p>Join thousands of fitness enthusiasts</p>
        </div>
      </div>
      
      <div className="social-proof">
        <p className="testimonial">"This app transformed my approach to fitness in just weeks."</p>
        <div className="rating">★★★★★</div>
      </div>
    </div>
  );
};

export default HomePage;
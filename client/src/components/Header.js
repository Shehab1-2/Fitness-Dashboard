// Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

// Menu items for our header
const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Programs', path: '/programs' },
  { label: 'Nutrition', path: '/nutrition' },
  { label: 'Community', path: '/community' },
];

// Feature items for dropdown menu
const featureItems = [
  {
    icon: 'workout-icon',
    title: 'AI Workouts',
    description: 'Personalized routines that adapt to your progress',
  },
  {
    icon: 'nutrition-icon',
    title: 'Smart Meal Plans',
    description: 'Customized nutrition based on your fitness goals',
  },
  {
    icon: 'tracking-icon',
    title: 'Progress Analytics',
    description: 'Visualize your improvements with detailed metrics',
  },
  {
    icon: 'community-icon',
    title: 'Community Support',
    description: 'Connect with others on the same fitness journey',
  },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleFeatures = () => {
    setFeaturesOpen(!featuresOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-link">
          <div className="logo">Fit.IO</div>
        </Link>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          <nav className="nav-links">
            {navItems.map((item, index) => (
              <Link key={index} to={item.path} className="nav-link">
                {item.label}
              </Link>
            ))}
            
            {/* Features Dropdown */}
            <div className="features-dropdown">
              <button className="features-button">
                Features
                <span className="dropdown-icon">▼</span>
              </button>
              
              <div className="dropdown-content">
                <div className="dropdown-grid">
                  {featureItems.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <div className={`feature-icon ${feature.icon}`}></div>
                      <div className="feature-text">
                        <h4>{feature.title}</h4>
                        <p>{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="dropdown-footer">
                  <div className="footer-content">
                    <div>
                      <h4>Ready to transform?</h4>
                      <p>Start your fitness journey today with AI guidance</p>
                    </div>
                    <Link to="/signup" className="start-now">Get Started</Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          
          <div className="auth-buttons">
            <Link to="/login">
              <button className="login-button">Log In</button>
            </Link>
            <Link to="/signup">
              <button className="signup-button">Sign Up</button>
            </Link>
          </div>
        </div>

        {/* Mobile burger menu */}
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          <div className={`burger ${mobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav-links">
          {navItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path} 
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          
          {/* Mobile Features Dropdown */}
          <div className="mobile-dropdown">
            <button className="mobile-dropdown-button" onClick={toggleFeatures}>
              Features
              <span className={`mobile-dropdown-icon ${featuresOpen ? 'open' : ''}`}>▼</span>
            </button>
            
            <div className={`mobile-dropdown-content ${featuresOpen ? 'open' : ''}`}>
              {featureItems.map((feature, index) => (
                <div key={index} className="mobile-feature-item">
                  <div className={`mobile-feature-icon ${feature.icon}`}></div>
                  <div className="mobile-feature-text">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </nav>
        
        <div className="mobile-auth-buttons">
          <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
            <button className="mobile-button login">Log In</button>
          </Link>
          <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
            <button className="mobile-button signup">Sign Up</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
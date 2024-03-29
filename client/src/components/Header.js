import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Make sure to create a corresponding CSS file

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="logo-link">
        <div className="logo">Fit.IO</div>
      </Link>
      <div className="navigation">
        <Link to="/signup">
          <button className="nav-button">Sign Up</button>
        </Link>
        <Link to="/login">
          <button className="nav-button">Log In</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;

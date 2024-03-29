// Import React and necessary hooks and components from 'react-router-dom'
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
// Importing the CSS file for styling this component
import './UserHeader.css';

// Define the UserHeader functional component
const UserHeader = () => {
  // useNavigate hook from react-router-dom is used for programmatically navigating between routes
  const navigate = useNavigate();

  // handleLogout function - triggered when the logout button is clicked
  const handleLogout = () => {
    // Removes 'username' from localStorage, effectively logging the user out
    localStorage.removeItem('username');
    // Redirects the user to the login page after logging out
    navigate('/login');
  };

  // navigateToDashboard function - triggered when the Dashboard logo is clicked
  const navigateToDashboard = () => {
    // Navigates to the dashboard page
    navigate('/dashboard');
  };

  // JSX returned by the UserHeader component
  return (
    // Top-level div with a class for styling purposes
    <div className="user-header">
      {/* Div wrapping the Dashboard logo. Clicking it triggers navigateToDashboard */}
      <div className="logo" onClick={navigateToDashboard}>Dashboard</div>
      
      {/* Container div for navigation links */}
      <div className="navigation">
        {/* Each Link component is used to navigate to different routes in the application.
            They are wrappers around buttons with specific navigation paths. */}

        {/* Link to the BMI check page */}
        <Link to="/check-bmi">
          <button className="nav-button">Check BMI</button>
        </Link>
        {/* Link to the page for inputting weight */}
        <Link to="/input-weight">
          <button className="nav-button">Input Weight</button>
        </Link>
        {/* Link to the workout plan creation page */}
        <Link to="/create-workout">
          <button className="nav-button">Create Workout Plan</button>
        </Link>
      </div>

      {/* Logout button, which triggers handleLogout when clicked */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

// Export the UserHeader component for use in other parts of the application
export default UserHeader;

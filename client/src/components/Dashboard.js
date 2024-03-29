import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from './UserHeader'; // Header for logged-in users
import './Dashboard.css'; // Add a CSS file for styling
import StartingWeightWidget from './StartingWeightWidget';
import MacronutrientGoalsWidget from './MacronutrientGoalsWidget';
import DailyCheckInWidget from './DailyCheckInWidget';
import './StartingWeightWidget.css';
import './MacronutrientGoalsWidget.css';
import './DailyCheckInWidget.css';

const Dashboard = () => {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('username'); // Clear username
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className='dashboard'>
    <UserHeader handleLogout={handleLogout} />

      <div className="dashboard-content">
        <h1>Welcome, {username || 'User'}!</h1>

        <div className="widgets-grid">
          <StartingWeightWidget />
          <MacronutrientGoalsWidget />
          <DailyCheckInWidget />
          {/* More widgets can be added here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

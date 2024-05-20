import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserDetails from './UserDetails';
import MacroWidget from './MacroWidget'; 
import WeightInputWidget from './WeightInputWidget'; 
import WeightGraph from './WeightGraph'; 
import WeightProgress from './WeightProgress';

import './Dashboard.css';

const Dashboard = () => {
  const username = localStorage.getItem('username');
  console.log('Username:', username);
  const gender = localStorage.getItem('gender');

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  const goToUserDetails = () => {
    navigate('/user-details');
  }

  const goToWeightProgress = () => {
  console.log("Navigating to Weight Progress");
  navigate('/weight-progress');
}

  return (
    <div className='dashboard'>
      <div className="dashboard-grid">
        <aside className="dashboard-sidebar">


          {/* Sidebar Navigation */}
          <nav className="sidebar-nav">
            <ul>
              <li>Welcome {username || 'Guest'}</li> 
              <li>Exercise</li>
              <li>Question</li>
              <li onClick={goToUserDetails}>User Details</li>
              <li onClick={goToWeightProgress}>Weight Progress</li>

              <li onClick={handleLogout}>Signout</li>
            </ul>
          </nav>
        </aside>


        <main className="dashboard-main-content">
          {/* Main Content Widgets */}
          {/* Replace these with actual components */}
          <div className="widget steps-overview">WeightGraph</div>
          <div className="widget nutrition">Weekly Workout</div>
          {/* ...other widgets */}
        </main>

         <aside className="dashboard-summary">
          {/* User Summary */}
          <div className="widget-row">
            <div className="widget"><MacroWidget /></div>
            <div className="widget">Check-in</div>
            <div className="widget"> <WeightInputWidget /></div>
            </div>
          {/* ...other summary details */}
        </aside>



      
      </div>
    </div>
  );
};

export default Dashboard;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from './UserHeader';
import './Dashboard.css';

const Dashboard = () => {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className='dashboard'>
      <UserHeader handleLogout={handleLogout} />
      <div className="dashboard-grid">
        <aside className="dashboard-sidebar">
          {/* Sidebar Navigation */}
          <nav className="sidebar-nav">
            <ul>
              <li>Dashboard</li>
              <li>Profile</li>
              <li>Exercise</li>
              <li>Settings</li>
              <li>History</li>
              <li onClick={handleLogout}>Signout</li>
            </ul>
          </nav>
        </aside>

        <main className="dashboard-main-content">
          {/* Main Content Widgets */}
          {/* Replace these with actual components */}
          <div className="widget steps-overview">Steps Overview...</div>
          <div className="widget activity-level">Activity Level...</div>
          <div className="widget nutrition">Nutrition...</div>
          {/* ...other widgets */}
        </main>

        <aside className="dashboard-summary">
          {/* User Summary */}
          <div className="user-greeting">
            <h2>Hello, {username}!</h2>
            <p>Edit health details</p>
          </div>
          <div className="user-stats">
            <div>Weight: 53kg</div>
            <div>Height: 162cm</div>
            <div>Blood Type: O+</div>
            {/* ...other stats */}
          </div>
          {/* ...other summary details */}
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;

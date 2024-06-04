import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SideNav.css';

const SideNav = () => {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const goToQuestionTab = () => {
    navigate('/question');
  };

  const goToUserDetails = () => {
    navigate('/user-details');
  };

  const goToWeightProgress = () => {
    navigate('/weight-progress');
  };

  const goToExercise = () => {
      navigate('/exercise')
  };

  return (
    <aside className="sidenav">
      <nav className="sidebar-nav">
        <ul>
          <li onClick={goToDashboard}>Welcome {username ? (username[0].toUpperCase() + username.substring(1)) : 'Guest'}</li>
          <li onClick={goToExercise}>Exercise</li>
          <li onClick={goToQuestionTab}>Question</li>
          <li onClick={goToUserDetails}>User Details</li>
          <li onClick={goToWeightProgress}>Weight Progress</li>
          <li onClick={handleLogout}>Signout</li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideNav;

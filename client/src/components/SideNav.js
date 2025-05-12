import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Activity, 
  BarChart2, 
  Dumbbell, 
  User, 
  Settings, 
  LogOut, 
  ChevronRight, 
  ChevronLeft 
} from 'lucide-react';
import './SideNav.css';

const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');

  useEffect(() => {
    const path = location.pathname;
    if (path === '/' || path === '/home') setActivePage('home');
    if (path === '/dashboard') setActivePage('dashboard');
    if (path === '/weight-progress') setActivePage('weight');
    if (path === '/exercise') setActivePage('workouts');
    if (path === '/settings') setActivePage('settings');
  }, [location]);

  const handleNavigate = (route) => {
    switch(route) {
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'weight':
        navigate('/weight-progress');
        break;
      case 'workouts':
        navigate('/exercise');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'logout':
        // Handle logout logic here
        localStorage.removeItem('username');
        navigate('/login');
        break;
      default:
        navigate('/dashboard');
    }
  };

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`sidenav ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidenav-toggle" onClick={toggleSidebar}>
        {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </div>
      
      <div className="sidenav-content">
        <div className="sidenav-top">
          <div className="sidenav-logo">
            <div className="logo-icon">F</div>
            {expanded && <span className="logo-text">FitTrack</span>}
          </div>
          
          <nav className="sidenav-menu">
           
            
            <div 
              className={`sidenav-item ${activePage === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleNavigate('dashboard')}
            >
              <Activity size={20} />
              {expanded && <span>Dashboard</span>}
            </div>
            
            <div 
              className={`sidenav-item ${activePage === 'weight' ? 'active' : ''}`}
              onClick={() => handleNavigate('weight')}
            >
              <BarChart2 size={20} />
              {expanded && <span>Weight</span>}
            </div>
            
            <div 
              className={`sidenav-item ${activePage === 'workouts' ? 'active' : ''}`}
              onClick={() => handleNavigate('workouts')}
            >
              <Dumbbell size={20} />
              {expanded && <span>Workouts</span>}
            </div>
            
            
            
            <div 
              className={`sidenav-item ${activePage === 'settings' ? 'active' : ''}`}
              onClick={() => handleNavigate('settings')}
            >
              <Settings size={20} />
              {expanded && <span>Settings</span>}
            </div>
          </nav>
        </div>
        
        <div 
          className="sidenav-item logout"
          onClick={() => handleNavigate('logout')}
        >
          <LogOut size={20} />
          {expanded && <span>Logout</span>}
        </div>
      </div>
    </div>
  );
};

export default SideNav;
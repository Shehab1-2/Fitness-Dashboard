// src/components/SettingsPage.jsx
import React, { useState, useEffect } from 'react';
import './SettingsPage.css';

const SettingsPage = () => {
  // User state with dummy data
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    username: 'alexj'
  });
  
  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    twoFactorAuth: false,
    darkMode: true,
    publicProfile: true
  });
  
  // Active tab state
  const [activeTab, setActiveTab] = useState('profile');

  // Form fields state
  const [formFields, setFormFields] = useState({
    name: user.name,
    email: user.email,
    username: user.username,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Update form fields when user changes
  useEffect(() => {
    setFormFields(prev => ({
      ...prev,
      name: user.name,
      email: user.email,
      username: user.username
    }));
  }, [user]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle toggle changes
  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update user object with form values
    setUser(prev => ({
      ...prev,
      name: formFields.name,
      email: formFields.email,
      username: formFields.username
    }));
    
    // Show success message (in real app, would save to backend)
    alert('Settings saved successfully!');
  };

  // Function to render user profile form
  const renderProfileForm = () => (
    <div className="settings-section">
      <h2 className="section-title">
        <span>Profile</span> Information
      </h2>
      
      <div className="avatar-container">
        <div className="avatar">
          {user.name.charAt(0)}
        </div>
        <div className="avatar-actions">
          <button className="upload-btn">Upload New Photo</button>
          <button className="remove-avatar-btn">Remove Photo</button>
        </div>
      </div>
      
      <div className="form-group">
        <label className="form-label" htmlFor="name">Full Name</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          className="form-input" 
          value={formFields.name}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="form-group">
        <label className="form-label" htmlFor="email">Email Address</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          className="form-input" 
          value={formFields.email}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="form-group">
        <label className="form-label" htmlFor="username">Username</label>
        <input 
          type="text" 
          id="username" 
          name="username" 
          className="form-input" 
          value={formFields.username}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
  
  // Function to render security form
  const renderSecurityForm = () => (
    <div className="settings-section">
      <h2 className="section-title">
        <span>Security</span> Settings
      </h2>
      
      <div className="toggle-container">
        <div className="toggle-info">
          <h4>Two-Factor Authentication</h4>
          <p>Add an extra layer of security to your account</p>
        </div>
        <div 
          className={`toggle ${settings.twoFactorAuth ? 'active' : ''}`}
          onClick={() => handleToggle('twoFactorAuth')}
        ></div>
      </div>
      
      <div className="form-group">
        <label className="form-label" htmlFor="currentPassword">Current Password</label>
        <input 
          type="password" 
          id="currentPassword" 
          name="currentPassword" 
          className="form-input" 
          value={formFields.currentPassword}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="form-group">
        <label className="form-label" htmlFor="newPassword">New Password</label>
        <input 
          type="password" 
          id="newPassword" 
          name="newPassword" 
          className="form-input" 
          value={formFields.newPassword}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="form-group">
        <label className="form-label" htmlFor="confirmPassword">Confirm New Password</label>
        <input 
          type="password" 
          id="confirmPassword" 
          name="confirmPassword" 
          className="form-input" 
          value={formFields.confirmPassword}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
  
  // Function to render notification form
  const renderNotificationsForm = () => (
    <div className="settings-section">
      <h2 className="section-title">
        <span>Notification</span> Preferences
      </h2>
      
      <div className="toggle-container">
        <div className="toggle-info">
          <h4>Email Notifications</h4>
          <p>Receive important updates and newsletters via email</p>
        </div>
        <div 
          className={`toggle ${settings.emailNotifications ? 'active' : ''}`}
          onClick={() => handleToggle('emailNotifications')}
        ></div>
      </div>
      
      <div className="toggle-container">
        <div className="toggle-info">
          <h4>Push Notifications</h4>
          <p>Get real-time alerts and messages on your device</p>
        </div>
        <div 
          className={`toggle ${settings.pushNotifications ? 'active' : ''}`}
          onClick={() => handleToggle('pushNotifications')}
        ></div>
      </div>
    </div>
  );
  
  // Function to render privacy form
  const renderPrivacyForm = () => (
    <div className="settings-section">
      <h2 className="section-title">
        <span>Privacy</span> Settings
      </h2>
      
      <div className="toggle-container">
        <div className="toggle-info">
          <h4>Public Profile</h4>
          <p>Make your profile visible to other users</p>
        </div>
        <div 
          className={`toggle ${settings.publicProfile ? 'active' : ''}`}
          onClick={() => handleToggle('publicProfile')}
        ></div>
      </div>
      
      <div className="toggle-container">
        <div className="toggle-info">
          <h4>Dark Mode</h4>
          <p>Toggle between light and dark interface</p>
        </div>
        <div 
          className={`toggle ${settings.darkMode ? 'active' : ''}`}
          onClick={() => handleToggle('darkMode')}
        ></div>
      </div>
      
      <div className="danger-zone">
        <h3 className="danger-zone-title">Danger Zone</h3>
        <p>Once deleted, your account cannot be recovered.</p>
        <button className="danger-btn">Delete Account</button>
      </div>
    </div>
  );
  
  // Function to render active form based on tab
  const renderActiveForm = () => {
    switch(activeTab) {
      case 'profile':
        return renderProfileForm();
      case 'security':
        return renderSecurityForm();
      case 'notifications':
        return renderNotificationsForm();
      case 'privacy':
        return renderPrivacyForm();
      default:
        return renderProfileForm();
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="settings-header">
          <div>
            <h1 className="settings-title">Account Settings</h1>
            <p className="settings-subtitle">Manage your account preferences and settings</p>
          </div>
        </div>
        
        <div className="settings-nav">
          <div 
            className={`settings-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </div>
          <div 
            className={`settings-nav-item ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </div>
          <div 
            className={`settings-nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </div>
          <div 
            className={`settings-nav-item ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            Privacy
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Content will change based on active tab */}
          {renderActiveForm()}
          
          <button type="submit" className="save-btn">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
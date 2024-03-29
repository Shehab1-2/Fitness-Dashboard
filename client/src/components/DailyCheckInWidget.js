import React, { useState } from 'react';
import './DailyCheckInWidget.css';

const DailyCheckInWidget = ({ username }) => {
  const [lastCheckInDate, setLastCheckInDate] = useState('2024-01-04');

  const handleCheckIn = () => {
    // Here you would normally update the check-in status in the backend
    // For now, we just update the last check-in date to today's date
    const today = new Date().toISOString().split('T')[0];
    setLastCheckInDate(today);
    alert('Check-in successful!');
  };

  return (
    <div className="daily-check-in-widget">
      <h3>Daily Check-In</h3>
      <p>Last check-in: {lastCheckInDate}</p>
      <button onClick={handleCheckIn}>Check In</button>
    </div>
  );
};

export default DailyCheckInWidget;

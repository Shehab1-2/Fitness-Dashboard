import React from 'react';
import './StartingWeightWidget.css';
import dummyUserData from './DummyData'; // Import the dummy data


const StartingWeightWidget = ({ username }) => {
  // Dummy starting weight
  const startingWeight = '180 lbs';

  return (
    <div className="starting-weight-widget">
      <p>{username}, your starting weight is {startingWeight}</p>
    </div>
  );
};

export default StartingWeightWidget;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDetails from './UserDetails';
import MacroWidget from './MacroWidget'; 
import WeightInputWidget from './WeightInputWidget'; 
import WeightGraph from './WeightGraph';
import WeightProgress from './WeightProgress';
import QuestionTab from './QuestionTab';
import Goal from './Goal';
import SideNav from './SideNav';
import './Dashboard.css';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Dashboard = () => {
  const username = localStorage.getItem('username');
  const [workoutPlan, setWorkoutPlan] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedDay, setExpandedDay] = useState(null);

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5001/users/${username}/workout-plan`);
        if (!response.ok) {
          throw new Error('Failed to fetch workout plan');
        }
        const data = await response.json();
        const parsedWorkoutPlan = parseWorkoutPlan(data.workoutPlan || '');
        setWorkoutPlan(parsedWorkoutPlan);
      } catch (error) {
        console.error('Error fetching workout plan:', error);
        setError('Failed to fetch workout plan.');
      }
      setLoading(false);
    };

    if (username) {
      fetchWorkoutPlan();
    }
  }, [username]);

  const parseWorkoutPlan = (plan) => {
    const planByDay = {};
    let currentDay = null;
    plan.split('\n').forEach(line => {
      if (daysOfWeek.includes(line.trim().replace(':', ''))) {
        currentDay = line.trim().replace(':', '');
        planByDay[currentDay] = [];
      } else if (currentDay && line.trim()) {
        planByDay[currentDay].push(line.trim());
      }
    });
    return planByDay;
  };

  const toggleDay = (day) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  return (
    <div className='dashboard'>
      
      
      <div className="dashboard-container">
        <div className="dashboard-grid">
          {/* Primary Column - Weekly Workout */}
          <div className="primary-column">
            <div className="widget weekly-workout">
              <h3>Weekly Workout</h3>
              {loading ? (
                <div className="loading-container">
                  <p>Loading...</p>
                </div>
              ) : error ? (
                <p className="error-message">{error}</p>
              ) : (
                daysOfWeek.map(day => (
                  <div key={day} className="workout-day">
                    <div className="workout-day-header" onClick={() => toggleDay(day)}>
                      <h4>{day}</h4>
                      <span>{expandedDay === day ? '-' : '+'}</span>
                    </div>
                    {expandedDay === day && (
                      <div className="workout-day-content">
                        {workoutPlan[day] ? (
                          workoutPlan[day].map((exercise, index) => (
                            <p key={index}>{exercise}</p>
                          ))
                        ) : (
                          <p>No workout for {day}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Secondary Column - Grid */}
          <div className="secondary-column">
            {/* Top Row - Goal */}
            <div className="secondary-top widget">
              <Goal />
            </div>
            
            {/* Bottom Row */}
            <div className="secondary-bottom">
              {/* Bottom Left - Macro Widget */}
              <div className="widget bottom-left">
                <MacroWidget />
              </div>
              
              {/* Bottom Right - Weight Input Widget */}
              <div className="widget bottom-right">
                <h4>Check-In</h4>
                <WeightInputWidget />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
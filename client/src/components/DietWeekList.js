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
import { IconBarbell, IconChevronDown, IconChevronUp } from '@tabler/icons-react';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Dashboard = () => {
  const username = localStorage.getItem('username');
  const [workoutPlan, setWorkoutPlan] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedDay, setExpandedDay] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Set fade-in animation after component mounts
    setFadeIn(true);
    
    const fetchWorkoutPlan = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5001/users/:username/workout-plan`);
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

  // Get current day of week
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className='dashboard'>
      <SideNav />
      
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome Back, <span style={{ 
            background: "linear-gradient(to right, var(--gradient-start), var(--gradient-end))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent"
          }}>{username || 'Athlete'}</span></h1>
          <p>Track your progress and crush your fitness goals</p>
        </div>
        
        <div className={`dashboard-grid ${fadeIn ? 'fade-in' : ''}`}>
          {/* Primary Column - Weekly Workout */}
          <div className="primary-column">
            <div className="widget weekly-workout">
              <h3>
                <IconBarbell size={22} style={{ marginRight: '8px', color: 'var(--secondary)' }}/>
                Weekly Workout Plan
              </h3>
              
              {loading ? (
                <div className="loading-container">
                  <p>Loading your workout plan...</p>
                </div>
              ) : error ? (
                <p className="error-message">{error}</p>
              ) : (
                daysOfWeek.map(day => (
                  <div key={day} className="workout-day" style={{
                    borderLeft: day === currentDay ? '3px solid var(--secondary)' : 'none'
                  }}>
                    <div className="workout-day-header" onClick={() => toggleDay(day)}>
                      <h4>{day} {day === currentDay && '(Today)'}</h4>
                      <span>
                        {expandedDay === day ? 
                          <IconChevronUp size={16} /> : 
                          <IconChevronDown size={16} />
                        }
                      </span>
                    </div>
                    {expandedDay === day && (
                      <div className="workout-day-content">
                        {workoutPlan[day] && workoutPlan[day].length > 0 ? (
                          workoutPlan[day].map((exercise, index) => (
                            <p key={index}>{exercise}</p>
                          ))
                        ) : (
                          <p>Rest day or no workout scheduled</p>
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
            <div className="secondary-top">
              <div className="widget">
                <h3>Your Fitness Goals</h3>
                <Goal />
              </div>
            </div>
            
            {/* Bottom Row */}
            <div className="secondary-bottom">
              {/* Bottom Left - Macro Widget */}
              <div className="bottom-left">
                <div className="widget">
                  <h3>Daily Nutrition</h3>
                  <MacroWidget />
                </div>
              </div>
              
              {/* Bottom Right - Weight Input Widget */}
              <div className="bottom-right">
                <div className="widget">
                  <h3>Daily Check-In</h3>
                  <WeightInputWidget />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
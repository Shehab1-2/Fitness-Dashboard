import React, { useState, useEffect } from 'react';
import SideNav from './SideNav';
import Goal from './Goal';
import MacroWidget from './MacroWidget';
import WeightInputWidget from './WeightInputWidget';
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
        const response = await fetch(`http://localhost:5001/api/users/get-workout-plan/${username}`);
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
      <div className="dashboard-grid">
        <SideNav />
        <div className="dashboard-content">
          <main className="dashboard-main-content">
            <div className="widget weekly-workout">
              <h2>Weekly Workout</h2>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                daysOfWeek.map(day => (
                  <div key={day} className={`workout-day ${expandedDay === day ? 'expanded' : ''}`}>
                    <div className="workout-day-header" onClick={() => toggleDay(day)}>
                      <h3>{day}</h3>
                      <span>{expandedDay === day ? '-' : '+'}</span>
                    </div>
                    <div className="workout-day-content">
                      {workoutPlan[day] ? (
                        workoutPlan[day].map((exercise, index) => (
                          <p key={index}>{exercise}</p>
                        ))
                      ) : (
                        <p>No workout for {day}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>
          <div className="dashboard-summary">
            <div className="widget">
              <Goal />
            </div>
            <div className="widget">
              <MacroWidget />
            </div>
            <div className="widget">
              <h2>Check-In</h2>
              <WeightInputWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

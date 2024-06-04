import React from 'react';
import './WeightProgress.css'; // Import the CSS file
import WeightGraph from './WeightGraph';
import SideNav from './SideNav';
import WeightUpdate from './WeightUpdate'; // Import the WeightUpdate component

const WeightProgress = () => {
    const username = localStorage.getItem('username');

    return (
        <div className="weight-progress-dashboard">
            <div className="dashboard-grid">
                <SideNav />
                
                <div className="weight-progress-content">
                    <h2>Weight Progress</h2>
                    <div className="widget-container">
                        <div className="chart-widget">
                            <div className="chart-container">
                                <WeightGraph username={username} />
                            </div>
                        </div>
                        <WeightUpdate username={username} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeightProgress;

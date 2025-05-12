import React from 'react';
import './WeightProgress.css';
import WeightGraph from './WeightGraph';
import WeightUpdate from './WeightUpdate';

const WeightProgress = () => {
    const username = localStorage.getItem('username');

    return (
        <div className="weight-progress-dashboard">
            <div className="dashboard-grid">
                <div className="weight-progress-content">
                    <h2>Weight Progress</h2>
                    <div className="widget-container">
                        <div className="chart-widget">
                            <WeightGraph username={username} />
                        </div>
                        <div className="weight-update-container">
                            <WeightUpdate username={username} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeightProgress;

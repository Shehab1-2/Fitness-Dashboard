import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './WeightGraph.css';

const WeightGraph = ({ username }) => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5001/users/${username}/weights`);
                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message || 'Network response was not ok');
                }
                
                // Sort data by date ascending for the chart
                const sortedData = [...result.weights].sort((a, b) => 
                    new Date(a.date) - new Date(b.date)
                );
                
                const data = sortedData.map(item => ({
                    date: new Date(item.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    }),
                    weight: item.weight
                }));
                
                setChartData(data);
            } catch (error) {
                console.error('Failed to fetch weight data:', error);
                setError(error.message);
            }
            setLoading(false);
        };

        if (username) {
            fetchData();
        }
    }, [username]);

    if (loading) return (
        <div className="loading-container">
            <p>Loading weight data...</p>
        </div>
    );
    
    if (error) return (
        <div className="error-container">
            <p>Error: {error}</p>
        </div>
    );

    if (chartData.length === 0) return (
        <div className="no-data-container">
            <p>No weight data available. Add your first weight record to see your progress!</p>
        </div>
    );

    return (
        <div className="chart-container">
            <ResponsiveContainer width="500%" height={400}>
                <LineChart data={chartData} margin={{ top: 50, right: 50, left: 50, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis 
                        dataKey="date" 
                        stroke="#fff" 
                        tick={{ fill: '#f9fafb' }}
                        tickMargin={10}
                    />
                    <YAxis 
                        stroke="#fff" 
                        tick={{ fill: '#f9fafb' }}
                        tickMargin={10}
                        domain={['dataMin - 5', 'dataMax + 5']}
                    />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: 'rgba(17, 24, 39, 0.9)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
                            color: '#f9fafb'
                        }} 
                        labelStyle={{ color: '#f9fafb', fontWeight: 600, marginBottom: '4px' }}
                        itemStyle={{ color: '#10b981' }}
                    />
                    <Legend 
                        wrapperStyle={{ 
                            paddingTop: '20px',
                            color: '#f9fafb'
                        }}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="weight" 
                        name="Weight (lb)" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        dot={{ r: 6, strokeWidth: 2 }}
                        activeDot={{ r: 8, strokeWidth: 0, fill: '#4f46e5' }} 
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeightGraph;
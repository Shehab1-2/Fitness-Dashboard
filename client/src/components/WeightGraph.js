import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './WeightGraph.css'; // Ensure this is correctly importing the CSS
import dummyUserData from './DummyData'; // Import the dummy data


const WeightGraph = ({ username }) => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5001/api/users/get-weights?username=${username}`);
                let result;

                // Check if the API response is successful
                if (!response.ok) {
                    // Use dummy data if the response is not OK
                    result = dummyUserData;
                } else {
                    // Use actual API response if successful
                    result = await response.json();
                }

                // Map the data to the format needed for the chart
                const data = result.weights.map(item => ({
                    date: new Date(item.date).toLocaleDateString(),
                    weight: item.weight
                }));
                setChartData(data);
            } catch (error) {
                console.error('Failed to fetch weight data:', error);
                setError(error.message);
            }
            setLoading(false);
        };

        fetchData();
    }, [username]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="chart-container">
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: '#fff' }} />
                    <Legend />
                    <Line type="monotone" dataKey="weight" stroke="#82ca9d" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeightGraph;

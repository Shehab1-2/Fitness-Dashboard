import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const WeightGraph = ({ username }) => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5001/api/users/get-weights?username=${username}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data.length > 0) {
                    setChartData({
                        labels: data.map(item => new Date(item.date).toLocaleDateString()),
                        datasets: [{
                            label: 'Weight over time',
                            data: data.map(item => item.weight),
                            fill: false,
                            backgroundColor: 'rgb(75, 192, 192)',
                            borderColor: 'rgba(75, 192, 192, 0.2)',
                        }],
                    });
                } else {
                    setError('No weight data available for this user.');
                }
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

    return chartData && chartData.datasets && chartData.datasets.length > 0 ? (
        <Line data={chartData} options={{ responsive: true }} />
    ) : (
        <p>No weight data to display.</p>
    );
};

export default WeightGraph;
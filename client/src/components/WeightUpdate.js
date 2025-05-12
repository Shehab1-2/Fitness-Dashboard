import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './WeightInputWidget.css'; // Use the existing CSS

const WeightUpdate = ({ username }) => {
    const [weight, setWeight] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [weightHistory, setWeightHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWeightHistory();
    }, []);

    const fetchWeightHistory = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5001/users/${username}/weights`);
            if (response.ok) {
                const data = await response.json();
                if (data.weights) {
                    // Sort weights by date (newest first)
                    const sortedWeights = data.weights.sort((a, b) => 
                        new Date(b.date) - new Date(a.date)
                    );
                    // Show only the last 5 entries
                    setWeightHistory(sortedWeights.slice(0, 5));
                }
            } else {
                console.error('Failed to fetch weight history');
            }
        } catch (error) {
            console.error('Error fetching weight history:', error);
        }
        setLoading(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!username) {
            alert('Username not found. Please log in.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5001/users/${username}/weights`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, weight, date: selectedDate })
            });
            if (response.ok) {
                alert('Weight updated successfully!');
                setWeight(''); // Clear the input
                fetchWeightHistory(); // Refresh the weight history
            } else {
                throw new Error('Failed to update weight');
            }
        } catch (error) {
            console.error('Error updating weight:', error);
            alert('Failed to update weight.');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    return (
        <div className="weight-update-container">
            <h3>Update Your Weight</h3>
            <form onSubmit={handleSubmit} className="weight-update-form">
                <div className="input-group">
                    <label>Weight (lb):</label>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Enter your weight"
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Date:</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        dateFormat="MMMM d, yyyy"
                        className="date-picker"
                        maxDate={new Date()}
                    />
                </div>
                <button type="submit" className="submit-btn">Update Weight</button>
            </form>

            <div className="weight-history">
                <h4>Recent Weight History</h4>
                {loading ? (
                    <p>Loading history...</p>
                ) : weightHistory.length > 0 ? (
                    <ul className="weight-list">
                        {weightHistory.map((entry, index) => (
                            <li key={index} className="weight-item">
                                <span className="weight-date">{formatDate(entry.date)}</span>
                                <span className="weight-value">{entry.weight} lb</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-data">No weight records found</p>
                )}
            </div>
        </div>
    );
};

export default WeightUpdate;
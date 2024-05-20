import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const WeightInputWidget = () => {
    const [weight, setWeight] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleSubmit = async (event) => {
        event.preventDefault();
        const username = localStorage.getItem('username');
        if (!username) {
            alert('Username not found. Please log in.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5001/api/users/update-weight`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, weight, date: selectedDate })
            });
            if (response.ok) {
                alert('Weight updated successfully!');
            } else {
                throw new Error('Failed to update weight');
            }
        } catch (error) {
            console.error('Error updating weight:', error);
            alert('Failed to update weight.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Enter your weight:
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                />
            </label>
            <DatePicker
                selected={selectedDate}
                onChange={date => setSelectedDate(date)}
                dateFormat="MMMM d, yyyy"
                className="date-picker"
            />
            <button type="submit">Update Weight</button>
        </form>
    );
};

export default WeightInputWidget;

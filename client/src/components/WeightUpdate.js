import React, { useState, useEffect } from 'react';
import './WeightUpdate.css'; // Import the CSS file

const WeightUpdate = ({ username }) => {
    const [weights, setWeights] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    const [editForm, setEditForm] = useState({ weight: '', date: '' });

    useEffect(() => {
        const fetchWeights = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/users/get-weights?username=${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch weights');
                }
                const data = await response.json();
                if (data && data.weights) {
                    setWeights(data.weights);
                } else {
                    console.log('No weight data found:', data);
                }
            } catch (error) {
                console.error('Error fetching weights:', error);
            }
        };

        fetchWeights();
    }, [username]);

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditForm({
            weight: weights[index].weight,
            date: new Date(weights[index].date).toISOString().slice(0, 10) // Ensure date format is correct for input[type=date]
        });
    };

    const handleSave = async (index) => {
        const updatedWeight = { ...weights[index], weight: editForm.weight, date: editForm.date };
        try {
            const response = await fetch(`http://localhost:5001/api/users/update-weight`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    weight: updatedWeight.weight,
                    date: updatedWeight.date
                })
            });
            if (!response.ok) {
                throw new Error('Failed to update weight');
            }
            const updatedWeights = [...weights];
            updatedWeights[index] = updatedWeight;
            setWeights(updatedWeights);
            setEditIndex(-1);
        } catch (error) {
            console.error('Error updating weight:', error);
        }
    };

    const handleChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    return (
        <div className="input-widget">
            <ul>
                {weights.map((weight, index) => (
                    <li key={index}>
                        {editIndex === index ? (
                            <div>
                                <input
                                    type="number"
                                    name="weight"
                                    value={editForm.weight}
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="date"
                                    value={editForm.date}
                                    onChange={handleChange}
                                />
                                <button onClick={() => handleSave(index)}>Save</button>
                            </div>
                        ) : (
                            <div>
                                {new Date(weight.date).toLocaleDateString()}: {weight.weight} kg
                                <button onClick={() => handleEdit(index)}>Edit</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WeightUpdate;

import React, { useState, useEffect } from 'react';

const MacroWidget = () => {
    const [macros, setMacros] = useState({ protein: 0, carbs: 0, fats: 0 });
    const [userData, setUserData] = useState(null);
    const username = localStorage.getItem('username');

    useEffect(() => {
        const fetchUserData = async () => {
            if (!username) {
                console.log('No username found');
                return;
            }

            try {
                const response = await fetch(`http://localhost:5001/api/users/user/${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }
                const data = await response.json();
                // Sorting the weights array to get the most recent weight
                if (data.weights && data.weights.length > 0) {
                    data.weights.sort((a, b) => new Date(b.date) - new Date(a.date));
                    data.mostRecentWeight = data.weights[0].weight;
                }
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [username]);

    useEffect(() => {
        if (userData && userData.mostRecentWeight) {
            setMacros(calculateMacros(userData));
        }
    }, [userData]);

    const calculateMacros = (user) => {
        const { mostRecentWeight: weight, fitnessGoals } = user;
        if (!weight || !fitnessGoals) {
            return { protein: 0, carbs: 0, fats: 0 };
        }

        let protein = 0, carbs = 0, fats = 0;
        switch (fitnessGoals) {
            case 'gain muscle':
                protein = weight * 2.2;
                carbs = weight * 4;
                fats = weight * 1;
                break;
            case 'lose weight':
                protein = weight * 1.8;
                carbs = weight * 2;
                fats = weight * 0.8;
                break;
            case 'improve stamina':
                protein = weight * 1.5;
                carbs = weight * 3;
                fats = weight * 0.9;
                break;
            default:
                protein = weight * 1.5;
                carbs = weight * 2;
                fats = weight * 0.75;
                break;
        }

        return { protein: Math.round(protein), carbs: Math.round(carbs), fats: Math.round(fats) };
    }

    if (!userData) {
        return <p>Loading user details...</p>;
    }

    return (
        <div className="widget macro-widget">
            <h2>Macro Goals</h2>
            <p>Protein: {macros.protein}g</p>
            <p>Carbs: {macros.carbs}g</p>
            <p>Fats: {macros.fats}g</p>
        </div>
    );
}

export default MacroWidget;

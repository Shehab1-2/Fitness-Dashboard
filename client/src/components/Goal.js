import React, { useState, useEffect } from 'react';

const Goals = () => {
    const [macros, setMacros] = useState({ protein: 0, carbs: 0, fats: 0 });
    const [calories, setCalories] = useState(0);
    const [weightChange, setWeightChange] = useState('');
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
                    data.startingWeight = data.weights[data.weights.length - 1].weight;
                }
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [username]);

    useEffect(() => {
        if (userData && userData.mostRecentWeight && userData.fitnessGoals && userData.currentActivityLevel) {
            setMacros(calculateMacros(userData));
            setCalories(calculateCalories(userData));
            setWeightChange(calculateWeightChange(userData));
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

    const calculateCalories = (user) => {
        const { mostRecentWeight: weight, currentActivityLevel } = user;
        let bmr = weight * 24; // Basal metabolic rate calculation as a placeholder

        switch (currentActivityLevel) {
            case 'sedentary':
                bmr *= 1.2;
                break;
            case 'active':
                bmr *= 1.5;
                break;
            case 'very active':
                bmr *= 1.75;
                break;
            default:
                bmr *= 1.3;
                break;
        }

        return Math.round(bmr);
    }

    const calculateWeightChange = (user) => {
        const { fitnessGoals } = user;
        let change = '';

        switch (fitnessGoals) {
            case 'gain muscle':
                change = 'You will gain weight by building muscle.';
                break;
            case 'lose weight':
                change = 'You will lose weight.';
                break;
            case 'improve stamina':
                change = 'You will maintain your weight but improve stamina.';
                break;
            default:
                change = 'You will maintain your weight.';
                break;
        }

        return change;
    }

    if (!userData) {
        return <p>Loading user details...</p>;
    }

    return (
        <div className="widget macro-widget">
            <h2>Personal Goal</h2>
            <p>Starting Weight: {userData.startingWeight} kg</p>
            <p>Most Recent Weight: {userData.mostRecentWeight} kg</p>
            <p>Total Calories: {calories} kcal/day</p>
            <p>Weight Change: {weightChange}</p>
        </div>
    );
}

export default Goals;

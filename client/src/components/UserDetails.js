import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDetails.css';
import SideNav from './SideNav'; // Import the SideNav component

const UserDetails = () => {
    const [userData, setUserData] = useState(null);
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            if (!username) {
                console.log('No username found');
                return;
            }

            try {
                const response = await fetch(`http://localhost:5001/users/${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }
                const data = await response.json();
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

    if (!userData) {
        return <p>Loading user details...</p>;
    }

    return (
        <div className="user-details-dashboard">
            <div className="dashboard-grid">
               

                <div className="dashboard-main-content">
                    <div className="widget user-details">
                        <p>Username: {userData.username[0].toUpperCase() + userData.username.substring(1)}</p>
                        <p>Gender: {userData.gender[0].toUpperCase() + userData.gender.substring(1)}</p>
                        <p>Height: {userData.height} ft</p>
                        <p>Weight: {userData.mostRecentWeight || 'No recent weight'} lb</p>
                        <p>Fitness Goal: {userData.fitnessGoals[0].toUpperCase() + userData.fitnessGoals.substring(1)}</p>
                        <p>Current Fitness Level: {userData.currentActivityLevel}</p>
                        <p>Diet: {userData.dietaryPreferences[0].toUpperCase() + userData.dietaryPreferences.substring(1)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;

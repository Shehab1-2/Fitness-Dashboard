import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection


const UserDetails = () => {
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
        <div className="user-details">
            <h2>User Details</h2>
            <p>Username: {userData.username}</p>
            <p>Gender: {userData.gender}</p>
            <p>Height: {userData.height} cm</p>
            <p>Weight: {userData.weight} kg</p>
            <p>Fitness Goal: {userData.fitnessGoals}</p>
            <p>Current Fitness Level: {userData.currentActivityLevel}</p>
            <p>Diet: {userData.dietaryPreferences}</p>
            
            {/* Display more user details here */}
        </div>
    );
};

export default UserDetails;

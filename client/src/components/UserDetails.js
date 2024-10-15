import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDetails.css';
import SideNav from './SideNav'; // Import the SideNav component
import dummyUserData from './DummyData'; // Import the dummy data

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
                const response = await fetch(`http://localhost:5001/api/users/user/${username}`);
                let data;
                
                // Check if the server response is OK
                if (!response.ok) {
                    // Use the imported dummy data if the server request fails
                    data = dummyUserData;
                } else {
                    // Parse the response data if the request was successful
                    data = await response.json();
                }

                // Sort the weights by date and get the most recent weight
                if (data.weights && data.weights.length > 0) {
                    data.weights.sort((a, b) => new Date(b.date) - new Date(a.date));
                    data.mostRecentWeight = data.weights[0].weight;
                }

                // Set the userData state with the fetched or dummy data
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);

                // Use the imported dummy data in case of a network or fetch error
                setUserData(dummyUserData);
            }
        };

        fetchUserData();
    }, [username]);

    if (!userData) {
        return <p>Loading user details...</p>;
    }

    // Helper function for capitalizing strings safely
    const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

    return (
        <div className="user-details-dashboard">
            <div className="dashboard-grid">
                <SideNav /> {/* Include the SideNav component */}

                <div className="dashboard-main-content">
                    <div className="widget user-details">
                        <p>Username: {capitalize(userData.username)}</p>
                        <p>Gender: {capitalize(userData.gender)}</p>
                        <p>Height: {userData.height} ft</p>
                        <p>Weight: {userData.mostRecentWeight || 'No recent weight'} lb</p>
                        <p>Fitness Goal: {capitalize(userData.fitnessGoals)}</p>
                        <p>Current Fitness Level: {capitalize(userData.currentActivityLevel)}</p>
                        <p>Diet: {capitalize(userData.dietaryPreferences)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;

import React, { useState } from 'react';
import UserHeader from './UserHeader';
import { useNavigate } from 'react-router-dom';
import './styles/CheckBMI.css';

const CheckBMI = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const calculateBMI = async() => {
    if (weight && height) {
      const calculatedBMI = (weight / (height / 100) ** 2).toFixed(2);
      setBMI(calculatedBMI);

      if (calculatedBMI < 18.5) setStatus('Underweight');
      else if (calculatedBMI < 25) setStatus('Normal weight');
      else if (calculatedBMI < 30) setStatus('Overweight');
      else setStatus('Obese');

      // Here, call the backend API to save the calculated BMI
      // Example: saveBMI(calculatedBMI);
      await saveBMI(calculatedBMI);

    }
  };

  return (
    <div className='check-bmi'>
      <UserHeader />
      <div className="bmi-form">
        <h2>Check Your BMI</h2>
        <input
          type="number"
          placeholder="Height in cm"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <input
          type="number"
          placeholder="Weight in kg"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <button onClick={calculateBMI}>Calculate BMI</button>
        {bmi && (
          <div className="bmi-result">
            <p>Your BMI: {bmi}</p>
            <p>Status: {status}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const saveBMI = async (bmiValue) => {
  const username = localStorage.getItem('username');
  const response = await fetch('http://localhost:5001//save-bmi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, bmi: bmiValue }),
  });

  const data = await response.json();
  if (response.ok) {
    alert('BMI saved successfully');
  } else {
    alert('Error saving BMI');
  }
}

export default CheckBMI;

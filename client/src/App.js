import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import Login from './components/Login';
import CustomCursor from './components/CustomCursor';
import Dashboard from './components/Dashboard';
import CheckBMI from './components/CheckBMI';
// import FitnessAnimation from './components/FitnessAnimation';
import SurveyForm from './components/FitnessSurvey';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* <CustomCursor /> */}
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/check-bmi" element={<CheckBMI />} />
          {/* <Route path="/fitness-survey" element={<SurveyForm />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

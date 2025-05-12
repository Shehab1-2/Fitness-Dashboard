import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CheckBMI from './components/CheckBMI';
import UserDetails from './components/UserDetails';
import WeightProgress from './components/WeightProgress';
import QuestionTab from './components/QuestionTab';
import WeeklyWorkout from './components/WeeklyWorkout';
import SettingsPage from './components/SettingsPage';
import AppLayout from './components/AppLayout';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />


        {/* Protected routes with sidebar */}
        <Route
          path="/dashboard"
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />
        <Route
          path="/check-bmi"
          element={
            <AppLayout>
              <CheckBMI />
            </AppLayout>
          }
        />
        <Route
          path="/user-details"
          element={
            <AppLayout>
              <UserDetails />
            </AppLayout>
          }
        />
        <Route
          path="/weight-progress"
          element={
            <AppLayout>
              <WeightProgress />
            </AppLayout>
          }
        />
        <Route
          path="/question"
          element={
            <AppLayout>
              <QuestionTab />
            </AppLayout>
          }
        />
        <Route
          path="/exercise"
          element={
            <AppLayout>
              <WeeklyWorkout />
            </AppLayout>
          }
        />
         <Route
          path="/settings"
          element={
            <AppLayout>
              <SettingsPage />
            </AppLayout>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

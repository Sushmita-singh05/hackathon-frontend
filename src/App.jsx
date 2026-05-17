import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingLayout from './layouts/LandingLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DoctorDashboard from './pages/DoctorDashboard';
import UserDashboard from './pages/UserDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingLayout />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
    </Routes>
  );
}

export default App;

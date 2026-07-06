import React, { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingLayout from './layouts/LandingLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DoctorDashboard from './pages/DoctorDashboard';
import UserDashboard from './pages/UserDashboard';
import SplashScreen from './components/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <div
        style={{
          opacity: showSplash ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}
      >
        <Routes>
          <Route path="/" element={<LandingLayout />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

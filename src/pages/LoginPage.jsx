import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail, Phone, Lock, Eye, EyeOff, ArrowLeft, Stethoscope, User,
  Heart, Shield, Bell, Flower2, Activity, Sparkles
} from 'lucide-react';
import Logo from '../components/Logo';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('doctor');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [doctorForm, setDoctorForm] = useState({ email: '', password: '', remember: false });
  const [userForm, setUserForm] = useState({ mobile: '', password: '', remember: false });

  const handleDoctorLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/doctor-dashboard');
    }, 1200);
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/user-dashboard');
    }, 1200);
  };

  const floatingIcons = [
    { icon: Heart, x: '15%', y: '20%', delay: 0, size: 24 },
    { icon: Shield, x: '80%', y: '15%', delay: 0.5, size: 20 },
    { icon: Bell, x: '10%', y: '70%', delay: 1, size: 22 },
    { icon: Flower2, x: '85%', y: '65%', delay: 1.5, size: 26 },
    { icon: Activity, x: '50%', y: '85%', delay: 2, size: 18 },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" id="login-page">
      {/* Left Side — Branding */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-emerald-800 flex-col justify-center items-center p-12"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.1) 0%, transparent 40%)',
          }} />
        </div>

        {/* Floating icons */}
        {floatingIcons.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ delay: 0.8 + item.delay, duration: 0.5 }}
            className="absolute"
            style={{ left: item.x, top: item.y }}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
            >
              <item.icon size={item.size} className="text-white" />
            </motion.div>
          </motion.div>
        ))}

        <div className="relative z-10 text-center max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Logo size={64} className="justify-center mb-8 [&_span]:text-white [&_span]:text-3xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
              Better Healthcare,<br />One Click at a Time
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              Join hundreds of clinics transforming patient care with digital prescriptions, smart reminders, and recovery tracking.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex justify-center gap-8"
          >
            {[
              { value: '500+', label: 'Patients' },
              { value: '98%', label: 'Completion' },
              { value: '50+', label: 'Clinics' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full text-bg" fill="currentColor">
            <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,70 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </motion.div>

      {/* Right Side — Login Form */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-bg relative"
      >
        {/* Back button */}
        <Link
          to="/"
          className="absolute top-6 left-6 flex items-center gap-2 text-sm text-text-light hover:text-primary transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <Logo size={48} className="justify-center" />
          </div>

          {/* Welcome text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-text-light">Sign in to continue to your dashboard</p>
          </motion.div>

          {/* Tab Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex bg-white rounded-2xl p-1.5 shadow-sm border border-primary/10 mb-8"
          >
            {[
              { key: 'doctor', label: 'Doctor Login', icon: Stethoscope },
              { key: 'user', label: 'Patient Login', icon: User },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/25'
                    : 'text-text-light hover:text-primary'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Login Forms */}
          <AnimatePresence mode="wait">
            {activeTab === 'doctor' ? (
              <motion.form
                key="doctor-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleDoctorLogin}
                className="space-y-5"
              >
                {/* Glass card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-primary/10 p-6 shadow-lg shadow-primary/5 space-y-5">
                  {/* Email field */}
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Email or Mobile</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input
                        type="text"
                        placeholder="doctor@clinic.com"
                        value={doctorForm.email}
                        onChange={(e) => setDoctorForm({ ...doctorForm, email: e.target.value })}
                        className="w-full pl-12 pr-4 py-3.5 bg-bg rounded-xl border border-primary/10 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-text-muted/50"
                        id="doctor-email"
                      />
                    </div>
                  </div>

                  {/* Password field */}
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Password</label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={doctorForm.password}
                        onChange={(e) => setDoctorForm({ ...doctorForm, password: e.target.value })}
                        className="w-full pl-12 pr-12 py-3.5 bg-bg rounded-xl border border-primary/10 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-text-muted/50"
                        id="doctor-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Remember + Forgot */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={doctorForm.remember}
                        onChange={(e) => setDoctorForm({ ...doctorForm, remember: e.target.checked })}
                        className="w-4 h-4 rounded border-primary/20 text-primary focus:ring-primary/20 accent-primary"
                      />
                      <span className="text-sm text-text-light">Remember me</span>
                    </label>
                    <button type="button" className="text-sm text-primary hover:text-primary-dark font-medium transition-colors">
                      Forgot password?
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                  id="doctor-login-btn"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Stethoscope size={18} />
                      Login as Doctor
                    </>
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <motion.form
                key="user-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleUserLogin}
                className="space-y-5"
              >
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-primary/10 p-6 shadow-lg shadow-primary/5 space-y-5">
                  {/* Mobile / Aadhaar */}
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Mobile or Aadhaar Number</label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input
                        type="text"
                        placeholder="+91 98765 43210"
                        value={userForm.mobile}
                        onChange={(e) => setUserForm({ ...userForm, mobile: e.target.value })}
                        className="w-full pl-12 pr-4 py-3.5 bg-bg rounded-xl border border-primary/10 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-text-muted/50"
                        id="user-mobile"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Password</label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={userForm.password}
                        onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                        className="w-full pl-12 pr-12 py-3.5 bg-bg rounded-xl border border-primary/10 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-text-muted/50"
                        id="user-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Remember + Forgot */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={userForm.remember}
                        onChange={(e) => setUserForm({ ...userForm, remember: e.target.checked })}
                        className="w-4 h-4 rounded border-primary/20 text-primary focus:ring-primary/20 accent-primary"
                      />
                      <span className="text-sm text-text-light">Remember me</span>
                    </label>
                    <button type="button" className="text-sm text-primary hover:text-primary-dark font-medium transition-colors">
                      Forgot password?
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                  id="user-login-btn"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <User size={18} />
                      Login as Patient
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Register link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-text-light">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary font-semibold hover:text-primary-dark transition-colors">
                Create Account
              </Link>
            </p>
          </motion.div>

          {/* Decorative */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 flex items-center justify-center gap-2 text-xs text-text-muted"
          >
            <Shield size={14} />
            <span>Secured with end-to-end encryption</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

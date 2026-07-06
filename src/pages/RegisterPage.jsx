import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Stethoscope, User, ArrowLeft, Sparkles } from 'lucide-react';
import DoctorRegisterForm from '../components/DoctorRegisterForm';
import UserRegisterForm from '../components/UserRegisterForm';
import Logo from '../components/Logo';

const RegisterPage = () => {
  const [selectedRole, setSelectedRole] = useState(null); // null | 'doctor' | 'user'

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden" id="register-page">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-text-light hover:text-primary transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
        <Logo size={32} />
        <Link
          to="/login"
          className="text-sm text-primary font-medium hover:text-primary-dark transition-colors"
        >
          Sign In
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {!selectedRole ? (
            /* Role Selection */
            <motion.div
              key="role-select"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              {/* Title */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
                >
                  <Sparkles size={16} />
                  Create your account
                </motion.div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                  How would you like to{' '}
                  <span className="gradient-text">get started?</span>
                </h1>
                <p className="text-text-light text-lg max-w-xl mx-auto">
                  Choose your role to begin your healthcare journey with KlinikApp.
                </p>
              </div>

              {/* Role Cards */}
              <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {/* Doctor Card */}
                <motion.button
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedRole('doctor')}
                  className="group relative bg-white rounded-3xl p-8 shadow-lg shadow-primary/5 border border-primary/10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 text-left cursor-pointer"
                  id="register-as-doctor"
                >
                  {/* Glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mb-6 shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform duration-300">
                      <Stethoscope size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      Continue as Doctor
                    </h3>
                    <p className="text-sm text-text-light leading-relaxed">
                      Register your clinic, manage patients, create prescriptions, and track treatment adherence.
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300">
                      Get started →
                    </div>
                  </div>
                </motion.button>

                {/* User Card */}
                <motion.button
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedRole('user')}
                  className="group relative bg-white rounded-3xl p-8 shadow-lg shadow-accent/5 border border-accent/10 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/10 transition-all duration-500 text-left cursor-pointer"
                  id="register-as-user"
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/5 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-orange-400 flex items-center justify-center mb-6 shadow-lg shadow-accent/25 group-hover:scale-110 transition-transform duration-300">
                      <User size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent-dark transition-colors">
                      Continue as Patient
                    </h3>
                    <p className="text-sm text-text-light leading-relaxed">
                      Track your medicines, set reminders, build streaks, and grow your recovery flower.
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-accent-dark opacity-0 group-hover:opacity-100 transition-all duration-300">
                      Get started →
                    </div>
                  </div>
                </motion.button>
              </div>

              {/* Login link */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center mt-10 text-sm text-text-light"
              >
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-semibold hover:text-primary-dark transition-colors">
                  Sign In
                </Link>
              </motion.p>
            </motion.div>
          ) : selectedRole === 'doctor' ? (
            <motion.div
              key="doctor-form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <DoctorRegisterForm onBack={() => setSelectedRole(null)} />
            </motion.div>
          ) : (
            <motion.div
              key="user-form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <UserRegisterForm onBack={() => setSelectedRole(null)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RegisterPage;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User as UserIcon, Phone, Lock, Eye, EyeOff, CreditCard, CheckCircle, Shield, AlertCircle } from 'lucide-react';

const UserRegisterForm = ({ onBack }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const [shakeButton, setShakeButton] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '', mobile: '', aadhaar: '', password: '', confirmPassword: '',
  });

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear the error for this field when the user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    if (field === 'aadhaar' && value.replace(/\s/g, '').length === 12) {
      setTimeout(() => setAadhaarVerified(true), 800);
    } else if (field === 'aadhaar') {
      setAadhaarVerified(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!form.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(form.mobile.trim())) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (!form.aadhaar.trim()) {
      newErrors.aadhaar = 'Aadhaar number is required';
    } else if (form.aadhaar.replace(/\s/g, '').length !== 12) {
      newErrors.aadhaar = 'Aadhaar number must be 12 digits';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setShakeButton(true);
      setTimeout(() => setShakeButton(false), 600);
      return;
    }

    setLoading(true);
    // Store user info in localStorage so the dashboard can use it
    localStorage.setItem('klinikapp_user', JSON.stringify({
      fullName: form.fullName.trim(),
      mobile: form.mobile.trim(),
      aadhaar: form.aadhaar.trim(),
    }));
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate('/user-dashboard'), 2000);
    }, 1500);
  };

  const inputBase = "w-full pl-12 pr-4 py-3.5 bg-bg rounded-xl border text-sm focus:outline-none transition-all placeholder:text-text-muted/50";
  const inputPassBase = "w-full pl-12 pr-12 py-3.5 bg-bg rounded-xl border text-sm focus:outline-none transition-all placeholder:text-text-muted/50";
  const inputNormal = "border-primary/10 focus:border-primary focus:ring-2 focus:ring-primary/10";
  const inputError = "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200";
  const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-text-muted";

  const getInputClass = (field, extra = '') => `${inputBase} ${errors[field] ? inputError : inputNormal} ${extra}`;
  const getPassInputClass = (field) => `${inputPassBase} ${errors[field] ? inputError : inputNormal}`;

  const ErrorMessage = ({ field }) => (
    <AnimatePresence>
      {errors[field] && (
        <motion.p
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5 pl-1"
        >
          <AlertCircle size={12} />
          {errors[field]}
        </motion.p>
      )}
    </AnimatePresence>
  );

  if (success) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-center max-w-md mx-auto">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-primary/10 p-8 sm:p-12 shadow-xl shadow-primary/5">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }} className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }}>
              <CheckCircle size={48} className="text-primary" />
            </motion.div>
          </motion.div>
          <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-2xl font-bold mb-3">Account Created!</motion.h3>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="text-text-light mb-4">Welcome to KlinikApp, {form.fullName.trim()}! Redirecting to your dashboard...</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-text-light hover:text-primary transition-colors mb-6">
        <ArrowLeft size={18} /> Choose role
      </button>

      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Patient Registration</h2>
        <p className="text-text-light">Create your account to start tracking your health</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-primary/10 p-6 sm:p-8 shadow-lg shadow-primary/5 space-y-5">
          <div>
            <label className="block text-sm font-medium text-text mb-2">Full Name <span className="text-red-400">*</span></label>
            <div className="relative">
              <UserIcon size={18} className={iconClass} />
              <input type="text" placeholder="Enter your full name" value={form.fullName} onChange={(e) => updateForm('fullName', e.target.value)} className={getInputClass('fullName')} />
            </div>
            <ErrorMessage field="fullName" />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Mobile Number <span className="text-red-400">*</span></label>
            <div className="relative">
              <Phone size={18} className={iconClass} />
              <input type="tel" placeholder="Enter your mobile number" value={form.mobile} onChange={(e) => updateForm('mobile', e.target.value)} className={getInputClass('mobile')} />
            </div>
            <ErrorMessage field="mobile" />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Aadhaar Number <span className="text-red-400">*</span></label>
            <div className="relative">
              <CreditCard size={18} className={iconClass} />
              <input type="text" placeholder="Enter your 12-digit Aadhaar number" value={form.aadhaar} onChange={(e) => updateForm('aadhaar', e.target.value)} className={getInputClass('aadhaar', aadhaarVerified ? 'border-primary/30 bg-primary/5' : '')} maxLength={14} />
              {aadhaarVerified && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-primary">
                  <CheckCircle size={18} />
                  <span className="text-xs font-medium">Verified</span>
                </motion.div>
              )}
            </div>
            <ErrorMessage field="aadhaar" />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Password <span className="text-red-400">*</span></label>
            <div className="relative">
              <Lock size={18} className={iconClass} />
              <input type={showPassword ? 'text' : 'password'} placeholder="Create a strong password" value={form.password} onChange={(e) => updateForm('password', e.target.value)} className={getPassInputClass('password')} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <ErrorMessage field="password" />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Confirm Password <span className="text-red-400">*</span></label>
            <div className="relative">
              <Lock size={18} className={iconClass} />
              <input type={showConfirm ? 'text' : 'password'} placeholder="Confirm your password" value={form.confirmPassword} onChange={(e) => updateForm('confirmPassword', e.target.value)} className={getPassInputClass('confirmPassword')} />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors">
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <ErrorMessage field="confirmPassword" />
          </div>
        </div>

        {/* Error summary */}
        <AnimatePresence>
          {Object.keys(errors).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm"
            >
              <AlertCircle size={16} className="shrink-0" />
              Please fill in all required fields to continue
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          animate={shakeButton ? { x: [0, -10, 10, -10, 10, -5, 5, 0] } : {}}
          transition={shakeButton ? { duration: 0.5 } : {}}
          type="submit"
          disabled={loading}
          className="mt-4 w-full py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Create Account</>}
        </motion.button>
      </form>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-text-muted">
        <Shield size={14} />
        <span>Your data is protected with end-to-end encryption</span>
      </div>
    </div>
  );
};

export default UserRegisterForm;


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, User as UserIcon, Mail, Phone, Lock,
  Eye, EyeOff, Building2, MapPin, FileText, Upload, CheckCircle,
  Clock, Shield, AlertCircle
} from 'lucide-react';

const steps = [
  { label: 'Basic Info', icon: UserIcon },
  { label: 'Verification', icon: Shield },
  { label: 'Complete', icon: CheckCircle },
];

const DoctorRegisterForm = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [shakeButton, setShakeButton] = useState(false);
  const [form, setForm] = useState({
    fullName: '', email: '', mobile: '', password: '', confirmPassword: '',
    clinicName: '', clinicAddress: '', regNumber: '', certificate: null,
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
  };

  const validateBasicInfo = () => {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!form.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(form.mobile.trim())) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
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

  const validateVerification = () => {
    const newErrors = {};

    if (!form.clinicName.trim()) {
      newErrors.clinicName = 'Clinic name is required';
    }

    if (!form.clinicAddress.trim()) {
      newErrors.clinicAddress = 'Clinic address is required';
    }

    if (!form.regNumber.trim()) {
      newErrors.regNumber = 'Registration number is required';
    }

    if (!form.certificate) {
      newErrors.certificate = 'Please upload your certificate';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 0) {
      if (validateBasicInfo()) {
        setCurrentStep(1);
      } else {
        setShakeButton(true);
        setTimeout(() => setShakeButton(false), 600);
      }
    } else if (currentStep === 1) {
      if (validateVerification()) {
        setCurrentStep(2);
      } else {
        setShakeButton(true);
        setTimeout(() => setShakeButton(false), 600);
      }
    } else {
      setCurrentStep((s) => Math.min(s + 1, 2));
    }
  };

  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const inputBase = "w-full pl-12 pr-4 py-3.5 bg-bg rounded-xl border text-sm focus:outline-none transition-all placeholder:text-text-muted/50";
  const inputPassBase = "w-full pl-12 pr-12 py-3.5 bg-bg rounded-xl border text-sm focus:outline-none transition-all placeholder:text-text-muted/50";
  const inputNormal = "border-primary/10 focus:border-primary focus:ring-2 focus:ring-primary/10";
  const inputError = "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200";
  const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-text-muted";

  const getInputClass = (field) => `${inputBase} ${errors[field] ? inputError : inputNormal}`;
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

  return (
    <div className="max-w-xl mx-auto">
      <button onClick={currentStep === 0 ? onBack : prevStep} className="flex items-center gap-2 text-sm text-text-light hover:text-primary transition-colors mb-6">
        <ArrowLeft size={18} />
        {currentStep === 0 ? 'Choose role' : 'Previous step'}
      </button>

      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Doctor Registration</h2>
        <p className="text-text-light">Set up your clinic account in a few steps</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <motion.div animate={{ scale: i === currentStep ? 1.1 : 1 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${i < currentStep ? 'bg-primary text-white' : i === currentStep ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-white text-text-muted border border-gray-100'}`}>
              {i < currentStep ? <CheckCircle size={16} /> : <step.icon size={16} />}
              <span className="hidden sm:inline">{step.label}</span>
            </motion.div>
            {i < steps.length - 1 && <div className={`w-8 h-0.5 rounded-full transition-colors ${i < currentStep ? 'bg-primary' : 'bg-gray-200'}`} />}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <motion.div key="step-0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-primary/10 p-6 sm:p-8 shadow-lg shadow-primary/5 space-y-5">
              <div>
                <label className="block text-sm font-medium text-text mb-2">Full Name <span className="text-red-400">*</span></label>
                <div className="relative">
                  <UserIcon size={18} className={iconClass} />
                  <input type="text" placeholder="Dr. Anil Kumar" value={form.fullName} onChange={(e) => updateForm('fullName', e.target.value)} className={getInputClass('fullName')} />
                </div>
                <ErrorMessage field="fullName" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Email <span className="text-red-400">*</span></label>
                <div className="relative">
                  <Mail size={18} className={iconClass} />
                  <input type="email" placeholder="doctor@clinic.com" value={form.email} onChange={(e) => updateForm('email', e.target.value)} className={getInputClass('email')} />
                </div>
                <ErrorMessage field="email" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Mobile Number <span className="text-red-400">*</span></label>
                <div className="relative">
                  <Phone size={18} className={iconClass} />
                  <input type="tel" placeholder="+91 98765 43210" value={form.mobile} onChange={(e) => updateForm('mobile', e.target.value)} className={getInputClass('mobile')} />
                </div>
                <ErrorMessage field="mobile" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Password <span className="text-red-400">*</span></label>
                <div className="relative">
                  <Lock size={18} className={iconClass} />
                  <input type={showPassword ? 'text' : 'password'} placeholder="Create a strong password" value={form.password} onChange={(e) => updateForm('password', e.target.value)} className={getPassInputClass('password')} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                </div>
                <ErrorMessage field="password" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Confirm Password <span className="text-red-400">*</span></label>
                <div className="relative">
                  <Lock size={18} className={iconClass} />
                  <input type={showConfirm ? 'text' : 'password'} placeholder="Confirm your password" value={form.confirmPassword} onChange={(e) => updateForm('confirmPassword', e.target.value)} className={getPassInputClass('confirmPassword')} />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors">{showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                </div>
                <ErrorMessage field="confirmPassword" />
              </div>
            </div>

            {/* Error summary when there are validation errors */}
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
              onClick={handleNextStep}
              className="mt-4 w-full py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Continue <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div key="step-1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-primary/10 p-6 sm:p-8 shadow-lg shadow-primary/5 space-y-5">
              <div>
                <label className="block text-sm font-medium text-text mb-2">Clinic Name <span className="text-red-400">*</span></label>
                <div className="relative">
                  <Building2 size={18} className={iconClass} />
                  <input type="text" placeholder="HealthFirst Clinic" value={form.clinicName} onChange={(e) => updateForm('clinicName', e.target.value)} className={getInputClass('clinicName')} />
                </div>
                <ErrorMessage field="clinicName" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Clinic Address <span className="text-red-400">*</span></label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-4 top-4 text-text-muted" />
                  <textarea placeholder="123, MG Road, Pune" value={form.clinicAddress} onChange={(e) => updateForm('clinicAddress', e.target.value)} rows={3} className={`w-full pl-12 pr-4 py-3.5 bg-bg rounded-xl border text-sm focus:outline-none transition-all placeholder:text-text-muted/50 resize-none ${errors.clinicAddress ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-primary/10 focus:border-primary focus:ring-2 focus:ring-primary/10'}`} />
                </div>
                <ErrorMessage field="clinicAddress" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Registration Number <span className="text-red-400">*</span></label>
                <div className="relative">
                  <FileText size={18} className={iconClass} />
                  <input type="text" placeholder="MCI-XXXX-XXXX" value={form.regNumber} onChange={(e) => updateForm('regNumber', e.target.value)} className={getInputClass('regNumber')} />
                </div>
                <ErrorMessage field="regNumber" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Upload Certificate <span className="text-red-400">*</span></label>
                <label className={`flex flex-col items-center justify-center w-full py-8 bg-bg rounded-xl border-2 border-dashed transition-colors cursor-pointer group ${errors.certificate ? 'border-red-400 hover:border-red-500' : 'border-primary/20 hover:border-primary/40'}`}>
                  <Upload size={28} className="text-text-muted group-hover:text-primary transition-colors mb-2" />
                  <span className="text-sm text-text-muted group-hover:text-primary transition-colors">{form.certificate ? form.certificate.name : 'Click to upload'}</span>
                  <span className="text-xs text-text-muted/50 mt-1">PDF, JPG, PNG (max 5MB)</span>
                  <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => updateForm('certificate', e.target.files?.[0] || null)} />
                </label>
                <ErrorMessage field="certificate" />
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
              onClick={handleNextStep}
              className="mt-4 w-full py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Submit for Verification <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div key="step-2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-center">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-primary/10 p-8 sm:p-12 shadow-xl shadow-primary/5 max-w-md mx-auto">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }} className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }}><CheckCircle size={48} className="text-primary" /></motion.div>
              </motion.div>
              <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-2xl font-bold mb-3">Registration Submitted!</motion.h3>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="text-text-light mb-6 leading-relaxed">Your doctor profile is under verification. We'll notify you once approved.</motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 text-accent-dark text-sm font-semibold mb-8"><Clock size={16} />Verification Pending</motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-bg rounded-2xl p-4 mb-8 text-left">
                <p className="text-xs text-text-muted mb-2 font-medium uppercase tracking-wider">Account Status</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm"><span className="text-text-light">Doctor Account</span><span className="text-primary font-medium flex items-center gap-1"><CheckCircle size={14} /> Created</span></div>
                  <div className="flex items-center justify-between text-sm"><span className="text-text-light">Verification</span><span className="text-accent-dark font-medium flex items-center gap-1"><Clock size={14} /> Pending</span></div>
                </div>
              </motion.div>
              <Link to="/login"><motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl transition-all">Return to Login</motion.button></Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DoctorRegisterForm;

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Bell, CheckCircle, Flame, Pill, Heart, Activity } from 'lucide-react';

const floatingCards = [
  {
    icon: Bell,
    text: 'Reminder Sent',
    color: 'from-primary to-secondary',
    delay: 0,
    position: 'top-8 right-8',
  },
  {
    icon: CheckCircle,
    text: 'Dose Completed',
    color: 'from-emerald-400 to-primary',
    delay: 0.3,
    position: 'top-1/3 -right-4',
  },
  {
    icon: Flame,
    text: '7 Day Streak 🔥',
    color: 'from-accent to-orange-400',
    delay: 0.6,
    position: 'bottom-16 right-12',
  },
];

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 lg:pt-0 overflow-hidden bg-grid"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Built for Small Clinics
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Helping Small Clinics{' '}
              <span className="gradient-text">Improve Treatment</span>{' '}
              Completion
            </h1>

            <p className="text-lg text-text-light leading-relaxed mb-8 max-w-lg">
              Digital records, smart reminders, and patient motivation — all in
              one simple platform.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#cta"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-primary to-primary-dark rounded-full shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300"
              >
                Start Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="#demo"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary bg-white border-2 border-primary/20 rounded-full hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 shadow-lg shadow-primary/5"
              >
                <Play size={18} className="fill-primary" />
                Watch Demo
              </motion.a>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-10 flex items-center gap-6 text-sm text-text-muted"
            >
              <div className="flex items-center gap-2">
                <Heart size={16} className="text-red-400" />
                <span>500+ Patients Helped</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-primary" />
                <span>98% Completion Rate</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Main dashboard card */}
            <div className="relative w-full max-w-lg mx-auto">
              <div className="rounded-3xl bg-white shadow-2xl shadow-primary/10 border border-primary/10 overflow-hidden p-6">
                {/* Dashboard header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-semibold text-text">Patient Dashboard</h3>
                    <p className="text-sm text-text-muted">Today's Overview</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Pill size={18} className="text-white" />
                  </div>
                </div>

                {/* Medicine tracking */}
                <div className="space-y-3 mb-6">
                  {[
                    { name: 'Amoxicillin 500mg', time: '8:00 AM', done: true },
                    { name: 'Ibuprofen 200mg', time: '2:00 PM', done: true },
                    { name: 'Vitamin D3', time: '8:00 PM', done: false },
                  ].map((med, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.15 }}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                        med.done
                          ? 'bg-primary/5 border-primary/20'
                          : 'bg-white border-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            med.done
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          {med.done ? <CheckCircle size={16} /> : <Pill size={16} />}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{med.name}</p>
                          <p className="text-xs text-text-muted">{med.time}</p>
                        </div>
                      </div>
                      {med.done && (
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                          Taken ✓
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Streak and flower */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Flame size={18} className="text-accent" />
                      <span className="text-sm font-semibold">7 Day Streak</span>
                    </div>
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                        <div
                          key={d}
                          className="w-6 h-6 rounded-full bg-accent/80 flex items-center justify-center text-white text-[10px] font-bold"
                        >
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 flex items-center justify-center">
                    {/* Growing flower SVG */}
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <rect x="22" y="24" width="4" height="20" rx="2" fill="#81C784" />
                      <circle cx="24" cy="18" r="6" fill="#4CAF50" opacity="0.8" />
                      <circle cx="18" cy="22" r="5" fill="#81C784" opacity="0.6" />
                      <circle cx="30" cy="22" r="5" fill="#81C784" opacity="0.6" />
                      <circle cx="24" cy="14" r="5" fill="#A5D6A7" opacity="0.7" />
                      <circle cx="24" cy="19" r="3" fill="#FFB74D" />
                      <path d="M14 42 Q18 36 22 42" stroke="#81C784" strokeWidth="2" fill="none" />
                      <path d="M26 42 Q30 36 34 42" stroke="#81C784" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              {floatingCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + card.delay, type: 'spring' }}
                  className={`absolute ${card.position} z-10`}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="glass rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                      <card.icon size={16} className="text-white" />
                    </div>
                    <span className="text-sm font-medium whitespace-nowrap">{card.text}</span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

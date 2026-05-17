import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Pill, TrendingUp, Clock, Award, Flame, CheckCircle,
  Flower2, Calendar, Star, Heart, Sparkles
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { mockMedicines, mockTreatmentHistory, userStats } from '../data/mockData';

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState('medicines');
  const [medicines, setMedicines] = useState(mockMedicines);

  const takenCount = medicines.filter(m => m.taken).length;
  const progress = (takenCount / medicines.length) * 100;
  const flowerStage = Math.min(Math.floor(progress / 25), 4);

  const handleTakeMedicine = (id) => {
    setMedicines(prev => prev.map(m => m.id === id ? { ...m, taken: true } : m));
  };

  const sidebarItems = [
    { icon: Pill, label: "Today's Medicines", active: activeSection === 'medicines', onClick: () => setActiveSection('medicines') },
    { icon: TrendingUp, label: 'Progress', active: activeSection === 'progress', onClick: () => setActiveSection('progress') },
    { icon: Clock, label: 'Treatment History', active: activeSection === 'history', onClick: () => setActiveSection('history') },
    { icon: Award, label: 'Rewards', active: activeSection === 'rewards', onClick: () => setActiveSection('rewards') },
  ];

  // SVG flower that grows based on adherence
  const FlowerGrowth = () => {
    const petalColors = ['#4CAF50', '#81C784', '#A5D6A7', '#66BB6A', '#43A047', '#2E7D32'];
    return (
      <div className="relative w-40 h-48 mx-auto">
        {/* Pot */}
        <svg className="absolute bottom-0 left-1/2 -translate-x-1/2" width="60" height="30" viewBox="0 0 60 30">
          <path d="M5 0 L55 0 L50 28 Q30 32 10 28 Z" fill="#8D6E63" opacity="0.8" />
          <path d="M5 0 L55 0 L53 8 L7 8 Z" fill="#A1887F" opacity="0.6" />
        </svg>
        {/* Stem */}
        <motion.div initial={{ height: 0 }} animate={{ height: flowerStage >= 1 ? '55%' : '0%' }} transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 w-1.5 bg-gradient-to-t from-primary-dark to-secondary rounded-full origin-bottom" />
        {/* Leaves */}
        {flowerStage >= 2 && (
          <>
            <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: -30 }} transition={{ delay: 0.8, type: 'spring' }}
              className="absolute bottom-16 left-1/2 -translate-x-full origin-right">
              <div className="w-8 h-4 bg-secondary rounded-full" />
            </motion.div>
            <motion.div initial={{ scale: 0, rotate: 45 }} animate={{ scale: 1, rotate: 30 }} transition={{ delay: 1, type: 'spring' }}
              className="absolute bottom-24 left-1/2 origin-left">
              <div className="w-8 h-4 bg-primary-light rounded-full" />
            </motion.div>
          </>
        )}
        {/* Petals */}
        {flowerStage >= 3 && petalColors.map((color, i) => (
          <motion.div key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.8 }} transition={{ delay: 1.2 + i * 0.1, type: 'spring' }}
            className="absolute top-6 left-1/2"
            style={{ transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-16px)` }}>
            <div className="w-5 h-8 rounded-full" style={{ backgroundColor: color }} />
          </motion.div>
        ))}
        {/* Center */}
        {flowerStage >= 3 && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.8, type: 'spring' }}
            className="absolute top-6 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-accent shadow-lg" />
        )}
        {/* Sparkle for 100% */}
        {flowerStage >= 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-2 left-1/2 -translate-x-1/2">
            <Sparkles size={20} className="text-accent" />
          </motion.div>
        )}
      </div>
    );
  };

  // Circular progress ring
  const ProgressRing = ({ percentage, size = 100, strokeWidth = 8 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;
    return (
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="none" className="text-primary/10" />
        <motion.circle cx={size / 2} cy={size / 2} r={radius} stroke="url(#progressGrad)" strokeWidth={strokeWidth} fill="none"
          strokeLinecap="round" initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }} style={{ strokeDasharray: circumference }} />
        <defs><linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#4CAF50" /><stop offset="100%" stopColor="#81C784" /></linearGradient></defs>
      </svg>
    );
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} userName="Priya Sharma" userRole="Patient" userAvatar="PS">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Good Morning, Priya! 🌸</h1>
        <p className="text-text-light mt-1">Let's keep your recovery on track today.</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Day Streak', value: userStats.streakDays, icon: Flame, color: 'from-accent to-orange-400', suffix: '🔥' },
          { label: 'Doses Taken', value: userStats.totalDosesTaken, icon: CheckCircle, color: 'from-primary to-secondary', suffix: '' },
          { label: 'Completion', value: `${userStats.completionRate}%`, icon: TrendingUp, color: 'from-blue-500 to-cyan-400', suffix: '' },
          { label: 'Rewards', value: userStats.rewardsEarned, icon: Star, color: 'from-purple-500 to-pink-400', suffix: '⭐' },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-primary/5 hover:shadow-lg transition-all">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-lg`}>
              <stat.icon size={18} className="text-white" />
            </div>
            <p className="text-xl sm:text-2xl font-bold">{stat.value} {stat.suffix}</p>
            <p className="text-xs text-text-muted mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Medicines */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-primary/5">
              <h2 className="font-bold text-lg">Today's Medicines</h2>
              <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
                {takenCount}/{medicines.length} taken
              </span>
            </div>
            <div className="p-4 space-y-3">
              {medicines.map((med, i) => (
                <motion.div key={med.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                    med.taken ? 'bg-primary/5 border-primary/15' : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20'
                  }`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                      med.taken ? 'bg-primary text-white' : 'bg-bg text-text-muted'
                    }`}>
                      {med.taken ? <CheckCircle size={20} /> : <Pill size={20} />}
                    </div>
                    <div>
                      <p className={`font-medium ${med.taken ? 'line-through text-text-muted' : ''}`}>{med.name}</p>
                      <p className="text-xs text-text-muted">{med.period} — {med.time} • {med.description}</p>
                    </div>
                  </div>
                  {med.taken ? (
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full">✓ Taken</span>
                  ) : (
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => handleTakeMedicine(med.id)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-primary to-primary-dark rounded-full shadow-md hover:shadow-lg transition-all">
                      Mark as Taken
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Treatment Timeline */}
          <div className="bg-white rounded-2xl shadow-sm border border-primary/5 mt-6 p-5">
            <h2 className="font-bold text-lg mb-5">Treatment History</h2>
            <div className="space-y-0">
              {mockTreatmentHistory.map((t, i) => (
                <div key={t.id} className="relative pl-8 pb-6 last:pb-0">
                  {/* Timeline line */}
                  {i < mockTreatmentHistory.length - 1 && (
                    <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-primary/10" />
                  )}
                  {/* Dot */}
                  <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center ${
                    t.completed ? 'bg-primary text-white' : 'bg-accent text-white'
                  }`}>
                    {t.completed ? <CheckCircle size={14} /> : <Clock size={14} />}
                  </div>
                  {/* Content */}
                  <div className="bg-bg rounded-xl p-4 border border-primary/5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-sm">{t.condition}</p>
                        <p className="text-xs text-text-muted">{t.doctor} • {t.date}</p>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${t.completed ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent-dark'}`}>
                        {t.adherence}% adherence
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {t.medicines.map((med, j) => (
                        <span key={j} className="text-xs bg-white px-2 py-1 rounded-lg border border-primary/10 text-text-light">{med}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Progress Ring */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-primary/5 text-center">
            <h3 className="font-bold mb-4">Today's Progress</h3>
            <div className="relative inline-flex items-center justify-center">
              <ProgressRing percentage={progress} size={140} strokeWidth={10} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold gradient-text">{Math.round(progress)}%</span>
                <span className="text-xs text-text-muted">completed</span>
              </div>
            </div>
          </div>

          {/* Streak */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-primary/5">
            <div className="flex items-center gap-2 mb-4">
              <Flame size={20} className="text-accent" />
              <h3 className="font-bold">{userStats.streakDays} Day Streak!</h3>
            </div>
            <div className="flex gap-1.5">
              {Array.from({ length: 7 }, (_, i) => (
                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 * i, type: 'spring' }}
                  className={`flex-1 aspect-square rounded-xl flex items-center justify-center text-xs font-bold ${
                    i < userStats.streakDays
                      ? 'bg-gradient-to-br from-accent to-orange-400 text-white shadow-md'
                      : 'bg-gray-100 text-text-muted'
                  }`}>
                  {i + 1}
                </motion.div>
              ))}
            </div>
            <p className="text-xs text-text-muted mt-3 text-center">Keep it up! 3 more days for a badge 🏆</p>
          </div>

          {/* Flower Growth */}
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 shadow-sm border border-primary/10">
            <div className="flex items-center gap-2 mb-4">
              <Flower2 size={20} className="text-primary" />
              <h3 className="font-bold">Your Recovery Flower</h3>
            </div>
            <FlowerGrowth />
            <p className="text-xs text-text-muted mt-4 text-center">
              {progress < 25 ? 'Take your first medicine to start growing!' :
               progress < 50 ? 'Your flower is sprouting! Keep going!' :
               progress < 75 ? 'Looking beautiful! Almost there!' :
               progress < 100 ? 'Nearly in full bloom! 🌸' :
               'Full bloom! You completed all medicines! 🎉'}
            </p>
          </div>

          {/* Rewards */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-primary/5">
            <div className="flex items-center gap-2 mb-4">
              <Award size={20} className="text-purple-500" />
              <h3 className="font-bold">Rewards</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: '3 Day Streak', earned: true, icon: '🔥' },
                { label: '7 Day Streak', earned: true, icon: '💪' },
                { label: 'First Flower', earned: true, icon: '🌱' },
                { label: '100% Weekly', earned: false, icon: '⭐' },
                { label: 'Perfect Month', earned: false, icon: '🏆' },
              ].map((r, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${r.earned ? 'bg-primary/5 border border-primary/10' : 'bg-gray-50 border border-gray-100 opacity-60'}`}>
                  <span className="text-xl">{r.icon}</span>
                  <span className={`text-sm font-medium flex-1 ${r.earned ? '' : 'text-text-muted'}`}>{r.label}</span>
                  {r.earned && <CheckCircle size={16} className="text-primary" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;

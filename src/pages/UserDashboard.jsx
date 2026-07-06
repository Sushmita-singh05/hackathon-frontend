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

  // Read user info from localStorage (set during registration)
  const storedUser = JSON.parse(localStorage.getItem('klinikapp_user') || '{}');
  const userName = storedUser.fullName || 'Patient';
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
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
    return (
      <div className="relative w-52 h-56 mx-auto">
        <svg width="208" height="224" viewBox="0 0 208 224" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            {/* Pot gradients */}
            <linearGradient id="potGrad" x1="60" y1="180" x2="148" y2="224">
              <stop offset="0%" stopColor="#D4845A" />
              <stop offset="50%" stopColor="#C0724A" />
              <stop offset="100%" stopColor="#A85D3A" />
            </linearGradient>
            <linearGradient id="potRimGrad" x1="55" y1="175" x2="153" y2="185">
              <stop offset="0%" stopColor="#E8A07A" />
              <stop offset="100%" stopColor="#D4845A" />
            </linearGradient>
            <linearGradient id="potHighlight" x1="85" y1="190" x2="85" y2="215">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            {/* Stem gradient */}
            <linearGradient id="stemGrad" x1="104" y1="170" x2="104" y2="70">
              <stop offset="0%" stopColor="#2E7D32" />
              <stop offset="40%" stopColor="#43A047" />
              <stop offset="100%" stopColor="#66BB6A" />
            </linearGradient>
            {/* Leaf gradients */}
            <linearGradient id="leafLeft" x1="60" y1="130" x2="95" y2="145">
              <stop offset="0%" stopColor="#81C784" />
              <stop offset="100%" stopColor="#388E3C" />
            </linearGradient>
            <linearGradient id="leafRight" x1="148" y1="110" x2="113" y2="125">
              <stop offset="0%" stopColor="#A5D6A7" />
              <stop offset="100%" stopColor="#43A047" />
            </linearGradient>
            {/* Petal gradients */}
            <radialGradient id="petalPink" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#F8BBD0" />
              <stop offset="60%" stopColor="#F06292" />
              <stop offset="100%" stopColor="#E91E63" />
            </radialGradient>
            <radialGradient id="petalCoral" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFCDD2" />
              <stop offset="60%" stopColor="#EF5350" />
              <stop offset="100%" stopColor="#E53935" />
            </radialGradient>
            <radialGradient id="petalRose" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FCE4EC" />
              <stop offset="60%" stopColor="#EC407A" />
              <stop offset="100%" stopColor="#C2185B" />
            </radialGradient>
            <radialGradient id="petalSoft" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFF9C4" />
              <stop offset="60%" stopColor="#FFB74D" />
              <stop offset="100%" stopColor="#FF9800" />
            </radialGradient>
            <radialGradient id="petalLavender" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#E1BEE7" />
              <stop offset="60%" stopColor="#AB47BC" />
              <stop offset="100%" stopColor="#8E24AA" />
            </radialGradient>
            {/* Center gradient */}
            <radialGradient id="centerGrad" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#FFF9C4" />
              <stop offset="50%" stopColor="#FFD54F" />
              <stop offset="100%" stopColor="#FFB300" />
            </radialGradient>
            {/* Glow filter */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* === Pot === */}
          {/* Pot body */}
          <path d="M65 185 L143 185 L135 218 Q104 225 73 218 Z" fill="url(#potGrad)" />
          {/* Pot rim */}
          <path d="M58 178 L150 178 L148 188 L60 188 Z" rx="3" fill="url(#potRimGrad)" />
          {/* Pot rim top highlight */}
          <path d="M60 178 L148 178 L147 181 L61 181 Z" fill="#EDB892" opacity="0.6" />
          {/* Pot body highlight */}
          <path d="M75 190 L90 190 L88 212 Q80 214 76 212 Z" fill="url(#potHighlight)" />
          {/* Soil */}
          <ellipse cx="104" cy="185" rx="38" ry="5" fill="#5D4037" opacity="0.5" />

          {/* === Stem === */}
          {flowerStage >= 1 && (
            <motion.rect
              x="101" width="6" rx="3"
              initial={{ y: 175, height: 0 }}
              animate={{ y: 72, height: 103 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              fill="url(#stemGrad)"
            />
          )}

          {/* === Leaves === */}
          {flowerStage >= 2 && (
            <>
              {/* Left leaf */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9, type: 'spring', stiffness: 120 }}
                style={{ transformOrigin: '100px 148px' }}
              >
                <path d="M100 148 Q72 135 58 142 Q54 148 62 154 Q78 160 100 148 Z" fill="url(#leafLeft)" />
                {/* Leaf vein */}
                <path d="M98 148 Q80 143 65 147" stroke="#2E7D32" strokeWidth="0.8" fill="none" opacity="0.5" />
              </motion.g>
              {/* Right leaf */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.1, type: 'spring', stiffness: 120 }}
                style={{ transformOrigin: '108px 128px' }}
              >
                <path d="M108 128 Q136 115 150 122 Q154 128 146 134 Q130 140 108 128 Z" fill="url(#leafRight)" />
                {/* Leaf vein */}
                <path d="M110 128 Q130 123 145 127" stroke="#388E3C" strokeWidth="0.8" fill="none" opacity="0.5" />
              </motion.g>
              {/* Small bud leaf */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.3, type: 'spring', stiffness: 120 }}
                style={{ transformOrigin: '100px 160px' }}
              >
                <path d="M100 162 Q85 158 78 163 Q80 168 92 166 Q98 164 100 162 Z" fill="#81C784" opacity="0.7" />
              </motion.g>
            </>
          )}

          {/* === Petals (outer layer) === */}
          {flowerStage >= 3 && (
            <>
              {[
                { d: "M104 72 Q96 42 104 28 Q112 42 104 72", fill: "url(#petalPink)", rotate: 0 },
                { d: "M104 72 Q96 42 104 28 Q112 42 104 72", fill: "url(#petalCoral)", rotate: 60 },
                { d: "M104 72 Q96 42 104 28 Q112 42 104 72", fill: "url(#petalRose)", rotate: 120 },
                { d: "M104 72 Q96 42 104 28 Q112 42 104 72", fill: "url(#petalSoft)", rotate: 180 },
                { d: "M104 72 Q96 42 104 28 Q112 42 104 72", fill: "url(#petalLavender)", rotate: 240 },
                { d: "M104 72 Q96 42 104 28 Q112 42 104 72", fill: "url(#petalPink)", rotate: 300 },
              ].map((petal, i) => (
                <motion.path
                  key={`outer-${i}`}
                  d={petal.d}
                  fill={petal.fill}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.9 }}
                  transition={{ delay: 1.4 + i * 0.08, type: 'spring', stiffness: 150, damping: 12 }}
                  style={{ transformOrigin: '104px 72px', transform: `rotate(${petal.rotate}deg)` }}
                  filter="url(#glow)"
                />
              ))}

              {/* Inner petals (smaller, rotated 30deg offset) */}
              {[
                { fill: "url(#petalRose)", rotate: 30 },
                { fill: "url(#petalSoft)", rotate: 90 },
                { fill: "url(#petalPink)", rotate: 150 },
                { fill: "url(#petalLavender)", rotate: 210 },
                { fill: "url(#petalCoral)", rotate: 270 },
                { fill: "url(#petalRose)", rotate: 330 },
              ].map((petal, i) => (
                <motion.path
                  key={`inner-${i}`}
                  d="M104 72 Q99 52 104 42 Q109 52 104 72"
                  fill={petal.fill}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.85 }}
                  transition={{ delay: 1.8 + i * 0.06, type: 'spring', stiffness: 180, damping: 14 }}
                  style={{ transformOrigin: '104px 72px', transform: `rotate(${petal.rotate}deg)` }}
                />
              ))}

              {/* Center */}
              <motion.circle
                cx="104" cy="72" r="10"
                fill="url(#centerGrad)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.2, type: 'spring', stiffness: 200 }}
                filter="url(#glow)"
                style={{ transformOrigin: '104px 72px' }}
              />
              {/* Center detail dots */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <motion.circle
                  key={`dot-${i}`}
                  cx={104 + 5 * Math.cos((angle * Math.PI) / 180)}
                  cy={72 + 5 * Math.sin((angle * Math.PI) / 180)}
                  r="1.2"
                  fill="#F57F17"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2.4 + i * 0.05, type: 'spring' }}
                  opacity="0.7"
                />
              ))}
            </>
          )}

          {/* === Full bloom sparkle particles === */}
          {flowerStage >= 4 && (
            <>
              {[
                { cx: 75, cy: 45, delay: 0 },
                { cx: 135, cy: 50, delay: 0.4 },
                { cx: 60, cy: 75, delay: 0.8 },
                { cx: 148, cy: 80, delay: 1.2 },
                { cx: 88, cy: 25, delay: 0.6 },
                { cx: 120, cy: 30, delay: 1.0 },
                { cx: 70, cy: 60, delay: 1.4 },
                { cx: 140, cy: 65, delay: 0.2 },
              ].map((spark, i) => (
                <motion.circle
                  key={`spark-${i}`}
                  cx={spark.cx}
                  cy={spark.cy}
                  r="2"
                  fill="#FFD54F"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0.6, 1, 0],
                    scale: [0, 1.2, 0.8, 1.2, 0],
                    y: [0, -8, -4, -8, -12],
                  }}
                  transition={{
                    duration: 3,
                    delay: spark.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  filter="url(#glow)"
                />
              ))}
              {/* Glow halo behind flower */}
              <motion.circle
                cx="104" cy="72" r="45"
                fill="none"
                stroke="#FFD54F"
                strokeWidth="1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.4, 0.15, 0.4, 0], scale: [0.9, 1.1, 1.0, 1.1, 0.9] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: '104px 72px' }}
              />
            </>
          )}
        </svg>

        {/* Stage label */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
            flowerStage >= 4 ? 'bg-gradient-to-r from-pink-500 to-amber-400 text-white shadow-lg shadow-pink-300/40' :
            flowerStage >= 3 ? 'bg-pink-100 text-pink-600' :
            flowerStage >= 2 ? 'bg-green-100 text-green-600' :
            flowerStage >= 1 ? 'bg-emerald-50 text-emerald-500' :
            'bg-gray-100 text-gray-400'
          }`}>
            {flowerStage >= 4 ? '✨ Full Bloom!' :
             flowerStage >= 3 ? '🌸 Blooming' :
             flowerStage >= 2 ? '🌿 Growing' :
             flowerStage >= 1 ? '🌱 Sprouting' :
             '🫘 Seed'}
          </span>
        </div>
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
    <DashboardLayout sidebarItems={sidebarItems} userName={userName} userRole="Patient" userAvatar={userInitials}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Good Morning, {userName.split(' ')[0]}! 🌸</h1>
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
            <div className="relative w-52 h-56 mx-auto flex items-center justify-center overflow-hidden rounded-2xl">
              <motion.img
                src="/images/sunflower.png"
                alt="Recovery Sunflower"
                initial={{ scale: 0.4, opacity: 0, filter: 'grayscale(100%)' }}
                animate={{
                  scale: flowerStage >= 4 ? 1 : flowerStage >= 3 ? 0.85 : flowerStage >= 2 ? 0.65 : flowerStage >= 1 ? 0.5 : 0.4,
                  opacity: flowerStage >= 1 ? 1 : 0.3,
                  filter: flowerStage >= 4 ? 'grayscale(0%) brightness(1.1)' : flowerStage >= 3 ? 'grayscale(10%)' : flowerStage >= 2 ? 'grayscale(40%)' : flowerStage >= 1 ? 'grayscale(70%)' : 'grayscale(100%)',
                }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="w-full h-full object-cover rounded-2xl"
              />
              {flowerStage >= 4 && (
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.3, 0, 0.3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ boxShadow: 'inset 0 0 40px rgba(255, 215, 0, 0.4)' }}
                />
              )}
              {/* Stage label */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm ${
                  flowerStage >= 4 ? 'bg-gradient-to-r from-pink-500 to-amber-400 text-white shadow-lg shadow-pink-300/40' :
                  flowerStage >= 3 ? 'bg-pink-100/90 text-pink-600' :
                  flowerStage >= 2 ? 'bg-green-100/90 text-green-600' :
                  flowerStage >= 1 ? 'bg-emerald-50/90 text-emerald-500' :
                  'bg-gray-100/90 text-gray-400'
                }`}>
                  {flowerStage >= 4 ? '✨ Full Bloom!' :
                   flowerStage >= 3 ? '🌸 Blooming' :
                   flowerStage >= 2 ? '🌿 Growing' :
                   flowerStage >= 1 ? '🌱 Sprouting' :
                   '🫘 Seed'}
                </span>
              </div>
            </div>
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

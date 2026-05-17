import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, ClipboardList, Bell, BarChart3,
  TrendingUp, UserPlus, Clock, CheckCircle, AlertCircle,
  Search, Filter, MoreVertical, ArrowUpRight, Pill
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { mockPatients, mockReminders, doctorStats, mockAdherenceData } from '../data/mockData';

const DoctorDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: activeSection === 'dashboard', onClick: () => setActiveSection('dashboard') },
    { icon: Users, label: 'Patients', active: activeSection === 'patients', onClick: () => setActiveSection('patients') },
    { icon: ClipboardList, label: 'Prescriptions', active: activeSection === 'prescriptions', onClick: () => setActiveSection('prescriptions') },
    { icon: Bell, label: 'Reminders', active: activeSection === 'reminders', onClick: () => setActiveSection('reminders') },
    { icon: BarChart3, label: 'Analytics', active: activeSection === 'analytics', onClick: () => setActiveSection('analytics') },
  ];

  const statCards = [
    { label: 'Total Patients', value: doctorStats.totalPatients, icon: Users, color: 'from-blue-500 to-blue-600', change: '+12 this month' },
    { label: 'Active Prescriptions', value: doctorStats.activePrescriptions, icon: ClipboardList, color: 'from-primary to-primary-dark', change: '+5 this week' },
    { label: 'Reminders Sent', value: doctorStats.remindersSent, icon: Bell, color: 'from-accent to-orange-400', change: '24 today' },
    { label: 'Adherence Rate', value: `${doctorStats.adherenceRate}%`, icon: TrendingUp, color: 'from-purple-500 to-pink-500', change: '+3% vs last month' },
  ];

  const maxVal = Math.max(...mockAdherenceData.map(d => d.value));

  return (
    <DashboardLayout sidebarItems={sidebarItems} userName="Dr. Anil Kumar" userRole="Doctor" userAvatar="AK">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, Dr. Kumar 👋</h1>
          <p className="text-text-light mt-1">Here's what's happening with your patients today.</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold text-sm rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl transition-all">
          <UserPlus size={18} /> Add Patient
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-primary/5 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <stat.icon size={20} className="text-white" />
              </div>
              <ArrowUpRight size={16} className="text-primary" />
            </div>
            <p className="text-2xl font-bold mb-1">{stat.value}</p>
            <p className="text-xs text-text-muted">{stat.label}</p>
            <p className="text-xs text-primary font-medium mt-2">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Patients */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-primary/5">
              <h2 className="font-bold text-lg">Recent Patients</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input type="text" placeholder="Search..." className="pl-9 pr-3 py-2 bg-bg rounded-lg border border-primary/10 text-xs focus:outline-none focus:border-primary w-40" />
                </div>
                <button className="p-2 rounded-lg hover:bg-primary/5 text-text-muted"><Filter size={16} /></button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-left text-xs text-text-muted uppercase tracking-wider border-b border-primary/5">
                  <th className="px-5 py-3">Patient</th><th className="px-5 py-3">Condition</th><th className="px-5 py-3">Last Visit</th><th className="px-5 py-3">Adherence</th><th className="px-5 py-3"></th>
                </tr></thead>
                <tbody>
                  {mockPatients.map((patient, i) => (
                    <motion.tr key={patient.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 * i }}
                      className="border-b border-primary/5 last:border-0 hover:bg-primary/3 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold ${patient.status === 'attention' ? 'bg-gradient-to-br from-accent to-orange-400' : 'bg-gradient-to-br from-primary to-secondary'}`}>
                            {patient.avatar}
                          </div>
                          <div><p className="font-medium">{patient.name}</p><p className="text-xs text-text-muted">{patient.phone}</p></div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-text-light">{patient.condition}</td>
                      <td className="px-5 py-4 text-text-light">{patient.lastVisit}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${patient.adherence >= 80 ? 'bg-primary' : patient.adherence >= 60 ? 'bg-accent' : 'bg-red-400'}`} style={{ width: `${patient.adherence}%` }} />
                          </div>
                          <span className={`text-xs font-semibold ${patient.adherence >= 80 ? 'text-primary' : patient.adherence >= 60 ? 'text-accent-dark' : 'text-red-500'}`}>{patient.adherence}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-4"><button className="p-1.5 rounded-lg hover:bg-primary/5 text-text-muted"><MoreVertical size={16} /></button></td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Adherence Chart */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-primary/5">
            <h3 className="font-bold mb-4">Weekly Adherence</h3>
            <div className="flex items-end justify-between gap-2 h-32">
              {mockAdherenceData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div initial={{ height: 0 }} animate={{ height: `${(d.value / maxVal) * 100}%` }} transition={{ delay: 0.1 * i, duration: 0.5 }}
                    className={`w-full rounded-lg ${d.value >= 85 ? 'bg-gradient-to-t from-primary to-secondary' : 'bg-gradient-to-t from-accent/60 to-accent'}`}
                    style={{ minHeight: 8 }} />
                  <span className="text-[10px] text-text-muted font-medium">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Reminders */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-primary/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Upcoming Reminders</h3>
              <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">{mockReminders.length} today</span>
            </div>
            <div className="space-y-3">
              {mockReminders.slice(0, 4).map((rem, i) => (
                <motion.div key={rem.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-bg border border-primary/5 hover:border-primary/15 transition-all">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${rem.status === 'sent' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent-dark'}`}>
                    {rem.status === 'sent' ? <CheckCircle size={16} /> : <Clock size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{rem.patient}</p>
                    <p className="text-xs text-text-muted">{rem.medicine} • {rem.time}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${rem.status === 'sent' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent-dark'}`}>
                    {rem.status === 'sent' ? 'Sent' : 'Pending'}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, ChevronRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../components/Logo';

const DashboardLayout = ({ children, sidebarItems, userName, userRole, userAvatar }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-primary/10 fixed h-full z-40">
        {/* Logo */}
        <div className="p-6 border-b border-primary/5">
          <Link to="/">
            <Logo size={36} />
          </Link>
        </div>

        {/* User info */}
        <div className="px-6 py-5 border-b border-primary/5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/20">
              {userAvatar}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm text-text truncate">{userName}</p>
              <p className="text-xs text-text-muted capitalize">{userRole}</p>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {sidebarItems.map((item, index) => {
            const isActive = item.active;
            return (
              <motion.button
                key={index}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={item.onClick}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-primary/10 to-secondary/5 text-primary shadow-sm border border-primary/10'
                    : 'text-text-light hover:bg-primary/5 hover:text-primary'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-primary' : ''} />
                <span className="flex-1 text-left">{item.label}</span>
                {isActive && <ChevronRight size={16} className="text-primary/50" />}
              </motion.button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-primary/5">
          <motion.button
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </motion.button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 h-full w-72 bg-white shadow-2xl z-50 lg:hidden flex flex-col"
            >
              {/* Mobile sidebar header */}
              <div className="flex items-center justify-between p-6 border-b border-primary/5">
                <Logo size={32} />
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-xl hover:bg-primary/5 text-text-light"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile user info */}
              <div className="px-6 py-5 border-b border-primary/5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                    {userAvatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{userName}</p>
                    <p className="text-xs text-text-muted capitalize">{userRole}</p>
                  </div>
                </div>
              </div>

              {/* Mobile nav */}
              <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {sidebarItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      item.onClick();
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      item.active
                        ? 'bg-primary/10 text-primary'
                        : 'text-text-light hover:bg-primary/5'
                    }`}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* Mobile logout */}
              <div className="p-4 border-t border-primary/5">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div className="flex-1 lg:ml-72 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-primary/5">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-xl hover:bg-primary/5 text-text-light lg:hidden"
                aria-label="Open sidebar"
              >
                <Menu size={22} />
              </button>
              <div className="lg:hidden">
                <Logo size={28} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-text">{userName}</p>
                <p className="text-xs text-text-muted capitalize">{userRole}</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xs shadow-md">
                {userAvatar}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-4 sm:p-6 lg:p-8"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default DashboardLayout;

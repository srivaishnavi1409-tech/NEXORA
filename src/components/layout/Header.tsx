import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/stores/authStore';
import { Menu, X, Moon, Sun, LogOut, User } from 'react-icons/fa';
import { cn } from '@/utils/cn';

interface HeaderProps {
  onMenuClick?: () => void;
  isDark?: boolean;
  onThemeToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, isDark = false, onThemeToggle }) => {
  const { user } = useAuth();
  const { logout } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-700 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-2xl font-bold text-primary-500">NEXORA</h1>
        </div>

        {/* Center - Search (optional) */}
        <div className="hidden md:flex flex-1 max-w-xs mx-8">
          <input
            type="text"
            placeholder="Search modules..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-surface-light dark:bg-surface-dark focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="hidden sm:block text-sm font-medium">{user?.name}</span>
            </button>

            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-48 bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
              >
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 rounded-t-lg">
                  <User size={16} /> Profile
                </button>
                <button
                  onClick={() => {
                    logout();
                    setShowUserMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 text-red-500 rounded-b-lg"
                >
                  <LogOut size={16} /> Logout
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

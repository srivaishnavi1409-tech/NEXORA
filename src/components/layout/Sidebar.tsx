import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, Brain, Zap } from 'react-icons/fa';
import { cn } from '@/utils/cn';

interface SidebarProps {
  activeSubject?: string;
  onSubjectSelect?: (subject: string) => void;
  className?: string;
}

const subjects = [
  { id: 'dsa', name: 'Data Structures', icon: Brain, color: 'from-blue-500 to-cyan-500' },
  { id: 'java', name: 'Java', icon: Code, color: 'from-orange-500 to-red-500' },
  { id: 'python', name: 'Python', icon: Zap, color: 'from-yellow-500 to-orange-500' },
  { id: 'c', name: 'C Language', icon: BookOpen, color: 'from-purple-500 to-pink-500' },
];

const Sidebar: React.FC<SidebarProps> = ({ activeSubject, onSubjectSelect, className }) => {
  return (
    <aside className={cn('bg-surface-light dark:bg-surface-dark border-r border-gray-200 dark:border-gray-700 p-4', className)}>
      <h2 className="text-lg font-bold mb-6">Subjects</h2>
      <div className="space-y-2">
        {subjects.map((subject) => {
          const Icon = subject.icon;
          const isActive = activeSubject === subject.id;
          return (
            <motion.button
              key={subject.id}
              whileHover={{ x: 4 }}
              onClick={() => onSubjectSelect?.(subject.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                isActive
                  ? `bg-gradient-to-r ${subject.color} text-white font-semibold`
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <Icon size={18} />
              <span className="flex-1 text-left">{subject.name}</span>
              {isActive && <div className="w-2 h-2 rounded-full bg-white"></div>}
            </motion.button>
          );
        })}
      </div>

      {/* Stats Section */}
      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold mb-4 text-gray-600 dark:text-gray-400">STATS</h3>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Total XP</p>
            <p className="text-2xl font-bold text-primary-500">2,450</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Current Streak</p>
            <p className="text-2xl font-bold text-orange-500">7 days 🔥</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

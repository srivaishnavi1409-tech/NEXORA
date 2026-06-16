import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Code, Brain, Zap } from 'react-icons/fa';
import { cn } from '@/utils/cn';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  activeSubject?: string;
  onSubjectSelect?: (subject: string) => void;
}

const subjects = [
  { id: 'dsa', name: 'Data Structures', icon: Brain, color: 'from-blue-500 to-cyan-500' },
  { id: 'java', name: 'Java', icon: Code, color: 'from-orange-500 to-red-500' },
  { id: 'python', name: 'Python', icon: Zap, color: 'from-yellow-500 to-orange-500' },
  { id: 'c', name: 'C Language', icon: BookOpen, color: 'from-purple-500 to-pink-500' },
];

const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  activeSubject,
  onSubjectSelect,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
          />
          <motion.nav
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-full w-64 bg-surface-light dark:bg-surface-dark z-40 p-4"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Subjects</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-2">
              {subjects.map((subject) => {
                const Icon = subject.icon;
                const isActive = activeSubject === subject.id;
                return (
                  <motion.button
                    key={subject.id}
                    whileHover={{ x: 4 }}
                    onClick={() => {
                      onSubjectSelect?.(subject.id);
                      onClose();
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                      isActive
                        ? `bg-gradient-to-r ${subject.color} text-white font-semibold`
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    )}
                  >
                    <Icon size={18} />
                    <span>{subject.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;

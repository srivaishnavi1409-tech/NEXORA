import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface ProgressBarProps {
  progress: number;
  max?: number;
  showLabel?: boolean;
  animated?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  max = 100,
  showLabel = true,
  animated = true,
  color = 'primary',
  size = 'md',
}) => {
  const percentage = Math.min((progress / max) * 100, 100);

  const colors = {
    primary: 'bg-primary-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className="w-full">
      <div className={cn('w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden', sizes[size])}>
        <motion.div
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={cn(colors[color], sizes[size])}
        />
      </div>
      {showLabel && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {Math.round(percentage)}%
        </p>
      )}
    </div>
  );
};

export default ProgressBar;

import React from 'react';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
  className?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, hoverable = false, className, ...props }, ref) => (
    <motion.div
      ref={ref}
      whileHover={hoverable ? { y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' } : {}}
      className={cn(
        'bg-surface-light dark:bg-surface-dark rounded-lg border border-gray-200 dark:border-gray-700 p-4 transition-all',
        hoverable && 'cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
);

Card.displayName = 'Card';
export default Card;

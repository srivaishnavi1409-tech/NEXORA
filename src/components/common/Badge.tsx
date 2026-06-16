import React from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200',
      secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200',
      success: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
      warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200',
      error: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200',
    };

    const sizes = {
      sm: 'px-2 py-1 text-xs font-semibold rounded',
      md: 'px-3 py-1.5 text-sm font-semibold rounded-md',
      lg: 'px-4 py-2 text-base font-semibold rounded-lg',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-block',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
export default Badge;

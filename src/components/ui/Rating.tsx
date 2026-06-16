import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'react-icons/fa';
import { cn } from '@/utils/cn';

interface RatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  count?: number;
}

const Rating: React.FC<RatingProps> = ({
  rating,
  onChange,
  readOnly = false,
  size = 'md',
  count = 5,
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <motion.button
          key={i}
          whileHover={!readOnly ? { scale: 1.2 } : {}}
          whileTap={!readOnly ? { scale: 0.9 } : {}}
          onClick={() => !readOnly && onChange?.(i + 1)}
          disabled={readOnly}
          className={cn(
            'transition-colors',
            !readOnly && 'cursor-pointer',
            readOnly && 'cursor-default'
          )}
        >
          <Star
            className={cn(
              sizes[size],
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'
            )}
          />
        </motion.button>
      ))}
      {count > 0 && <span className="ml-2 text-sm font-semibold">{rating.toFixed(1)}</span>}
    </div>
  );
};

export default Rating;

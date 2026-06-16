import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { ChevronDown } from 'react-icons/fa';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={ref} className="w-full relative">
      {label && <label className="block text-sm font-medium mb-2">{label}</label>}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full px-4 py-2 rounded-lg border transition-colors',
          'bg-surface-light dark:bg-surface-dark',
          'border-gray-300 dark:border-gray-600',
          'flex items-center justify-between',
          'focus:outline-none focus:ring-2 focus:ring-primary-500'
        )}
      >
        <span className={selectedOption ? 'text-foreground' : 'text-gray-500'}>
          {selectedOption?.label || placeholder}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={16} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10"
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full px-4 py-2 text-left transition-colors',
                  'hover:bg-primary-50 dark:hover:bg-primary-900/20',
                  value === option.value && 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                )}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;

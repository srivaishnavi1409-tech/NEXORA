import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { validateEmail, validatePassword } from '@/utils/validation';
import { cn } from '@/utils/cn';
import { Eye, EyeOff } from 'react-icons/fa';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading?: boolean;
  onSignupClick?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
  onSignupClick,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleFormSubmit = async (data: LoginFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      if (error instanceof Error) {
        setError('email', {
          type: 'manual',
          message: error.message,
        });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <input
            {...register('email')}
            type="email"
            placeholder="you@example.com"
            className={cn(
              'w-full px-4 py-2 rounded-lg border transition-colors',
              'bg-surface-light dark:bg-surface-dark',
              'border-gray-300 dark:border-gray-600',
              'focus:outline-none focus:ring-2 focus:ring-primary-500',
              errors.email && 'border-red-500'
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <div className="relative">
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className={cn(
                'w-full px-4 py-2 rounded-lg border transition-colors',
                'bg-surface-light dark:bg-surface-dark',
                'border-gray-300 dark:border-gray-600',
                'focus:outline-none focus:ring-2 focus:ring-primary-500',
                errors.password && 'border-red-500'
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm">Remember me</span>
          </label>
          <a href="#" className="text-sm text-primary-500 hover:text-primary-600">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            'w-full py-2 px-4 rounded-lg font-semibold transition-all',
            'bg-primary-500 text-white hover:bg-primary-600',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            isLoading && 'opacity-50'
          )}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-surface-light dark:bg-surface-dark">Or</span>
          </div>
        </div>

        <button
          type="button"
          className={cn(
            'w-full py-2 px-4 rounded-lg font-semibold transition-all',
            'border border-gray-300 dark:border-gray-600',
            'hover:bg-gray-50 dark:hover:bg-gray-900'
          )}
        >
          <span className="flex items-center justify-center space-x-2">
            <span>Google</span>
          </span>
        </button>

        <p className="text-center text-sm">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSignupClick}
            className="text-primary-500 hover:text-primary-600 font-semibold"
          >
            Sign up
          </button>
        </p>
      </form>
    </motion.div>
  );
};

export default LoginForm;

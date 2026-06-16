import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { validatePassword, validatePasswordMatch } from '@/utils/validation';
import { cn } from '@/utils/cn';
import { Eye, EyeOff, Check, X } from 'react-icons/fa';

const signupSchema = z
  .object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSubmit: (data: SignupFormData) => Promise<void>;
  isLoading?: boolean;
  onLoginClick?: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({
  onSubmit,
  isLoading = false,
  onLoginClick,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong'>('weak');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const password = watch('password');

  React.useEffect(() => {
    if (password) {
      const validation = validatePassword(password);
      setPasswordStrength(validation.strength);
    }
  }, [password]);

  const handleFormSubmit = async (data: SignupFormData) => {
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

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'strong':
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
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
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            {...register('fullName')}
            type="text"
            placeholder="John Doe"
            className={cn(
              'w-full px-4 py-2 rounded-lg border transition-colors',
              'bg-surface-light dark:bg-surface-dark',
              'border-gray-300 dark:border-gray-600',
              'focus:outline-none focus:ring-2 focus:ring-primary-500',
              errors.fullName && 'border-red-500'
            )}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
          )}
        </div>

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
          {password && (
            <div className="mt-2">
              <div className="flex items-center space-x-2 mb-2">
                <div className={cn('h-2 flex-1 rounded-full', getPasswordStrengthColor())}></div>
                <span className="text-xs font-semibold capitalize">{passwordStrength}</span>
              </div>
            </div>
          )}
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Confirm Password</label>
          <div className="relative">
            <input
              {...register('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className={cn(
                'w-full px-4 py-2 rounded-lg border transition-colors',
                'bg-surface-light dark:bg-surface-dark',
                'border-gray-300 dark:border-gray-600',
                'focus:outline-none focus:ring-2 focus:ring-primary-500',
                errors.confirmPassword && 'border-red-500'
              )}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <label className="flex items-start space-x-2">
          <input
            {...register('termsAccepted')}
            type="checkbox"
            className="w-4 h-4 rounded mt-1"
          />
          <span className="text-sm">
            I agree to the{' '}
            <a href="#" className="text-primary-500 hover:text-primary-600">
              Terms and Conditions
            </a>
          </span>
        </label>
        {errors.termsAccepted && (
          <p className="text-red-500 text-sm">{errors.termsAccepted.message}</p>
        )}

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
          {isLoading ? 'Creating account...' : 'Create Account'}
        </button>

        <p className="text-center text-sm">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onLoginClick}
            className="text-primary-500 hover:text-primary-600 font-semibold"
          >
            Sign in
          </button>
        </p>
      </form>
    </motion.div>
  );
};

export default SignupForm;

import React, { useEffect, useState } from 'react';
import { getFromLocalStorage, setToLocalStorage, LOCAL_STORAGE_KEYS } from '@/utils/localStorage';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthGateProps {
  children: React.ReactNode;
}

type AuthMode = 'login' | 'signup';

const AuthGate: React.FC<AuthGateProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  useEffect(() => {
    const currentUser = getFromLocalStorage(LOCAL_STORAGE_KEYS.CURRENT_USER);
    if (currentUser) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = async (data: { email: string; password: string }) => {
    const users = getFromLocalStorage(LOCAL_STORAGE_KEYS.USERS, []);
    const user = users.find(
      (u: any) => u.email === data.email && u.password === data.password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const { password, ...userWithoutPassword } = user;
    setToLocalStorage(LOCAL_STORAGE_KEYS.CURRENT_USER, userWithoutPassword);
    setIsAuthenticated(true);
  };

  const handleSignup = async (data: any) => {
    const users = getFromLocalStorage(LOCAL_STORAGE_KEYS.USERS, []);
    const userExists = users.some((u: any) => u.email === data.email);

    if (userExists) {
      throw new Error('Email already registered');
    }

    const newUser = {
      id: Date.now().toString(),
      name: data.fullName,
      email: data.email,
      password: data.password,
      createdAt: new Date().toISOString(),
      theme: 'dark',
    };

    users.push(newUser);
    setToLocalStorage(LOCAL_STORAGE_KEYS.USERS, users);

    const { password, ...userWithoutPassword } = newUser;
    setToLocalStorage(LOCAL_STORAGE_KEYS.CURRENT_USER, userWithoutPassword);
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-surface-light dark:bg-surface-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-900 to-primary-700 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-2xl p-8 w-full"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">NEXORA</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Master coding through interactive learning
            </p>
          </div>

          <AnimatePresence mode="wait">
            {authMode === 'login' ? (
              <LoginForm
                key="login"
                onSubmit={handleLogin}
                onSignupClick={() => setAuthMode('signup')}
              />
            ) : (
              <SignupForm
                key="signup"
                onSubmit={handleSignup}
                onLoginClick={() => setAuthMode('login')}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGate;

import { getFromLocalStorage, setToLocalStorage, LOCAL_STORAGE_KEYS } from '@/utils/localStorage';
import { useCallback, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  theme: 'light' | 'dark';
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = getFromLocalStorage(LOCAL_STORAGE_KEYS.CURRENT_USER);
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setToLocalStorage(LOCAL_STORAGE_KEYS.CURRENT_USER, null);
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const updateUser = useCallback((updatedUser: User) => {
    setToLocalStorage(LOCAL_STORAGE_KEYS.CURRENT_USER, updatedUser);
    setUser(updatedUser);
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    logout,
    updateUser,
  };
};

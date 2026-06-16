import { create } from 'zustand';
import { getFromLocalStorage, setToLocalStorage, LOCAL_STORAGE_KEYS } from '@/utils/localStorage';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  theme: 'light' | 'dark';
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user: User) => {
    setToLocalStorage(LOCAL_STORAGE_KEYS.CURRENT_USER, user);
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    setToLocalStorage(LOCAL_STORAGE_KEYS.CURRENT_USER, null);
    set({ user: null, isAuthenticated: false });
  },

  initialize: () => {
    const currentUser = getFromLocalStorage(LOCAL_STORAGE_KEYS.CURRENT_USER);
    if (currentUser) {
      set({ user: currentUser, isAuthenticated: true });
    }
  },
}));

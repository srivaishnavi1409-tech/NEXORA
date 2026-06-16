export const LOCAL_STORAGE_KEYS = {
  USERS: 'users',
  CURRENT_USER: 'currentUser',
  THEME: 'theme',
  ACTIVE_SUBJECT: 'activeSubject',
  ACTIVE_MODULE: 'activeModule',
  ACTIVE_VIEW: 'activeView',
  PROGRESS: 'progress',
  XP_TOTAL: 'xpTotal',
  STREAK: 'streak',
  REVIEWS: 'reviews',
};

export const getFromLocalStorage = (key: string, defaultValue?: any) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage:`, error);
    return defaultValue;
  }
};

export const setToLocalStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage:`, error);
  }
};

export const removeFromLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage:`, error);
  }
};

export const clearLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error(`Error clearing localStorage:`, error);
  }
};

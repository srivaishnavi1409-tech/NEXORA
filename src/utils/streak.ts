import { Streak } from '@/types';

export const getToday = (): string => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

export const isConsecutiveDay = (lastDate: string, today: string): boolean => {
  const last = new Date(lastDate);
  const current = new Date(today);
  const diffTime = current.getTime() - last.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
};

export const isSameDay = (date1: string, date2: string): boolean => {
  return date1 === date2;
};

export const updateStreak = (currentStreak: Streak | null): Streak => {
  const today = getToday();

  if (!currentStreak) {
    return { count: 1, lastDate: today };
  }

  if (isSameDay(currentStreak.lastDate, today)) {
    return currentStreak;
  }

  if (isConsecutiveDay(currentStreak.lastDate, today)) {
    return {
      count: currentStreak.count + 1,
      lastDate: today,
    };
  }

  return { count: 1, lastDate: today };
};

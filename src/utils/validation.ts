export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): {
  isValid: boolean;
  strength: 'weak' | 'medium' | 'strong';
  feedback: string[];
} => {
  const feedback: string[] = [];
  let strength: 'weak' | 'medium' | 'strong' = 'weak';

  if (password.length < 8) {
    feedback.push('Password must be at least 8 characters long');
  } else if (password.length >= 12) {
    strength = 'strong';
  } else {
    strength = 'medium';
  }

  if (!/[A-Z]/.test(password)) {
    feedback.push('Include at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    feedback.push('Include at least one lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    feedback.push('Include at least one number');
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    feedback.push('Include at least one special character');
  }

  if (feedback.length === 0 && password.length >= 8) {
    strength = 'strong';
  }

  return {
    isValid: feedback.length === 0,
    strength,
    feedback,
  };
};

export const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const invalidPatterns = [
    /^\./, // starts with dot
    /\.$/, // ends with dot
    /\.\./, // consecutive dots
    /\s/, // contains spaces
    /@\./, // @ followed by dot
    /\.@/, // dot followed by @
    /@@/, // multiple @
  ];

  if (invalidPatterns.some(pattern => pattern.test(email))) {
    return false;
  }

  return emailRegex.test(email);
};

export const validatePassword = (
  password: string,
): { isValid: boolean; message?: string } => {
  if (password.length < 6) {
    return {
      isValid: false,
      message: 'Password must be at least 6 characters long',
    };
  }
  return { isValid: true };
};

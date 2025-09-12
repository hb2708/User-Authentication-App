const translations = {
  login_title: 'Login',
  email_label: 'Email',
  email_placeholder: 'Enter your email',
  password_label: 'Password',
  password_placeholder: 'Enter your password',
  login_button: 'Login',
  no_account: "Don't have an account? Register",
  register_title: 'Register',
  name_label: 'Name',
  confirm_password_label: 'Confirm Password',
  register_button: 'Register',
  login_failed_title: 'Login Failed',
  login_failed_message:
    'The email or password you entered is incorrect. Please check your credentials and try again.',
  registration_failed: 'Registration Failed',
  user_already_exists:
    'An account with this email already exists. Please use a different email or login instead.',
  email_required: 'Email is required',
  email_invalid: 'Please enter a valid email address',
  password_required: 'Password is required',
  password_invalid: 'Password must be at least 6 characters long',
  name_required: 'Name is required',
  name_short: 'Name must be at least 2 characters',
  confirm_password_required: 'Please confirm your password',
  passwords_mismatch: 'Passwords do not match',
  ok: 'OK',
  welcome: 'Welcome',
  good_morning: 'Good morning',
  good_afternoon: 'Good afternoon',
  good_evening: 'Good evening',
  logout: 'Logout',
  have_account: 'Already have an account? Login',
} as const;

export const t = (key: string): string => {
  return translations[key as keyof typeof translations] || key;
};

export const COLORS = {
  primary: '#007AFF',
  secondary: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
  background: '#f5f5f5',
  text: '#333',
  textSecondary: '#666',
  border: '#ddd',
  error: '#FF3B30',
  white: '#FFFFFF',
} as const;

export const SPACING = {
  xs: 5,
  sm: 10,
  md: 15,
  lg: 20,
  xl: 30,
  xxl: 40,
} as const;

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 28,
} as const;

export const BORDER_RADIUS = {
  sm: 5,
  md: 10,
  lg: 15,
} as const;

export const SHADOWS = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  heavy: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
} as const;

export const MIN_TOUCH_TARGET = 44;

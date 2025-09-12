import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {
  COLORS,
  SHADOWS,
  SPACING,
  FONT_SIZES,
  BORDER_RADIUS,
  MIN_TOUCH_TARGET,
} from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
}) => {
  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.textBase,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.8}
    >
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: MIN_TOUCH_TARGET,
    ...SHADOWS.light,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  small: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    minHeight: MIN_TOUCH_TARGET,
  },
  medium: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    minHeight: MIN_TOUCH_TARGET,
  },
  large: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    minHeight: MIN_TOUCH_TARGET,
  },
  disabled: {
    opacity: 0.6,
    backgroundColor: COLORS.border,
  },
  textBase: {
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: COLORS.white,
  },
  secondaryText: {
    color: COLORS.white,
  },
  outlineText: {
    color: COLORS.primary,
  },
  smallText: {
    fontSize: FONT_SIZES.sm,
  },
  mediumText: {
    fontSize: FONT_SIZES.md,
  },
  largeText: {
    fontSize: FONT_SIZES.lg,
  },
  disabledText: {
    color: COLORS.textSecondary,
  },
});

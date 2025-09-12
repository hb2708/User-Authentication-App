import React, { forwardRef } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
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

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  errorStyle?: TextStyle;
  showShadow?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      containerStyle,
      inputStyle,
      errorStyle,
      showShadow = true,
      returnKeyType = 'next',
      blurOnSubmit = false,
      ...props
    },
    ref,
  ) => {
    return (
      <View
        style={[styles.container, showShadow && SHADOWS.light, containerStyle]}
      >
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput
          ref={ref}
          style={[styles.input, error && styles.inputError, inputStyle]}
          placeholderTextColor={COLORS.textSecondary}
          returnKeyType={returnKeyType}
          blurOnSubmit={blurOnSubmit}
          enablesReturnKeyAutomatically={true}
          autoCapitalize="none"
          autoCorrect={false}
          {...props}
        />
        <View style={styles.errorContainer}>
          <Text
            style={[
              styles.errorText,
              !error && styles.errorTextHidden,
              errorStyle,
            ]}
          >
            {error || ' '}
          </Text>
        </View>
      </View>
    );
  },
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    backgroundColor: COLORS.background,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    minHeight: MIN_TOUCH_TARGET,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorContainer: {
    minHeight: FONT_SIZES.sm + SPACING.xs,
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONT_SIZES.sm,
    marginTop: SPACING.xs,
  },
  errorTextHidden: {
    opacity: 0,
  },
});

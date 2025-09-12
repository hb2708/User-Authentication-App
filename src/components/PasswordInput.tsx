import React, { forwardRef, useState, useCallback } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInputProps,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  COLORS,
  SHADOWS,
  SPACING,
  FONT_SIZES,
  BORDER_RADIUS,
  MIN_TOUCH_TARGET,
} from '../constants/theme';

interface PasswordInputProps extends Omit<TextInputProps, 'secureTextEntry'> {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  errorStyle?: TextStyle;
  showShadow?: boolean;
}

export const PasswordInput = forwardRef<TextInput, PasswordInputProps>(
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
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = useCallback(() => {
      setShowPassword(prev => !prev);
    }, []);

    return (
      <View
        style={[styles.container, showShadow && SHADOWS.light, containerStyle]}
      >
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.inputContainer}>
          <TextInput
            ref={ref}
            style={[styles.input, error && styles.inputError, inputStyle]}
            secureTextEntry={!showPassword}
            placeholderTextColor={COLORS.textSecondary}
            returnKeyType={returnKeyType}
            blurOnSubmit={blurOnSubmit}
            enablesReturnKeyAutomatically={true}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            {...props}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            accessibilityLabel={
              showPassword ? 'Hide password' : 'Show password'
            }
            accessibilityRole="button"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.eyeTouch}
          >
            <View style={styles.eyeIcon} pointerEvents="none">
              <MaterialCommunityIcons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={COLORS.textSecondary}
              />
            </View>
          </TouchableOpacity>
        </View>
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

PasswordInput.displayName = 'PasswordInput';

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
  inputContainer: {
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,

    paddingRight: MIN_TOUCH_TARGET + SPACING.md,
    backgroundColor: COLORS.background,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    minHeight: MIN_TOUCH_TARGET,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: MIN_TOUCH_TARGET,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeTouch: {
    position: 'absolute',
    right: SPACING.md,
    top: 0,
    bottom: 0,
    width: MIN_TOUCH_TARGET + SPACING.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONT_SIZES.sm,
    marginTop: SPACING.xs,
  },
  errorContainer: {
    minHeight: FONT_SIZES.sm + SPACING.xs,
  },
  errorTextHidden: {
    opacity: 0,
  },
});

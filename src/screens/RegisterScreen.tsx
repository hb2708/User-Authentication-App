import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { validateEmail, validatePassword } from '../utils/validation';
import { t } from '../i18n/i18n';
import { Input } from '../components/Input';
import { PasswordInput } from '../components/PasswordInput';
import { Button } from '../components/Button';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const { signup } = useAuth();
  const navigation = useNavigation();

  // Input refs for keyboard navigation
  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const validateNameField = (nameValue: string) => {
    if (!nameValue.trim()) {
      setErrors(prev => ({ ...prev, name: t('name_required') }));
      return false;
    }
    if (nameValue.trim().length < 2) {
      setErrors(prev => ({ ...prev, name: t('name_short') }));
      return false;
    }
    setErrors(prev => ({ ...prev, name: undefined }));
    return true;
  };

  const validateEmailField = (emailValue: string) => {
    if (!emailValue.trim()) {
      setErrors(prev => ({ ...prev, email: t('email_required') }));
      return false;
    }
    if (!validateEmail(emailValue)) {
      setErrors(prev => ({ ...prev, email: t('email_invalid') }));
      return false;
    }
    setErrors(prev => ({ ...prev, email: undefined }));
    return true;
  };

  const validatePasswordField = (passwordValue: string) => {
    if (!passwordValue.trim()) {
      setErrors(prev => ({ ...prev, password: t('password_required') }));
      return false;
    }
    const passwordValidation = validatePassword(passwordValue);
    if (!passwordValidation.isValid) {
      setErrors(prev => ({ ...prev, password: t('password_invalid') }));
      return false;
    }
    setErrors(prev => ({ ...prev, password: undefined }));
    return true;
  };

  const validateConfirmPasswordField = (
    confirmPasswordValue: string,
    passwordValue: string,
  ) => {
    if (!confirmPasswordValue.trim()) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: t('confirm_password_required'),
      }));
      return false;
    }
    if (confirmPasswordValue !== passwordValue) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: t('passwords_mismatch'),
      }));
      return false;
    }
    setErrors(prev => ({ ...prev, confirmPassword: undefined }));
    return true;
  };

  const handleNameChange = (text: string) => {
    setName(text);
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: undefined }));
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
    // Re-validate confirm password if it exists
    if (confirmPassword && errors.confirmPassword) {
      validateConfirmPasswordField(confirmPassword, text);
    }
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    if (errors.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: undefined }));
    }
  };

  const handleNameBlur = () => {
    if (name.trim()) {
      validateNameField(name);
    }
  };

  const handleEmailBlur = () => {
    if (email.trim()) {
      validateEmailField(email);
    }
  };

  const handlePasswordBlur = () => {
    if (password.trim()) {
      validatePasswordField(password);
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (confirmPassword.trim()) {
      validateConfirmPasswordField(confirmPassword, password);
    }
  };

  const handleRegister = async () => {
    const isNameValid = validateNameField(name);
    const isEmailValid = validateEmailField(email);
    const isPasswordValid = validatePasswordField(password);
    const isConfirmPasswordValid = validateConfirmPasswordField(
      confirmPassword,
      password,
    );

    if (
      !isNameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid
    ) {
      return;
    }

    const result = await signup(name, email, password);
    if (result.success) {
      navigation.navigate('Home' as never);
    } else {
      const errorMessage =
        result.error === 'user_already_exists'
          ? t('user_already_exists')
          : t('registration_failed');

      Alert.alert(t('registration_failed'), errorMessage, [{ text: t('ok') }]);
    }
  };

  const isFormValid =
    !errors.name &&
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword &&
    name.trim() &&
    email.trim() &&
    password.trim() &&
    confirmPassword.trim();

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>{t('register_title')}</Text>

          <Input
            ref={nameRef}
            label={t('name_label')}
            placeholder={t('name_label')}
            value={name}
            onChangeText={handleNameChange}
            onBlur={handleNameBlur}
            onSubmitEditing={() => emailRef.current?.focus()}
            error={errors.name}
            autoCapitalize="words"
            autoComplete="name"
            returnKeyType="next"
          />

          <Input
            ref={emailRef}
            label={t('email_label')}
            placeholder={t('email_placeholder')}
            value={email}
            onChangeText={handleEmailChange}
            onBlur={handleEmailBlur}
            onSubmitEditing={() => passwordRef.current?.focus()}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            returnKeyType="next"
          />

          <PasswordInput
            ref={passwordRef}
            label={t('password_label')}
            placeholder={t('password_placeholder')}
            value={password}
            onChangeText={handlePasswordChange}
            onBlur={handlePasswordBlur}
            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            error={errors.password}
            autoComplete="new-password"
            returnKeyType="next"
          />

          <PasswordInput
            ref={confirmPasswordRef}
            label={t('confirm_password_label')}
            placeholder={t('confirm_password_label')}
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            onBlur={handleConfirmPasswordBlur}
            onSubmitEditing={handleRegister}
            error={errors.confirmPassword}
            autoComplete="new-password"
            returnKeyType="done"
          />

          <Button
            title={t('register_button')}
            onPress={handleRegister}
            disabled={!isFormValid}
            style={styles.registerButton}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login' as never)}
            >
              <Text style={styles.loginText}>{t('have_account')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    padding: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    marginBottom: SPACING.xl,
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.text,
  },
  registerButton: {
    marginBottom: SPACING.lg,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  loginText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.md,
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;

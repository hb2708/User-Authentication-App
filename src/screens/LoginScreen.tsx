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

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const { login } = useAuth();
  const navigation = useNavigation();

  // Input refs for keyboard navigation
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

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

  const handleLogin = async () => {
    const isEmailValid = validateEmailField(email);
    const isPasswordValid = validatePasswordField(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigation.navigate('Home' as never);
    } else {
      Alert.alert(t('login_failed_title'), t('login_failed_message'), [
        { text: t('ok') },
      ]);
    }
  };

  const isFormValid =
    !errors.email && !errors.password && email.trim() && password.trim();

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>{t('login_title')}</Text>

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
            onSubmitEditing={handleLogin}
            error={errors.password}
            autoComplete="password"
            returnKeyType="done"
          />

          <Button
            title={t('login_button')}
            onPress={handleLogin}
            disabled={!isFormValid}
            style={styles.loginButton}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register' as never)}
            >
              <Text style={styles.registerText}>{t('no_account')}</Text>
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
  loginButton: {
    marginBottom: SPACING.lg,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  registerText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.md,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;

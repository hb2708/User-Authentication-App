import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/Button';
import { t } from '../i18n/i18n';
import { COLORS, SPACING, FONT_SIZES, SHADOWS } from '../constants/theme';

const HomeScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  const handleLogout = useCallback(() => {
    logout();
    navigation.navigate('Login' as never);
  }, [logout, navigation]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('good_morning');
    if (hour < 18) return t('good_afternoon');
    return t('good_evening');
  };

  const getInitials = (name: string | undefined): string => {
    if (!name) return '';
    return name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundAccent} />
      <View style={styles.content}>
        <View style={styles.welcomeCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{getInitials(user?.name)}</Text>
            </View>
          </View>
          <Text style={styles.greeting}>{getGreeting()},</Text>
          <Text style={styles.title}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <Button
          title={t('logout')}
          onPress={handleLogout}
          variant="secondary"
          style={styles.logoutButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    position: 'relative',
  },
  backgroundAccent: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.primary,
    opacity: 0.08,
    zIndex: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  welcomeCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: SPACING.xl,
    ...SHADOWS.medium,
    zIndex: 1,
  },
  avatarContainer: {
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
  },
  greeting: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  email: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  actionButton: {
    minWidth: 120,
    marginHorizontal: SPACING.xs,
  },
  logoutButton: {
    minWidth: 200,
    alignSelf: 'center',
  },
});

export default HomeScreen;

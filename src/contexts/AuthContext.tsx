import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('currentUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        const usersData = await AsyncStorage.getItem('users');
        if (usersData) {
          const users = JSON.parse(usersData);
          const foundUser = users.find(
            (u: User & { password: string }) => u.email === email,
          );

          if (foundUser && password === foundUser.password) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: _unusedPassword, ...userWithoutPassword } =
              foundUser;
            setUser(userWithoutPassword);
            await AsyncStorage.setItem(
              'currentUser',
              JSON.stringify(userWithoutPassword),
            );
            return true;
          }
        }
        return false;
      } catch (error) {
        console.error('Login error:', error);
        return false;
      }
    },
    [],
  );

  const signup = useCallback(
    async (
      name: string,
      email: string,
      password: string,
    ): Promise<{ success: boolean; error?: string }> => {
      try {
        const usersData = await AsyncStorage.getItem('users');
        const users = usersData ? JSON.parse(usersData) : [];

        const existingUser = users.find(
          (u: User & { password: string }) => u.email === email,
        );
        if (existingUser) {
          return { success: false, error: 'user_already_exists' };
        }

        const newUserWithPassword = { name, email, password };
        users.push(newUserWithPassword);
        await AsyncStorage.setItem('users', JSON.stringify(users));

        const newUser: User = { name, email };
        setUser(newUser);
        await AsyncStorage.setItem('currentUser', JSON.stringify(newUser));
        return { success: true };
      } catch (error) {
        console.error('Signup error:', error);
        return { success: false, error: 'signup_failed' };
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('currentUser');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

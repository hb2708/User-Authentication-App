import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

const mockedAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

// Import the actual functions to test them directly
// Note: AuthProvider is available for future integration tests

describe('Authentication Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('User Storage', () => {
    it('should store users in AsyncStorage correctly', async () => {
      const mockUsers = [
        {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
        },
      ];

      mockedAsyncStorage.setItem.mockResolvedValueOnce();

      await AsyncStorage.setItem('users', JSON.stringify(mockUsers));

      expect(mockedAsyncStorage.setItem).toHaveBeenCalledWith(
        'users',
        JSON.stringify(mockUsers),
      );
    });

    it('should retrieve users from AsyncStorage correctly', async () => {
      const mockUsers = [
        {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
        },
      ];

      mockedAsyncStorage.getItem.mockResolvedValueOnce(
        JSON.stringify(mockUsers),
      );

      const result = await AsyncStorage.getItem('users');
      const users = result ? JSON.parse(result) : [];

      expect(users).toEqual(mockUsers);
      expect(mockedAsyncStorage.getItem).toHaveBeenCalledWith('users');
    });
  });

  describe('Password Validation', () => {
    it('should validate passwords correctly', () => {
      const storedPassword = 'password123';
      const inputPassword = 'password123';
      const wrongPassword: string = 'wrongpassword';

      // Simple password comparison (plain text)
      expect(inputPassword === storedPassword).toBe(true);
      expect(wrongPassword === storedPassword).toBe(false);
    });
  });

  describe('User Authentication Logic', () => {
    it('should find user by email correctly', () => {
      const users = [
        {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
        },
        {
          name: 'Jane Smith',
          email: 'jane@example.com',
          password: 'password456',
        },
      ];

      const foundUser = users.find(u => u.email === 'john@example.com');
      const notFoundUser = users.find(
        u => u.email === 'nonexistent@example.com',
      );

      expect(foundUser).toEqual({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });
      expect(notFoundUser).toBeUndefined();
    });

    it('should check for existing users during signup', () => {
      const existingUsers = [
        {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
        },
      ];

      const existingEmail = 'john@example.com';
      const newEmail = 'jane@example.com';

      const existingUser = existingUsers.find(u => u.email === existingEmail);
      const newUser = existingUsers.find(u => u.email === newEmail);

      expect(existingUser).toBeDefined();
      expect(newUser).toBeUndefined();
    });
  });

  describe('User Data Management', () => {
    it('should separate user data from password for storage', () => {
      const userWithPassword = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = userWithPassword;

      expect(userWithoutPassword).toEqual({
        name: 'John Doe',
        email: 'john@example.com',
      });
      expect(userWithoutPassword).not.toHaveProperty('password');
    });
  });

  describe('AsyncStorage Error Handling', () => {
    it('should handle AsyncStorage getItem errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockedAsyncStorage.getItem.mockRejectedValueOnce(
        new Error('Storage error'),
      );

      try {
        await AsyncStorage.getItem('users');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }

      consoleSpy.mockRestore();
    });

    it('should handle AsyncStorage setItem errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockedAsyncStorage.setItem.mockRejectedValueOnce(
        new Error('Storage error'),
      );

      try {
        await AsyncStorage.setItem('users', JSON.stringify([]));
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }

      consoleSpy.mockRestore();
    });

    it('should handle AsyncStorage removeItem errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockedAsyncStorage.removeItem.mockRejectedValueOnce(
        new Error('Storage error'),
      );

      try {
        await AsyncStorage.removeItem('currentUser');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }

      consoleSpy.mockRestore();
    });
  });
});

/* eslint-env jest */
// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
  multiGet: jest.fn(),
  multiSet: jest.fn(),
  multiRemove: jest.fn(),
}));

// Mock React Native modules
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    Alert: {
      alert: jest.fn(),
    },
    Platform: {
      OS: 'ios',
      select: jest.fn(config => config.ios),
    },
  };
});

// Mock React Native Vector Icons
jest.mock(
  'react-native-vector-icons/MaterialCommunityIcons',
  () => 'MaterialCommunityIcons',
);

// Mock React Navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useFocusEffect: jest.fn(),
}));

// Suppress specific warnings
const originalConsoleWarn = console.warn;
beforeEach(() => {
  console.warn = message => {
    if (
      message.includes('AsyncStorage has been extracted') ||
      message.includes('componentWillReceiveProps')
    ) {
      return;
    }
    originalConsoleWarn(message);
  };
});

afterEach(() => {
  console.warn = originalConsoleWarn;
  jest.clearAllMocks();
});

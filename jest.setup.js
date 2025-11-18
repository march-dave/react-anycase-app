// Mock react-native modules
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

// Mock image picker
jest.mock('react-native-image-picker', () => ({
  launchCamera: jest.fn(() =>
    Promise.resolve({
      assets: [{uri: 'file:///mock-image.jpg'}],
    })
  ),
  launchImageLibrary: jest.fn(() =>
    Promise.resolve({
      assets: [{uri: 'file:///mock-image.jpg'}],
    })
  ),
}));

// Mock permissions
jest.mock('react-native-permissions', () => ({
  PERMISSIONS: {
    ANDROID: {
      CAMERA: 'android.permission.CAMERA',
    },
  },
  RESULTS: {
    GRANTED: 'granted',
    DENIED: 'denied',
    BLOCKED: 'blocked',
  },
  check: jest.fn(() => Promise.resolve('granted')),
  request: jest.fn(() => Promise.resolve('granted')),
}));

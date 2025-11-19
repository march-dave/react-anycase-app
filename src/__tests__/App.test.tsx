/**
 * App 컴포넌트 테스트
 */

import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';

// Mock react-navigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    NavigationContainer: ({children}: {children: React.ReactNode}) => (
      <>{children}</>
    ),
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
  };
});

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({children}: {children: React.ReactNode}) => <>{children}</>,
    Screen: ({component: Component, ...props}: any) => <Component {...props} />,
  }),
}));

// Mock HomeScreen for simplicity
jest.mock('../screens/HomeScreen', () => {
  const {Text} = require('react-native');
  return () => <Text>Home Screen</Text>;
});

jest.mock('../screens/CameraScreen', () => {
  const {Text} = require('react-native');
  return () => <Text>Camera Screen</Text>;
});

jest.mock('../screens/ResultScreen', () => {
  const {Text} = require('react-native');
  return () => <Text>Result Screen</Text>;
});

describe('App', () => {
  it('should render without crashing', () => {
    const {toJSON} = render(<App />);
    expect(toJSON()).toBeTruthy();
  });

  it('should render HomeScreen as initial route', () => {
    const {getByText} = render(<App />);
    expect(getByText('Home Screen')).toBeTruthy();
  });
});

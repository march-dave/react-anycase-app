/**
 * HomeScreen 컴포넌트 테스트
 */

import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';

// Navigation mock
const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
  goBack: jest.fn(),
  reset: jest.fn(),
  setParams: jest.fn(),
  dispatch: jest.fn(),
  isFocused: jest.fn(),
  canGoBack: jest.fn(),
  getParent: jest.fn(),
  getState: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  setOptions: jest.fn(),
  getId: jest.fn(),
};

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const {getByText} = render(<HomeScreen navigation={mockNavigation as any} />);

    expect(getByText('Calorie Workout')).toBeTruthy();
    expect(
      getByText('Take a photo of your food and find out how long to exercise!'),
    ).toBeTruthy();
  });

  it('should display how it works section', () => {
    const {getByText} = render(<HomeScreen navigation={mockNavigation as any} />);

    expect(getByText('How it works:')).toBeTruthy();
    expect(getByText('Take a photo of your food')).toBeTruthy();
    expect(getByText('We calculate the calories automatically')).toBeTruthy();
    expect(
      getByText('See how long you need to exercise to burn it off'),
    ).toBeTruthy();
  });

  it('should display supported workouts', () => {
    const {getByText} = render(<HomeScreen navigation={mockNavigation as any} />);

    expect(getByText('Supported Workouts:')).toBeTruthy();
    expect(getByText('Running')).toBeTruthy();
    expect(getByText('Walking')).toBeTruthy();
    expect(getByText('Cycling')).toBeTruthy();
    expect(getByText('Swimming')).toBeTruthy();
    expect(getByText('Jump Rope')).toBeTruthy();
  });

  it('should have take photo button', () => {
    const {getByTestId} = render(
      <HomeScreen navigation={mockNavigation as any} />,
    );

    const button = getByTestId('camera-button');
    expect(button).toBeTruthy();
  });

  it('should navigate to Camera screen when button is pressed', () => {
    const {getByTestId} = render(
      <HomeScreen navigation={mockNavigation as any} />,
    );

    const button = getByTestId('camera-button');
    fireEvent.press(button);

    expect(mockNavigate).toHaveBeenCalledWith('Camera');
  });

  it('should display step numbers correctly', () => {
    const {getByText} = render(<HomeScreen navigation={mockNavigation as any} />);

    expect(getByText('1')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
  });
});

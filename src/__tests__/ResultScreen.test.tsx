/**
 * ResultScreen 컴포넌트 테스트
 */

import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ResultScreen from '../screens/ResultScreen';

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

const mockRoute = {
  key: 'Result',
  name: 'Result' as const,
  params: {
    imageUri: 'test-image-uri',
    calories: 300,
    foodName: 'Test Food',
  },
};

describe('ResultScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const {getByText} = render(
      <ResultScreen navigation={mockNavigation as any} route={mockRoute} />,
    );

    expect(getByText('Test Food')).toBeTruthy();
    expect(getByText('300')).toBeTruthy();
    expect(getByText('calories')).toBeTruthy();
  });

  it('should display food image', () => {
    const {getByTestId} = render(
      <ResultScreen navigation={mockNavigation as any} route={mockRoute} />,
    );

    const image = getByTestId('result-image');
    expect(image).toBeTruthy();
  });

  it('should display workout section', () => {
    const {getByText} = render(
      <ResultScreen navigation={mockNavigation as any} route={mockRoute} />,
    );

    expect(getByText('Time to burn off:')).toBeTruthy();
  });

  it('should display all workout options', () => {
    const {getByText} = render(
      <ResultScreen navigation={mockNavigation as any} route={mockRoute} />,
    );

    // 각 운동 타입이 표시되어야 함
    expect(getByText('Running')).toBeTruthy();
    expect(getByText('Walking')).toBeTruthy();
    expect(getByText('Cycling')).toBeTruthy();
    expect(getByText('Swimming')).toBeTruthy();
    expect(getByText('Jump Rope')).toBeTruthy();
  });

  it('should display workout cards with testIDs', () => {
    const {getByTestId} = render(
      <ResultScreen navigation={mockNavigation as any} route={mockRoute} />,
    );

    // 5개의 운동 카드가 있어야 함
    expect(getByTestId('workout-0')).toBeTruthy();
    expect(getByTestId('workout-1')).toBeTruthy();
    expect(getByTestId('workout-2')).toBeTruthy();
    expect(getByTestId('workout-3')).toBeTruthy();
    expect(getByTestId('workout-4')).toBeTruthy();
  });

  it('should have take another photo button', () => {
    const {getByTestId} = render(
      <ResultScreen navigation={mockNavigation as any} route={mockRoute} />,
    );

    const button = getByTestId('new-photo-button');
    expect(button).toBeTruthy();
  });

  it('should navigate to Home when button is pressed', () => {
    const {getByTestId} = render(
      <ResultScreen navigation={mockNavigation as any} route={mockRoute} />,
    );

    const button = getByTestId('new-photo-button');
    fireEvent.press(button);

    expect(mockNavigate).toHaveBeenCalledWith('Home');
  });

  it('should calculate correct workout times', () => {
    const {getAllByText} = render(
      <ResultScreen navigation={mockNavigation as any} route={mockRoute} />,
    );

    // 'minutes' 텍스트가 각 운동 카드에 표시되어야 함
    const minutesTexts = getAllByText(/\d+ minutes/);
    expect(minutesTexts.length).toBe(5);
  });

  it('should render with different calorie values', () => {
    const customRoute = {
      ...mockRoute,
      params: {
        imageUri: 'test-uri',
        calories: 500,
        foodName: 'Large Meal',
      },
    };

    const {getByText} = render(
      <ResultScreen navigation={mockNavigation as any} route={customRoute} />,
    );

    expect(getByText('Large Meal')).toBeTruthy();
    expect(getByText('500')).toBeTruthy();
  });
});

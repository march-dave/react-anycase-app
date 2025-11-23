/**
 * App 컴포넌트 테스트
 */

import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import App from '../App';
import * as ImagePicker from 'react-native-image-picker';
import * as CalorieCalculator from '../src/utils/CalorieCalculator';

// Mock dependencies
jest.mock('react-native-image-picker');
jest.mock('../src/utils/CalorieCalculator');

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText} = render(<App />);

    expect(getByText('Calorie Workout Tracker')).toBeTruthy();
    expect(
      getByText('Take a photo to calculate calories and workout time'),
    ).toBeTruthy();
  });

  it('shows Take Photo and Choose from Gallery buttons initially', () => {
    const {getByText} = render(<App />);

    expect(getByText('Take Photo')).toBeTruthy();
    expect(getByText('Choose from Gallery')).toBeTruthy();
  });

  it('handles camera launch', () => {
    const {getByText} = render(<App />);
    const takePhotoButton = getByText('Take Photo');

    fireEvent.press(takePhotoButton);

    expect(ImagePicker.launchCamera).toHaveBeenCalled();
  });

  it('handles image picker launch', () => {
    const {getByText} = render(<App />);
    const chooseButton = getByText('Choose from Gallery');

    fireEvent.press(chooseButton);

    expect(ImagePicker.launchImageLibrary).toHaveBeenCalled();
  });

  it('displays analysis result after image selection', async () => {
    const mockUri = 'file://test-image.jpg';
    const mockAnalysisResult = {
      foodName: 'Pizza',
      calories: 285,
      confidence: 0.95,
      workoutTime: {
        running: 29,
        walking: 71,
        cycling: 38,
        swimming: 36,
      },
    };

    // Mock analyzeFood
    (CalorieCalculator.analyzeFood as jest.Mock).mockResolvedValue(
      mockAnalysisResult,
    );

    // Mock launchCamera to simulate successful photo capture
    (ImagePicker.launchCamera as jest.Mock).mockImplementation((options, callback) => {
      callback({
        assets: [{uri: mockUri}],
      });
    });

    const {getByText, queryByText} = render(<App />);
    const takePhotoButton = getByText('Take Photo');

    fireEvent.press(takePhotoButton);

    // Wait for analysis to complete
    await waitFor(() => {
      expect(getByText('Analysis Result')).toBeTruthy();
    });

    expect(getByText('Pizza')).toBeTruthy();
    expect(getByText('285 kcal')).toBeTruthy();
    expect(getByText('Confidence: 95.0%')).toBeTruthy();
    expect(getByText('Running:')).toBeTruthy();
    expect(getByText('29 minutes')).toBeTruthy();
  });

  it('shows analyzing state during analysis', async () => {
    const mockUri = 'file://test-image.jpg';

    // Mock analyzeFood with delay
    (CalorieCalculator.analyzeFood as jest.Mock).mockImplementation(
      () =>
        new Promise(resolve =>
          setTimeout(
            () =>
              resolve({
                foodName: 'Burger',
                calories: 540,
                confidence: 0.9,
                workoutTime: {
                  running: 54,
                  walking: 135,
                  cycling: 72,
                  swimming: 68,
                },
              }),
            100,
          ),
        ),
    );

    (ImagePicker.launchCamera as jest.Mock).mockImplementation((options, callback) => {
      callback({
        assets: [{uri: mockUri}],
      });
    });

    const {getByText, queryByText} = render(<App />);
    const takePhotoButton = getByText('Take Photo');

    fireEvent.press(takePhotoButton);

    // Should show analyzing state
    await waitFor(() => {
      expect(getByText('Analyzing food...')).toBeTruthy();
    });

    // Wait for analysis to complete
    await waitFor(() => {
      expect(queryByText('Analyzing food...')).toBeNull();
      expect(getByText('Burger')).toBeTruthy();
    });
  });

  it('handles reset functionality', async () => {
    const mockUri = 'file://test-image.jpg';
    const mockAnalysisResult = {
      foodName: 'Salad',
      calories: 150,
      confidence: 0.88,
      workoutTime: {
        running: 15,
        walking: 38,
        cycling: 20,
        swimming: 19,
      },
    };

    (CalorieCalculator.analyzeFood as jest.Mock).mockResolvedValue(
      mockAnalysisResult,
    );

    (ImagePicker.launchCamera as jest.Mock).mockImplementation((options, callback) => {
      callback({
        assets: [{uri: mockUri}],
      });
    });

    const {getByText, queryByText} = render(<App />);

    // Take photo
    fireEvent.press(getByText('Take Photo'));

    // Wait for result
    await waitFor(() => {
      expect(getByText('Salad')).toBeTruthy();
    });

    // Reset
    const resetButton = getByText('Take Another Photo');
    fireEvent.press(resetButton);

    // Should show initial buttons again
    expect(getByText('Take Photo')).toBeTruthy();
    expect(getByText('Choose from Gallery')).toBeTruthy();
    expect(queryByText('Salad')).toBeNull();
  });

  it('handles camera cancellation', () => {
    (ImagePicker.launchCamera as jest.Mock).mockImplementation((options, callback) => {
      callback({
        didCancel: true,
      });
    });

    const {getByText, queryByText} = render(<App />);
    const takePhotoButton = getByText('Take Photo');

    fireEvent.press(takePhotoButton);

    // Should still show initial buttons (no image displayed)
    expect(getByText('Take Photo')).toBeTruthy();
    expect(queryByText('Analysis Result')).toBeNull();
  });

  it('displays all workout types in result', async () => {
    const mockUri = 'file://test-image.jpg';
    const mockAnalysisResult = {
      foodName: 'Steak',
      calories: 600,
      confidence: 0.92,
      workoutTime: {
        running: 60,
        walking: 150,
        cycling: 80,
        swimming: 75,
      },
    };

    (CalorieCalculator.analyzeFood as jest.Mock).mockResolvedValue(
      mockAnalysisResult,
    );

    (ImagePicker.launchCamera as jest.Mock).mockImplementation((options, callback) => {
      callback({
        assets: [{uri: mockUri}],
      });
    });

    const {getByText} = render(<App />);

    fireEvent.press(getByText('Take Photo'));

    await waitFor(() => {
      expect(getByText('Running:')).toBeTruthy();
      expect(getByText('Walking:')).toBeTruthy();
      expect(getByText('Cycling:')).toBeTruthy();
      expect(getByText('Swimming:')).toBeTruthy();

      expect(getByText('60 minutes')).toBeTruthy();
      expect(getByText('150 minutes')).toBeTruthy();
      expect(getByText('80 minutes')).toBeTruthy();
      expect(getByText('75 minutes')).toBeTruthy();
    });
  });
});

/**
 * CameraScreen 컴포넌트 테스트
 */

import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import CameraScreen from '../screens/CameraScreen';
import * as ImagePicker from 'react-native-image-picker';

// Mock react-native-image-picker
jest.mock('react-native-image-picker', () => ({
  launchCamera: jest.fn(),
  launchImageLibrary: jest.fn(),
}));

// Mock calorieService
jest.mock('../services/calorieService', () => ({
  analyzeFood: jest.fn().mockResolvedValue({
    foodName: 'Test Food',
    calories: 200,
  }),
}));

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

describe('CameraScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const {getByText} = render(
      <CameraScreen navigation={mockNavigation as any} />,
    );

    expect(getByText('No image selected')).toBeTruthy();
    expect(getByText('Take a photo or select from gallery')).toBeTruthy();
  });

  it('should have take photo button', () => {
    const {getByTestId} = render(
      <CameraScreen navigation={mockNavigation as any} />,
    );

    const button = getByTestId('take-photo-button');
    expect(button).toBeTruthy();
  });

  it('should have gallery button', () => {
    const {getByTestId} = render(
      <CameraScreen navigation={mockNavigation as any} />,
    );

    const button = getByTestId('gallery-button');
    expect(button).toBeTruthy();
  });

  it('should not show analyze button initially', () => {
    const {queryByTestId} = render(
      <CameraScreen navigation={mockNavigation as any} />,
    );

    const analyzeButton = queryByTestId('analyze-button');
    expect(analyzeButton).toBeNull();
  });

  it('should call launchCamera when take photo button is pressed', async () => {
    (ImagePicker.launchCamera as jest.Mock).mockResolvedValue({
      assets: [{uri: 'test-uri'}],
    });

    const {getByTestId} = render(
      <CameraScreen navigation={mockNavigation as any} />,
    );

    const button = getByTestId('take-photo-button');
    fireEvent.press(button);

    await waitFor(() => {
      expect(ImagePicker.launchCamera).toHaveBeenCalledWith({
        mediaType: 'photo',
        quality: 0.8,
        saveToPhotos: true,
      });
    });
  });

  it('should call launchImageLibrary when gallery button is pressed', async () => {
    (ImagePicker.launchImageLibrary as jest.Mock).mockResolvedValue({
      assets: [{uri: 'test-uri'}],
    });

    const {getByTestId} = render(
      <CameraScreen navigation={mockNavigation as any} />,
    );

    const button = getByTestId('gallery-button');
    fireEvent.press(button);

    await waitFor(() => {
      expect(ImagePicker.launchImageLibrary).toHaveBeenCalledWith({
        mediaType: 'photo',
        quality: 0.8,
      });
    });
  });

  it('should show analyze button after image is selected', async () => {
    (ImagePicker.launchCamera as jest.Mock).mockResolvedValue({
      assets: [{uri: 'test-uri'}],
    });

    const {getByTestId, queryByTestId} = render(
      <CameraScreen navigation={mockNavigation as any} />,
    );

    const button = getByTestId('take-photo-button');
    fireEvent.press(button);

    await waitFor(() => {
      expect(queryByTestId('analyze-button')).toBeTruthy();
    });
  });

  it('should show image preview after selection', async () => {
    (ImagePicker.launchCamera as jest.Mock).mockResolvedValue({
      assets: [{uri: 'test-uri'}],
    });

    const {getByTestId, queryByTestId} = render(
      <CameraScreen navigation={mockNavigation as any} />,
    );

    const button = getByTestId('take-photo-button');
    fireEvent.press(button);

    await waitFor(() => {
      expect(queryByTestId('preview-image')).toBeTruthy();
    });
  });

  it('should navigate to Result screen after analysis', async () => {
    (ImagePicker.launchCamera as jest.Mock).mockResolvedValue({
      assets: [{uri: 'test-uri'}],
    });

    const {getByTestId} = render(
      <CameraScreen navigation={mockNavigation as any} />,
    );

    // 사진 촬영
    const cameraButton = getByTestId('take-photo-button');
    fireEvent.press(cameraButton);

    await waitFor(() => {
      expect(getByTestId('analyze-button')).toBeTruthy();
    });

    // 분석 버튼 클릭
    const analyzeButton = getByTestId('analyze-button');
    fireEvent.press(analyzeButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Result', {
        imageUri: 'test-uri',
        calories: 200,
        foodName: 'Test Food',
      });
    });
  });

  it('should handle camera cancel', async () => {
    (ImagePicker.launchCamera as jest.Mock).mockResolvedValue({
      didCancel: true,
    });

    const {getByTestId, queryByTestId} = render(
      <CameraScreen navigation={mockNavigation as any} />,
    );

    const button = getByTestId('take-photo-button');
    fireEvent.press(button);

    await waitFor(() => {
      // 이미지가 선택되지 않았으므로 분석 버튼이 없어야 함
      expect(queryByTestId('analyze-button')).toBeNull();
    });
  });
});

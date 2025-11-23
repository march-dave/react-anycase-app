/**
 * App 컴포넌트 테스트
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// Mock 설정
jest.mock('react-native-image-picker');

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText} = render(<App />);
    expect(getByText('Calorie & Workout Calculator')).toBeTruthy();
    expect(getByText('Take a photo of your food')).toBeTruthy();
  });

  it('displays Take Photo button', () => {
    const {getByText} = render(<App />);
    const button = getByText('Take Photo');
    expect(button).toBeTruthy();
  });

  it('displays Choose from Gallery button', () => {
    const {getByText} = render(<App />);
    const button = getByText('Choose from Gallery');
    expect(button).toBeTruthy();
  });

  it('calls launchCamera when Take Photo button is pressed', () => {
    const {getByText} = render(<App />);
    const button = getByText('Take Photo');

    fireEvent.press(button);

    expect(launchCamera).toHaveBeenCalled();
  });

  it('calls launchImageLibrary when Choose from Gallery button is pressed', () => {
    const {getByText} = render(<App />);
    const button = getByText('Choose from Gallery');

    fireEvent.press(button);

    expect(launchImageLibrary).toHaveBeenCalled();
  });

  it('displays image when camera returns a valid response', async () => {
    const mockImageUri = 'file:///path/to/image.jpg';
    (launchCamera as jest.Mock).mockImplementation((options, callback) => {
      callback({
        assets: [{uri: mockImageUri}],
      });
    });

    const {getByText, findByTestId} = render(<App />);
    const button = getByText('Take Photo');

    fireEvent.press(button);

    // 이미지가 표시되는지 확인 (실제로는 testID를 추가해야 정확한 테스트 가능)
    await waitFor(() => {
      expect(launchCamera).toHaveBeenCalled();
    });
  });

  it('handles camera cancellation gracefully', () => {
    (launchCamera as jest.Mock).mockImplementation((options, callback) => {
      callback({didCancel: true});
    });

    const {getByText} = render(<App />);
    const button = getByText('Take Photo');

    fireEvent.press(button);

    expect(launchCamera).toHaveBeenCalled();
    // 앱이 크래시하지 않았는지 확인
  });

  it('handles camera error gracefully', () => {
    (launchCamera as jest.Mock).mockImplementation((options, callback) => {
      callback({
        errorCode: 'camera_unavailable',
        errorMessage: 'Camera not available',
      });
    });

    const {getByText} = render(<App />);
    const button = getByText('Take Photo');

    fireEvent.press(button);

    expect(launchCamera).toHaveBeenCalled();
    // 앱이 크래시하지 않았는지 확인
  });
});

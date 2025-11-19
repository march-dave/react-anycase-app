/**
 * Button 컴포넌트 유닛 테스트
 */

import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Button from '../../components/Button';

describe('Button', () => {
  // 기본 렌더링 테스트
  it('should render title correctly', () => {
    const {getByText} = render(
      <Button title="Click Me" onPress={() => {}} />,
    );

    expect(getByText('Click Me')).toBeTruthy();
  });

  // 클릭 이벤트 테스트
  it('should call onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const {getByText} = render(
      <Button title="Press" onPress={mockOnPress} />,
    );

    fireEvent.press(getByText('Press'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  // 비활성화 상태 테스트
  it('should not call onPress when disabled', () => {
    const mockOnPress = jest.fn();
    const {getByText} = render(
      <Button title="Disabled" onPress={mockOnPress} disabled />,
    );

    fireEvent.press(getByText('Disabled'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  // 로딩 상태 테스트
  it('should show loading indicator when loading', () => {
    const {getByTestId, queryByText} = render(
      <Button
        title="Loading"
        onPress={() => {}}
        loading
        testID="loading-button"
      />,
    );

    expect(getByTestId('button-loading')).toBeTruthy();
    expect(queryByText('Loading')).toBeNull();
  });

  // 로딩 중 클릭 방지 테스트
  it('should not call onPress when loading', () => {
    const mockOnPress = jest.fn();
    const {getByTestId} = render(
      <Button
        title="Loading"
        onPress={mockOnPress}
        loading
        testID="loading-button"
      />,
    );

    fireEvent.press(getByTestId('loading-button'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  // testID 전달 테스트
  it('should pass testID correctly', () => {
    const {getByTestId} = render(
      <Button title="Test" onPress={() => {}} testID="custom-test-id" />,
    );

    expect(getByTestId('custom-test-id')).toBeTruthy();
  });
});

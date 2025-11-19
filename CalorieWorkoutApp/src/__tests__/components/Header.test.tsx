/**
 * Header 컴포넌트 유닛 테스트
 */

import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Header from '../../components/Header';

describe('Header', () => {
  // 기본 렌더링 테스트
  it('should render title correctly', () => {
    const {getByTestId} = render(<Header title="Test Title" />);

    const title = getByTestId('header-title');
    expect(title.props.children).toBe('Test Title');
  });

  // 뒤로 가기 버튼이 기본적으로 숨겨져 있는지 테스트
  it('should not show back button by default', () => {
    const {queryByTestId} = render(<Header title="Test" />);

    const backButton = queryByTestId('back-button');
    expect(backButton).toBeNull();
  });

  // 뒤로 가기 버튼 표시 테스트
  it('should show back button when showBackButton is true', () => {
    const {getByTestId} = render(
      <Header title="Test" showBackButton onBackPress={() => {}} />,
    );

    const backButton = getByTestId('back-button');
    expect(backButton).toBeTruthy();
  });

  // 뒤로 가기 버튼 클릭 테스트
  it('should call onBackPress when back button is pressed', () => {
    const mockOnBackPress = jest.fn();
    const {getByTestId} = render(
      <Header title="Test" showBackButton onBackPress={mockOnBackPress} />,
    );

    const backButton = getByTestId('back-button');
    fireEvent.press(backButton);

    expect(mockOnBackPress).toHaveBeenCalledTimes(1);
  });
});

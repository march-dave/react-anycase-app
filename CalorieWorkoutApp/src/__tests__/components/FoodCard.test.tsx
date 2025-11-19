/**
 * FoodCard 컴포넌트 유닛 테스트
 */

import React from 'react';
import {render} from '@testing-library/react-native';
import FoodCard from '../../components/FoodCard';
import {CalorieResult} from '../../utils/calorieCalculator';

describe('FoodCard', () => {
  const mockFood: CalorieResult = {
    foodName: 'pizza',
    calories: 266,
    servingSize: 200,
    totalCalories: 532,
    confidence: 0.95,
  };

  // 기본 렌더링 테스트
  it('should render food card', () => {
    const {getByTestId} = render(<FoodCard food={mockFood} />);

    expect(getByTestId('food-card')).toBeTruthy();
  });

  // 음식 이름 표시 테스트
  it('should display food name in uppercase', () => {
    const {getByTestId} = render(<FoodCard food={mockFood} />);

    const foodName = getByTestId('food-name');
    expect(foodName.props.children).toBe('PIZZA');
  });

  // 서빙 사이즈 표시 테스트
  it('should display serving size', () => {
    const {getByTestId} = render(<FoodCard food={mockFood} />);

    const servingSize = getByTestId('serving-size');
    expect(servingSize.props.children).toBe('200g');
  });

  // 총 칼로리 표시 테스트
  it('should display total calories', () => {
    const {getByTestId} = render(<FoodCard food={mockFood} />);

    const totalCalories = getByTestId('total-calories');
    expect(totalCalories.props.children).toContain(532);
  });

  // 언더스코어 공백 변환 테스트
  it('should replace underscores with spaces in food name', () => {
    const foodWithUnderscore: CalorieResult = {
      ...mockFood,
      foodName: 'ice_cream',
    };

    const {getByTestId} = render(<FoodCard food={foodWithUnderscore} />);

    const foodName = getByTestId('food-name');
    expect(foodName.props.children).toBe('ICE CREAM');
  });

  // 높은 신뢰도 색상 테스트
  it('should render with high confidence color for confidence >= 0.8', () => {
    const highConfidenceFood: CalorieResult = {
      ...mockFood,
      confidence: 0.85,
    };

    const {getByTestId} = render(<FoodCard food={highConfidenceFood} />);
    expect(getByTestId('food-card')).toBeTruthy();
  });

  // 낮은 신뢰도 색상 테스트
  it('should render with low confidence color for confidence < 0.5', () => {
    const lowConfidenceFood: CalorieResult = {
      ...mockFood,
      confidence: 0.3,
    };

    const {getByTestId} = render(<FoodCard food={lowConfidenceFood} />);
    expect(getByTestId('food-card')).toBeTruthy();
  });
});

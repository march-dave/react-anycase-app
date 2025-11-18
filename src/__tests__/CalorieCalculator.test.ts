/**
 * CalorieCalculator 서비스 유닛 테스트
 */

import {
  analyzeFoodFromLabels,
  performCalorieAnalysis,
  getCaloriesForFood,
  estimateCalorieRange,
} from '../services/CalorieCalculator';

describe('CalorieCalculator', () => {
  describe('analyzeFoodFromLabels', () => {
    it('음식 라벨 배열을 FoodItem 배열로 변환해야 함', () => {
      const labels = ['rice', 'chicken', 'vegetable'];
      const result = analyzeFoodFromLabels(labels);

      expect(result).toHaveLength(3);
      expect(result[0].name).toBe('rice');
      expect(result[0].calories).toBeGreaterThan(0);
      expect(result[0].confidence).toBeGreaterThanOrEqual(0.7);
      expect(result[0].confidence).toBeLessThanOrEqual(1.0);
    });

    it('빈 라벨 배열에 대해 빈 배열을 반환해야 함', () => {
      const result = analyzeFoodFromLabels([]);
      expect(result).toHaveLength(0);
    });

    it('알려진 음식에 대해 정확한 칼로리를 반환해야 함', () => {
      const labels = ['rice'];
      const result = analyzeFoodFromLabels(labels);

      expect(result[0].calories).toBe(130);
    });

    it('알 수 없는 음식에 대해 기본 칼로리를 반환해야 함', () => {
      const labels = ['unknown_food_xyz'];
      const result = analyzeFoodFromLabels(labels);

      expect(result[0].calories).toBe(150); // 기본값
    });
  });

  describe('performCalorieAnalysis', () => {
    it('전체 칼로리 분석을 수행해야 함', () => {
      const labels = ['rice', 'chicken'];
      const imageUri = 'file:///test.jpg';
      const result = performCalorieAnalysis(labels, imageUri);

      expect(result.foodItems).toHaveLength(2);
      expect(result.totalCalories).toBeGreaterThan(0);
      expect(result.imageUri).toBe(imageUri);
      expect(result.timestamp).toBeInstanceOf(Date);
    });

    it('총 칼로리가 개별 음식 칼로리의 합과 같아야 함', () => {
      const labels = ['rice', 'chicken'];
      const result = performCalorieAnalysis(labels);

      const manualSum = result.foodItems.reduce(
        (sum, item) => sum + item.calories,
        0
      );
      expect(result.totalCalories).toBe(Math.round(manualSum));
    });
  });

  describe('getCaloriesForFood', () => {
    it('알려진 음식의 칼로리를 반환해야 함', () => {
      expect(getCaloriesForFood('rice')).toBe(130);
      expect(getCaloriesForFood('chicken')).toBe(165);
      expect(getCaloriesForFood('pizza')).toBe(266);
    });

    it('대소문자를 무시하고 검색해야 함', () => {
      expect(getCaloriesForFood('RICE')).toBe(130);
      expect(getCaloriesForFood('Rice')).toBe(130);
    });

    it('알 수 없는 음식에 대해 기본값을 반환해야 함', () => {
      expect(getCaloriesForFood('unknown')).toBe(150);
    });

    it('공백을 제거하고 검색해야 함', () => {
      expect(getCaloriesForFood('  rice  ')).toBe(130);
    });
  });

  describe('estimateCalorieRange', () => {
    it('칼로리 범위를 ±20%로 추정해야 함', () => {
      const result = estimateCalorieRange(100);

      expect(result.min).toBe(80);
      expect(result.max).toBe(120);
    });

    it('0 칼로리에 대해서도 동작해야 함', () => {
      const result = estimateCalorieRange(0);

      expect(result.min).toBe(0);
      expect(result.max).toBe(0);
    });

    it('큰 칼로리 값에 대해서도 정확해야 함', () => {
      const result = estimateCalorieRange(1000);

      expect(result.min).toBe(800);
      expect(result.max).toBe(1200);
    });
  });
});

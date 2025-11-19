/**
 * 칼로리 계산기 유닛 테스트
 */

import {
  getCaloriesForFood,
  calculateTotalCalories,
  calculateDailyPercentage,
  foodCalorieDatabase,
} from '../utils/calorieCalculator';

describe('calorieCalculator', () => {
  describe('getCaloriesForFood', () => {
    // 정확한 음식 이름 테스트
    it('should return correct calories for exact food match', () => {
      const result = getCaloriesForFood('apple', 100);

      expect(result.foodName).toBe('apple');
      expect(result.calories).toBe(52);
      expect(result.servingSize).toBe(100);
      expect(result.totalCalories).toBe(52);
      expect(result.confidence).toBe(1.0);
    });

    // 서빙 사이즈 계산 테스트
    it('should calculate total calories based on serving size', () => {
      const result = getCaloriesForFood('rice', 200);

      expect(result.calories).toBe(130); // 100g당 130kcal
      expect(result.servingSize).toBe(200);
      expect(result.totalCalories).toBe(260); // 200g = 260kcal
    });

    // 부분 매칭 테스트
    it('should find partial match for similar food names', () => {
      const result = getCaloriesForFood('grilled chicken', 150);

      expect(result.confidence).toBe(0.7);
      expect(result.totalCalories).toBeGreaterThan(0);
    });

    // 알 수 없는 음식 테스트
    it('should return default calories for unknown food', () => {
      const result = getCaloriesForFood('unknown_food_xyz', 100);

      expect(result.calories).toBe(150); // 기본값
      expect(result.confidence).toBe(0.3);
    });

    // 언더스코어가 있는 음식 이름 테스트
    it('should handle food names with spaces', () => {
      const result = getCaloriesForFood('ice cream', 100);

      expect(result.calories).toBe(207);
      expect(result.confidence).toBe(1.0);
    });

    // 대소문자 무시 테스트
    it('should be case insensitive', () => {
      const result = getCaloriesForFood('PIZZA', 100);

      expect(result.calories).toBe(266);
    });
  });

  describe('calculateTotalCalories', () => {
    // 여러 음식의 총 칼로리 계산 테스트
    it('should calculate total calories for multiple foods', () => {
      const foods = [
        {name: 'apple', grams: 100},
        {name: 'banana', grams: 100},
      ];

      const total = calculateTotalCalories(foods);

      expect(total).toBe(52 + 89); // apple + banana
    });

    // 빈 배열 테스트
    it('should return 0 for empty array', () => {
      const total = calculateTotalCalories([]);

      expect(total).toBe(0);
    });

    // 다양한 양 테스트
    it('should calculate with different serving sizes', () => {
      const foods = [
        {name: 'rice', grams: 200},
        {name: 'chicken', grams: 150},
      ];

      const total = calculateTotalCalories(foods);

      // rice: 130 * 2 = 260, chicken: 239 * 1.5 = 358.5 ≈ 359
      expect(total).toBe(260 + 359);
    });
  });

  describe('calculateDailyPercentage', () => {
    // 기본 일일 목표 테스트
    it('should calculate percentage of default daily goal', () => {
      const percentage = calculateDailyPercentage(500);

      expect(percentage).toBe(25); // 500/2000 * 100
    });

    // 사용자 정의 일일 목표 테스트
    it('should calculate percentage of custom daily goal', () => {
      const percentage = calculateDailyPercentage(750, 1500);

      expect(percentage).toBe(50); // 750/1500 * 100
    });

    // 100% 초과 테스트
    it('should handle values over 100%', () => {
      const percentage = calculateDailyPercentage(2500);

      expect(percentage).toBe(125); // 2500/2000 * 100
    });

    // 0 칼로리 테스트
    it('should return 0 for 0 calories', () => {
      const percentage = calculateDailyPercentage(0);

      expect(percentage).toBe(0);
    });
  });

  describe('foodCalorieDatabase', () => {
    // 데이터베이스에 충분한 음식이 있는지 테스트
    it('should have reasonable number of foods', () => {
      const foodCount = Object.keys(foodCalorieDatabase).length;

      expect(foodCount).toBeGreaterThan(30);
    });

    // 모든 칼로리 값이 유효한지 테스트
    it('should have valid calorie values for all foods', () => {
      Object.values(foodCalorieDatabase).forEach(calories => {
        expect(calories).toBeGreaterThan(0);
        expect(calories).toBeLessThan(1000);
      });
    });
  });
});

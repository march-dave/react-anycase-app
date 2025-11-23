/**
 * 칼로리 계산 유틸리티 유닛 테스트
 */

import {
  calculateCaloriesFromImage,
  calculateTotalCalories,
  classifyMealSize,
  calculateDailyPercentage,
  FOOD_DATABASE,
} from '../../src/utils/calorieCalculator';

describe('calorieCalculator', () => {
  describe('calculateCaloriesFromImage', () => {
    it('should return valid calorie data', () => {
      const result = calculateCaloriesFromImage('test-image-uri');

      expect(result).toHaveProperty('calories');
      expect(result).toHaveProperty('foodName');
      expect(result).toHaveProperty('confidence');

      expect(typeof result.calories).toBe('number');
      expect(typeof result.foodName).toBe('string');
      expect(typeof result.confidence).toBe('number');
    });

    it('should return calories greater than 0', () => {
      const result = calculateCaloriesFromImage('test-image-uri');
      expect(result.calories).toBeGreaterThan(0);
    });

    it('should return confidence between 70 and 95', () => {
      const result = calculateCaloriesFromImage('test-image-uri');
      expect(result.confidence).toBeGreaterThanOrEqual(70);
      expect(result.confidence).toBeLessThanOrEqual(95);
    });

    it('should return a valid food name from database', () => {
      const result = calculateCaloriesFromImage('test-image-uri');
      const foodNames = Object.values(FOOD_DATABASE).map(food => food.name);
      expect(foodNames).toContain(result.foodName);
    });
  });

  describe('calculateTotalCalories', () => {
    it('should calculate total calories for multiple foods', () => {
      const result = calculateTotalCalories(['rice', 'chicken', 'salad']);
      const expected =
        FOOD_DATABASE.rice.caloriesPerServing +
        FOOD_DATABASE.chicken.caloriesPerServing +
        FOOD_DATABASE.salad.caloriesPerServing;

      expect(result).toBe(expected);
    });

    it('should return 0 for empty array', () => {
      const result = calculateTotalCalories([]);
      expect(result).toBe(0);
    });

    it('should ignore invalid food keys', () => {
      const result = calculateTotalCalories(['rice', 'invalidFood', 'chicken']);
      const expected =
        FOOD_DATABASE.rice.caloriesPerServing +
        FOOD_DATABASE.chicken.caloriesPerServing;

      expect(result).toBe(expected);
    });

    it('should handle single food item', () => {
      const result = calculateTotalCalories(['burger']);
      expect(result).toBe(FOOD_DATABASE.burger.caloriesPerServing);
    });
  });

  describe('classifyMealSize', () => {
    it('should classify as Snack for calories < 100', () => {
      expect(classifyMealSize(50)).toBe('Snack');
      expect(classifyMealSize(99)).toBe('Snack');
    });

    it('should classify as Light Meal for calories 100-299', () => {
      expect(classifyMealSize(100)).toBe('Light Meal');
      expect(classifyMealSize(250)).toBe('Light Meal');
      expect(classifyMealSize(299)).toBe('Light Meal');
    });

    it('should classify as Regular Meal for calories 300-499', () => {
      expect(classifyMealSize(300)).toBe('Regular Meal');
      expect(classifyMealSize(400)).toBe('Regular Meal');
      expect(classifyMealSize(499)).toBe('Regular Meal');
    });

    it('should classify as Large Meal for calories 500-799', () => {
      expect(classifyMealSize(500)).toBe('Large Meal');
      expect(classifyMealSize(650)).toBe('Large Meal');
      expect(classifyMealSize(799)).toBe('Large Meal');
    });

    it('should classify as Very Large Meal for calories >= 800', () => {
      expect(classifyMealSize(800)).toBe('Very Large Meal');
      expect(classifyMealSize(1000)).toBe('Very Large Meal');
      expect(classifyMealSize(1500)).toBe('Very Large Meal');
    });
  });

  describe('calculateDailyPercentage', () => {
    it('should calculate percentage with default daily target (2000)', () => {
      expect(calculateDailyPercentage(500)).toBe(25);
      expect(calculateDailyPercentage(1000)).toBe(50);
      expect(calculateDailyPercentage(2000)).toBe(100);
    });

    it('should calculate percentage with custom daily target', () => {
      expect(calculateDailyPercentage(600, 2400)).toBe(25);
      expect(calculateDailyPercentage(1200, 2400)).toBe(50);
      expect(calculateDailyPercentage(2400, 2400)).toBe(100);
    });

    it('should handle zero calories', () => {
      expect(calculateDailyPercentage(0)).toBe(0);
    });

    it('should handle calories exceeding daily target', () => {
      expect(calculateDailyPercentage(3000, 2000)).toBe(150);
    });

    it('should round to one decimal place', () => {
      expect(calculateDailyPercentage(333, 2000)).toBe(16.7);
      expect(calculateDailyPercentage(666, 2000)).toBe(33.3);
    });
  });

  describe('FOOD_DATABASE', () => {
    it('should have all required properties for each food item', () => {
      Object.values(FOOD_DATABASE).forEach(food => {
        expect(food).toHaveProperty('name');
        expect(food).toHaveProperty('caloriesPerServing');
        expect(food).toHaveProperty('servingSize');

        expect(typeof food.name).toBe('string');
        expect(typeof food.caloriesPerServing).toBe('number');
        expect(typeof food.servingSize).toBe('string');
      });
    });

    it('should have positive calories for all items', () => {
      Object.values(FOOD_DATABASE).forEach(food => {
        expect(food.caloriesPerServing).toBeGreaterThan(0);
      });
    });
  });
});

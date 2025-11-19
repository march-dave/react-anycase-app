/**
 * calorieService 서비스 테스트
 */

import {
  analyzeFood,
  getCaloriesByFoodName,
  getAllFoods,
  addFood,
} from '../services/calorieService';

describe('calorieService', () => {
  describe('analyzeFood', () => {
    it('should return food analysis result', async () => {
      const result = await analyzeFood('test-image-uri');

      expect(result).toBeDefined();
      expect(result.foodName).toBeDefined();
      expect(typeof result.foodName).toBe('string');
      expect(result.calories).toBeDefined();
      expect(typeof result.calories).toBe('number');
      expect(result.calories).toBeGreaterThan(0);
    });

    it('should return different results on multiple calls', async () => {
      // 랜덤 결과이므로 여러 번 호출하면 다른 결과가 나올 수 있음
      const results = await Promise.all([
        analyzeFood('uri1'),
        analyzeFood('uri2'),
        analyzeFood('uri3'),
      ]);

      // 모든 결과가 유효해야 함
      results.forEach(result => {
        expect(result.foodName).toBeDefined();
        expect(result.calories).toBeGreaterThan(0);
      });
    });
  });

  describe('getCaloriesByFoodName', () => {
    it('should return calories for known food', () => {
      const result = getCaloriesByFoodName('Pizza Slice');
      expect(result).toBe(285);
    });

    it('should be case insensitive', () => {
      const result = getCaloriesByFoodName('pizza slice');
      expect(result).toBe(285);
    });

    it('should return null for unknown food', () => {
      const result = getCaloriesByFoodName('Unknown Food');
      expect(result).toBeNull();
    });

    it('should return correct calories for hamburger', () => {
      const result = getCaloriesByFoodName('Hamburger');
      expect(result).toBe(354);
    });

    it('should return correct calories for salad', () => {
      const result = getCaloriesByFoodName('Salad');
      expect(result).toBe(152);
    });
  });

  describe('getAllFoods', () => {
    it('should return all foods', () => {
      const result = getAllFoods();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return foods with correct structure', () => {
      const result = getAllFoods();

      result.forEach(food => {
        expect(food.name).toBeDefined();
        expect(typeof food.name).toBe('string');
        expect(food.calories).toBeDefined();
        expect(typeof food.calories).toBe('number');
        expect(food.servingSize).toBeDefined();
        expect(typeof food.servingSize).toBe('string');
      });
    });

    it('should return a copy of the food array', () => {
      const result1 = getAllFoods();
      const result2 = getAllFoods();

      expect(result1).not.toBe(result2);
    });

    it('should include common foods', () => {
      const result = getAllFoods();
      const foodNames = result.map(f => f.name);

      expect(foodNames).toContain('Pizza Slice');
      expect(foodNames).toContain('Hamburger');
      expect(foodNames).toContain('Salad');
      expect(foodNames).toContain('Apple');
    });
  });

  describe('addFood', () => {
    it('should add new food to database', () => {
      const initialCount = getAllFoods().length;

      addFood({
        name: 'Test Food',
        calories: 100,
        servingSize: '1 serving',
      });

      const newCount = getAllFoods().length;
      expect(newCount).toBe(initialCount + 1);

      const testFood = getCaloriesByFoodName('Test Food');
      expect(testFood).toBe(100);
    });
  });
});

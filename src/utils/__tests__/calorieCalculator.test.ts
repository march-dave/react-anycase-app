/**
 * 칼로리 계산 유틸리티 테스트
 */

import {
  calculateWorkoutTime,
  analyzeFood,
  isValidCalorie,
} from '../calorieCalculator';

describe('calculateWorkoutTime', () => {
  it('should calculate workout time correctly for 280 calories', () => {
    const result = calculateWorkoutTime(280);
    expect(result).toBe(40); // 280 / 7 = 40
  });

  it('should calculate workout time correctly for 350 calories', () => {
    const result = calculateWorkoutTime(350);
    expect(result).toBe(50); // 350 / 7 = 50
  });

  it('should round up workout time', () => {
    const result = calculateWorkoutTime(300);
    expect(result).toBe(43); // 300 / 7 = 42.857... -> 43
  });

  it('should return 0 for 0 calories', () => {
    const result = calculateWorkoutTime(0);
    expect(result).toBe(0);
  });

  it('should return 0 for negative calories', () => {
    const result = calculateWorkoutTime(-100);
    expect(result).toBe(0);
  });

  it('should handle large calorie values', () => {
    const result = calculateWorkoutTime(1000);
    expect(result).toBe(143); // 1000 / 7 = 142.857... -> 143
  });
});

describe('analyzeFood', () => {
  it('should return a valid CalorieResult', async () => {
    const result = await analyzeFood('/fake/path/to/photo.jpg');

    expect(result).toHaveProperty('foodName');
    expect(result).toHaveProperty('calories');
    expect(result).toHaveProperty('workoutMinutes');
    expect(typeof result.foodName).toBe('string');
    expect(typeof result.calories).toBe('number');
    expect(typeof result.workoutMinutes).toBe('number');
  });

  it('should return positive calorie values', async () => {
    const result = await analyzeFood('/fake/path/to/photo.jpg');
    expect(result.calories).toBeGreaterThan(0);
  });

  it('should calculate workout minutes based on calories', async () => {
    const result = await analyzeFood('/fake/path/to/photo.jpg');
    const expectedWorkoutMinutes = Math.ceil(result.calories / 7);
    expect(result.workoutMinutes).toBe(expectedWorkoutMinutes);
  });

  it('should return one of the predefined food items', async () => {
    const validFoods = [
      'Pizza Slice',
      'Hamburger',
      'Salad',
      'Fried Chicken',
      'Rice Bowl',
      'Sandwich',
      'Pasta',
      'Sushi Roll',
    ];

    const result = await analyzeFood('/fake/path/to/photo.jpg');
    expect(validFoods).toContain(result.foodName);
  });
});

describe('isValidCalorie', () => {
  it('should return true for valid calorie values', () => {
    expect(isValidCalorie(0)).toBe(true);
    expect(isValidCalorie(100)).toBe(true);
    expect(isValidCalorie(500)).toBe(true);
    expect(isValidCalorie(1000)).toBe(true);
    expect(isValidCalorie(10000)).toBe(true);
  });

  it('should return false for negative values', () => {
    expect(isValidCalorie(-1)).toBe(false);
    expect(isValidCalorie(-100)).toBe(false);
  });

  it('should return false for values exceeding maximum', () => {
    expect(isValidCalorie(10001)).toBe(false);
    expect(isValidCalorie(20000)).toBe(false);
  });
});

/**
 * 칼로리 계산 유틸리티 테스트
 */

import {
  calculateExerciseTime,
  estimateCalories,
  isValidCalories,
} from '../src/utils/calorieCalculator';

describe('calculateExerciseTime', () => {
  it('should calculate correct exercise time for 500 calories', () => {
    const result = calculateExerciseTime(500);

    expect(result.running).toBe(50);  // 500 / 10 = 50분
    expect(result.walking).toBe(100); // 500 / 5 = 100분
    expect(result.cycling).toBe(63);  // 500 / 8 = 62.5 -> 63분 (올림)
  });

  it('should calculate correct exercise time for 200 calories', () => {
    const result = calculateExerciseTime(200);

    expect(result.running).toBe(20);  // 200 / 10 = 20분
    expect(result.walking).toBe(40);  // 200 / 5 = 40분
    expect(result.cycling).toBe(25);  // 200 / 8 = 25분
  });

  it('should calculate correct exercise time for 1000 calories', () => {
    const result = calculateExerciseTime(1000);

    expect(result.running).toBe(100);  // 1000 / 10 = 100분
    expect(result.walking).toBe(200);  // 1000 / 5 = 200분
    expect(result.cycling).toBe(125);  // 1000 / 8 = 125분
  });

  it('should handle decimal values and round up', () => {
    const result = calculateExerciseTime(255);

    // 255 / 10 = 25.5 -> 26분 (올림)
    expect(result.running).toBe(26);
    // 255 / 5 = 51분
    expect(result.walking).toBe(51);
    // 255 / 8 = 31.875 -> 32분 (올림)
    expect(result.cycling).toBe(32);
  });
});

describe('estimateCalories', () => {
  it('should return a value within valid range', () => {
    const imageUri = 'file:///path/to/image.jpg';
    const calories = estimateCalories(imageUri);

    expect(calories).toBeGreaterThanOrEqual(200);
    expect(calories).toBeLessThanOrEqual(1000);
  });

  it('should return different values for different calls (random)', () => {
    const imageUri = 'file:///path/to/image.jpg';
    const results = new Set();

    // 10번 호출하여 최소 2개 이상의 다른 값이 나오는지 확인
    for (let i = 0; i < 10; i++) {
      results.add(estimateCalories(imageUri));
    }

    expect(results.size).toBeGreaterThan(1);
  });
});

describe('isValidCalories', () => {
  it('should return true for valid calorie values', () => {
    expect(isValidCalories(100)).toBe(true);
    expect(isValidCalories(500)).toBe(true);
    expect(isValidCalories(1000)).toBe(true);
    expect(isValidCalories(5000)).toBe(true);
  });

  it('should return false for invalid calorie values', () => {
    expect(isValidCalories(0)).toBe(false);
    expect(isValidCalories(-100)).toBe(false);
    expect(isValidCalories(5001)).toBe(false);
    expect(isValidCalories(Infinity)).toBe(false);
    expect(isValidCalories(NaN)).toBe(false);
  });

  it('should handle edge cases', () => {
    expect(isValidCalories(0.1)).toBe(true);
    expect(isValidCalories(4999.9)).toBe(true);
  });
});

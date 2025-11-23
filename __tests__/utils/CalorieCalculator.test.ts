/**
 * CalorieCalculator 유닛 테스트
 */

import {
  analyzeFood,
  calculateWorkoutTime,
  calculateTimeForExercise,
  calculateBMI,
  calculateDailyCalories,
} from '../../src/utils/CalorieCalculator';

describe('CalorieCalculator', () => {
  describe('analyzeFood', () => {
    it('should return food analysis result with valid data', async () => {
      const result = await analyzeFood('dummy-image-uri.jpg');

      expect(result).toHaveProperty('foodName');
      expect(result).toHaveProperty('calories');
      expect(result).toHaveProperty('confidence');
      expect(result).toHaveProperty('workoutTime');

      expect(typeof result.foodName).toBe('string');
      expect(typeof result.calories).toBe('number');
      expect(typeof result.confidence).toBe('number');

      expect(result.calories).toBeGreaterThan(0);
      expect(result.confidence).toBeGreaterThanOrEqual(0.8);
      expect(result.confidence).toBeLessThanOrEqual(1);
    });

    it('should return workout time object with all exercises', async () => {
      const result = await analyzeFood('dummy-image-uri.jpg');

      expect(result.workoutTime).toHaveProperty('running');
      expect(result.workoutTime).toHaveProperty('walking');
      expect(result.workoutTime).toHaveProperty('cycling');
      expect(result.workoutTime).toHaveProperty('swimming');

      expect(result.workoutTime.running).toBeGreaterThan(0);
      expect(result.workoutTime.walking).toBeGreaterThan(0);
      expect(result.workoutTime.cycling).toBeGreaterThan(0);
      expect(result.workoutTime.swimming).toBeGreaterThan(0);
    });
  });

  describe('calculateWorkoutTime', () => {
    it('should calculate workout times correctly for 500 calories', () => {
      const workoutTime = calculateWorkoutTime(500);

      expect(workoutTime.running).toBe(50); // 500 / 10.0 = 50
      expect(workoutTime.walking).toBe(125); // 500 / 4.0 = 125
      expect(workoutTime.cycling).toBe(67); // 500 / 7.5 ≈ 67
      expect(workoutTime.swimming).toBe(63); // 500 / 8.0 ≈ 63
    });

    it('should calculate workout times correctly for 300 calories', () => {
      const workoutTime = calculateWorkoutTime(300);

      expect(workoutTime.running).toBe(30); // 300 / 10.0 = 30
      expect(workoutTime.walking).toBe(75); // 300 / 4.0 = 75
      expect(workoutTime.cycling).toBe(40); // 300 / 7.5 = 40
      expect(workoutTime.swimming).toBe(38); // 300 / 8.0 ≈ 38
    });

    it('should return all positive values', () => {
      const workoutTime = calculateWorkoutTime(100);

      expect(workoutTime.running).toBeGreaterThan(0);
      expect(workoutTime.walking).toBeGreaterThan(0);
      expect(workoutTime.cycling).toBeGreaterThan(0);
      expect(workoutTime.swimming).toBeGreaterThan(0);
    });

    it('should handle zero calories', () => {
      const workoutTime = calculateWorkoutTime(0);

      expect(workoutTime.running).toBe(0);
      expect(workoutTime.walking).toBe(0);
      expect(workoutTime.cycling).toBe(0);
      expect(workoutTime.swimming).toBe(0);
    });
  });

  describe('calculateTimeForExercise', () => {
    it('should calculate time for running correctly', () => {
      const time = calculateTimeForExercise(500, 'running');
      expect(time).toBe(50); // 500 / 10.0 = 50
    });

    it('should calculate time for walking correctly', () => {
      const time = calculateTimeForExercise(400, 'walking');
      expect(time).toBe(100); // 400 / 4.0 = 100
    });

    it('should calculate time for cycling correctly', () => {
      const time = calculateTimeForExercise(300, 'cycling');
      expect(time).toBe(40); // 300 / 7.5 = 40
    });

    it('should calculate time for swimming correctly', () => {
      const time = calculateTimeForExercise(240, 'swimming');
      expect(time).toBe(30); // 240 / 8.0 = 30
    });
  });

  describe('calculateBMI', () => {
    it('should calculate BMI correctly for normal weight', () => {
      const bmi = calculateBMI(70, 175); // 70kg, 175cm
      expect(bmi).toBeCloseTo(22.9, 1);
    });

    it('should calculate BMI correctly for overweight', () => {
      const bmi = calculateBMI(85, 170); // 85kg, 170cm
      expect(bmi).toBeCloseTo(29.4, 1);
    });

    it('should calculate BMI correctly for underweight', () => {
      const bmi = calculateBMI(50, 170); // 50kg, 170cm
      expect(bmi).toBeCloseTo(17.3, 1);
    });

    it('should return a positive number', () => {
      const bmi = calculateBMI(70, 175);
      expect(bmi).toBeGreaterThan(0);
    });
  });

  describe('calculateDailyCalories', () => {
    it('should calculate daily calories for male correctly', () => {
      const calories = calculateDailyCalories('male', 70, 175, 30);
      expect(calories).toBeGreaterThan(1500);
      expect(calories).toBeLessThan(2500);
    });

    it('should calculate daily calories for female correctly', () => {
      const calories = calculateDailyCalories('female', 60, 165, 30);
      expect(calories).toBeGreaterThan(1200);
      expect(calories).toBeLessThan(2000);
    });

    it('should increase calories with higher activity level', () => {
      const sedentary = calculateDailyCalories('male', 70, 175, 30, 1.2);
      const active = calculateDailyCalories('male', 70, 175, 30, 1.55);

      expect(active).toBeGreaterThan(sedentary);
    });

    it('should return different values for different genders', () => {
      const maleCalories = calculateDailyCalories('male', 70, 175, 30);
      const femaleCalories = calculateDailyCalories('female', 70, 175, 30);

      expect(maleCalories).not.toBe(femaleCalories);
    });

    it('should return a positive integer', () => {
      const calories = calculateDailyCalories('male', 70, 175, 30);
      expect(calories).toBeGreaterThan(0);
      expect(Number.isInteger(calories)).toBe(true);
    });
  });
});

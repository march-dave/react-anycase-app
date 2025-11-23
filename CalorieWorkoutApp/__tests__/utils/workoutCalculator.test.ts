/**
 * 운동 시간 계산 유틸리티 유닛 테스트
 */

import {
  calculateWorkoutTime,
  calculateAllWorkoutTimes,
  getRecommendedWorkouts,
  formatWorkoutTime,
  adjustCaloriesForWeight,
  calculateCaloriesBurned,
  WORKOUT_TYPES,
} from '../../src/utils/workoutCalculator';

describe('workoutCalculator', () => {
  describe('calculateWorkoutTime', () => {
    it('should calculate correct workout time for walking', () => {
      // Walking burns 3.5 calories per minute
      // 350 calories / 3.5 = 100 minutes
      const result = calculateWorkoutTime(350, 'walking');
      expect(result).toBe(100);
    });

    it('should calculate correct workout time for running', () => {
      // Running burns 10 calories per minute
      // 500 calories / 10 = 50 minutes
      const result = calculateWorkoutTime(500, 'running');
      expect(result).toBe(50);
    });

    it('should round up to nearest minute', () => {
      // 355 calories / 10 = 35.5, should round up to 36
      const result = calculateWorkoutTime(355, 'running');
      expect(result).toBe(36);
    });

    it('should throw error for invalid workout type', () => {
      expect(() => calculateWorkoutTime(100, 'invalidWorkout')).toThrow(
        'Unknown workout type: invalidWorkout',
      );
    });

    it('should handle zero calories', () => {
      const result = calculateWorkoutTime(0, 'walking');
      expect(result).toBe(0);
    });
  });

  describe('calculateAllWorkoutTimes', () => {
    it('should return times for all workout types', () => {
      const result = calculateAllWorkoutTimes(500);
      const workoutKeys = Object.keys(WORKOUT_TYPES);

      expect(Object.keys(result).length).toBe(workoutKeys.length);

      workoutKeys.forEach(key => {
        expect(result[key]).toHaveProperty('time');
        expect(result[key]).toHaveProperty('workout');
        expect(typeof result[key].time).toBe('number');
      });
    });

    it('should calculate correct times for each workout', () => {
      const calories = 420;
      const result = calculateAllWorkoutTimes(calories);

      // Verify a few specific calculations
      expect(result.walking.time).toBe(
        Math.ceil(calories / WORKOUT_TYPES.walking.caloriesPerMinute),
      );
      expect(result.running.time).toBe(
        Math.ceil(calories / WORKOUT_TYPES.running.caloriesPerMinute),
      );
    });
  });

  describe('getRecommendedWorkouts', () => {
    it('should return default 5 recommended workouts', () => {
      const result = getRecommendedWorkouts(500);
      expect(result.length).toBe(5);
    });

    it('should return custom number of recommendations', () => {
      const result = getRecommendedWorkouts(500, 3);
      expect(result.length).toBe(3);
    });

    it('should sort workouts by time (fastest first)', () => {
      const result = getRecommendedWorkouts(500);

      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i].time).toBeLessThanOrEqual(result[i + 1].time);
      }
    });

    it('should include workout details', () => {
      const result = getRecommendedWorkouts(500, 1);

      expect(result[0]).toHaveProperty('key');
      expect(result[0]).toHaveProperty('time');
      expect(result[0]).toHaveProperty('workout');
      expect(result[0].workout).toHaveProperty('name');
      expect(result[0].workout).toHaveProperty('intensity');
    });
  });

  describe('formatWorkoutTime', () => {
    it('should format minutes less than 60', () => {
      expect(formatWorkoutTime(30)).toBe('30 min');
      expect(formatWorkoutTime(59)).toBe('59 min');
    });

    it('should format exact hours', () => {
      expect(formatWorkoutTime(60)).toBe('1 hr');
      expect(formatWorkoutTime(120)).toBe('2 hr');
      expect(formatWorkoutTime(180)).toBe('3 hr');
    });

    it('should format hours and minutes', () => {
      expect(formatWorkoutTime(90)).toBe('1 hr 30 min');
      expect(formatWorkoutTime(135)).toBe('2 hr 15 min');
      expect(formatWorkoutTime(195)).toBe('3 hr 15 min');
    });

    it('should handle 0 minutes', () => {
      expect(formatWorkoutTime(0)).toBe('0 min');
    });
  });

  describe('adjustCaloriesForWeight', () => {
    it('should return same calories for 70kg user (base weight)', () => {
      const result = adjustCaloriesForWeight(350, 70);
      expect(result).toBe(350);
    });

    it('should adjust calories for lighter user', () => {
      // 50kg user should burn fewer calories
      const result = adjustCaloriesForWeight(350, 50);
      expect(result).toBe(250); // (350 * 50) / 70 = 250
    });

    it('should adjust calories for heavier user', () => {
      // 90kg user should burn more calories
      const result = adjustCaloriesForWeight(350, 90);
      expect(result).toBe(450); // (350 * 90) / 70 = 450
    });

    it('should round to nearest integer', () => {
      const result = adjustCaloriesForWeight(100, 75);
      expect(result).toBe(107); // (100 * 75) / 70 = 107.14... rounds to 107
    });
  });

  describe('calculateCaloriesBurned', () => {
    it('should calculate calories burned for walking', () => {
      // Walking: 3.5 calories per minute
      // 30 minutes * 3.5 = 105 calories
      const result = calculateCaloriesBurned('walking', 30);
      expect(result).toBe(105);
    });

    it('should calculate calories burned for running', () => {
      // Running: 10 calories per minute
      // 45 minutes * 10 = 450 calories
      const result = calculateCaloriesBurned('running', 45);
      expect(result).toBe(450);
    });

    it('should throw error for invalid workout type', () => {
      expect(() => calculateCaloriesBurned('invalidWorkout', 30)).toThrow(
        'Unknown workout type: invalidWorkout',
      );
    });

    it('should handle zero minutes', () => {
      const result = calculateCaloriesBurned('walking', 0);
      expect(result).toBe(0);
    });

    it('should round to nearest integer', () => {
      // If a workout type had decimal minutes
      const result = calculateCaloriesBurned('walking', 10);
      expect(result).toBe(35); // 3.5 * 10 = 35
    });
  });

  describe('WORKOUT_TYPES', () => {
    it('should have all required properties for each workout', () => {
      Object.values(WORKOUT_TYPES).forEach(workout => {
        expect(workout).toHaveProperty('name');
        expect(workout).toHaveProperty('caloriesPerMinute');
        expect(workout).toHaveProperty('intensity');
        expect(workout).toHaveProperty('description');

        expect(typeof workout.name).toBe('string');
        expect(typeof workout.caloriesPerMinute).toBe('number');
        expect(typeof workout.description).toBe('string');
      });
    });

    it('should have valid intensity levels', () => {
      const validIntensities = ['Low', 'Moderate', 'High', 'Very High'];

      Object.values(WORKOUT_TYPES).forEach(workout => {
        expect(validIntensities).toContain(workout.intensity);
      });
    });

    it('should have positive calories per minute for all workouts', () => {
      Object.values(WORKOUT_TYPES).forEach(workout => {
        expect(workout.caloriesPerMinute).toBeGreaterThan(0);
      });
    });
  });
});

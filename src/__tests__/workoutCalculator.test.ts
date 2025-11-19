/**
 * workoutCalculator 유틸리티 테스트
 */

import {
  calculateWorkoutTime,
  getCaloriesPerMinute,
  getAllWorkouts,
  calculateCaloriesBurned,
} from '../utils/workoutCalculator';

describe('workoutCalculator', () => {
  describe('calculateWorkoutTime', () => {
    it('should calculate workout times for given calories', () => {
      const result = calculateWorkoutTime(100);

      expect(result).toBeDefined();
      expect(result.length).toBe(5);

      // 각 운동에 대한 시간이 계산되어야 함
      result.forEach(workout => {
        expect(workout.workoutName).toBeDefined();
        expect(workout.minutes).toBeGreaterThan(0);
        expect(workout.icon).toBeDefined();
      });
    });

    it('should return 0 minutes for 0 calories', () => {
      const result = calculateWorkoutTime(0);

      result.forEach(workout => {
        expect(workout.minutes).toBe(0);
      });
    });

    it('should return 0 minutes for negative calories', () => {
      const result = calculateWorkoutTime(-50);

      result.forEach(workout => {
        expect(workout.minutes).toBe(0);
      });
    });

    it('should calculate correct minutes for running', () => {
      // Running burns 11.4 cal/min, so 114 calories = 10 minutes
      const result = calculateWorkoutTime(114);
      const running = result.find(w => w.workoutName === 'Running');

      expect(running).toBeDefined();
      expect(running?.minutes).toBe(10);
    });

    it('should calculate correct minutes for walking', () => {
      // Walking burns 5 cal/min, so 50 calories = 10 minutes
      const result = calculateWorkoutTime(50);
      const walking = result.find(w => w.workoutName === 'Walking');

      expect(walking).toBeDefined();
      expect(walking?.minutes).toBe(10);
    });
  });

  describe('getCaloriesPerMinute', () => {
    it('should return correct calories per minute for running', () => {
      const result = getCaloriesPerMinute('Running');
      expect(result).toBe(11.4);
    });

    it('should return correct calories per minute for walking', () => {
      const result = getCaloriesPerMinute('Walking');
      expect(result).toBe(5.0);
    });

    it('should be case insensitive', () => {
      const result = getCaloriesPerMinute('RUNNING');
      expect(result).toBe(11.4);
    });

    it('should return null for unknown workout', () => {
      const result = getCaloriesPerMinute('Unknown Workout');
      expect(result).toBeNull();
    });
  });

  describe('getAllWorkouts', () => {
    it('should return all workouts', () => {
      const result = getAllWorkouts();

      expect(result).toBeDefined();
      expect(result.length).toBe(5);

      const workoutNames = result.map(w => w.name);
      expect(workoutNames).toContain('Running');
      expect(workoutNames).toContain('Walking');
      expect(workoutNames).toContain('Cycling');
      expect(workoutNames).toContain('Swimming');
      expect(workoutNames).toContain('Jump Rope');
    });

    it('should return a copy of the workout array', () => {
      const result1 = getAllWorkouts();
      const result2 = getAllWorkouts();

      expect(result1).not.toBe(result2);
    });
  });

  describe('calculateCaloriesBurned', () => {
    it('should calculate calories burned for running', () => {
      // Running burns 11.4 cal/min
      const result = calculateCaloriesBurned('Running', 10);
      expect(result).toBe(114);
    });

    it('should calculate calories burned for walking', () => {
      // Walking burns 5 cal/min
      const result = calculateCaloriesBurned('Walking', 30);
      expect(result).toBe(150);
    });

    it('should return null for unknown workout', () => {
      const result = calculateCaloriesBurned('Unknown', 10);
      expect(result).toBeNull();
    });

    it('should handle 0 minutes', () => {
      const result = calculateCaloriesBurned('Running', 0);
      expect(result).toBe(0);
    });
  });
});

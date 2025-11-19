/**
 * 운동 계산기 유닛 테스트
 */

import {
  calculateWorkoutOptions,
  calculateWorkoutMinutes,
  formatWorkoutTime,
  workoutCaloriesPerHour,
} from '../utils/workoutCalculator';

describe('workoutCalculator', () => {
  describe('calculateWorkoutOptions', () => {
    // 기본 운동 옵션 테스트
    it('should return workout options for given calories', () => {
      const options = calculateWorkoutOptions(500);

      expect(options).toBeDefined();
      expect(options.length).toBeGreaterThan(0);
    });

    // 모든 옵션이 필요한 속성을 가지고 있는지 테스트
    it('should include required properties for each option', () => {
      const options = calculateWorkoutOptions(300);

      options.forEach(option => {
        expect(option).toHaveProperty('name');
        expect(option).toHaveProperty('displayName');
        expect(option).toHaveProperty('caloriesPerHour');
        expect(option).toHaveProperty('minutesRequired');
        expect(option).toHaveProperty('icon');
      });
    });

    // 운동 시간이 올바르게 계산되는지 테스트
    it('should calculate correct workout minutes', () => {
      const calories = 280; // 70kg 기준 걷기 1시간
      const options = calculateWorkoutOptions(calories, 70);

      const walking = options.find(o => o.name === 'walking');
      expect(walking?.minutesRequired).toBe(60);
    });

    // 체중에 따른 조정 테스트
    it('should adjust calories burned based on weight', () => {
      const options70kg = calculateWorkoutOptions(500, 70);
      const options80kg = calculateWorkoutOptions(500, 80);

      const walking70 = options70kg.find(o => o.name === 'walking');
      const walking80 = options80kg.find(o => o.name === 'walking');

      // 체중이 높으면 시간당 더 많은 칼로리를 소모하므로 필요한 시간이 더 적음
      expect(walking80!.minutesRequired).toBeLessThan(walking70!.minutesRequired);
    });

    // 0 칼로리 테스트
    it('should handle 0 calories', () => {
      const options = calculateWorkoutOptions(0);

      options.forEach(option => {
        expect(option.minutesRequired).toBe(0);
      });
    });
  });

  describe('calculateWorkoutMinutes', () => {
    // 특정 운동의 시간 계산 테스트
    it('should calculate minutes for specific workout', () => {
      const minutes = calculateWorkoutMinutes('running', 700, 70);

      expect(minutes).toBe(60); // 700kcal / 700kcal per hour = 1 hour
    });

    // 알 수 없는 운동에 대한 기본값 테스트
    it('should use walking as default for unknown workout', () => {
      const minutes = calculateWorkoutMinutes('unknown_workout', 280, 70);

      expect(minutes).toBe(60); // 걷기 기본값 사용
    });

    // 체중 조정 테스트
    it('should adjust for different body weights', () => {
      const minutes70kg = calculateWorkoutMinutes('jogging', 490, 70);
      const minutes60kg = calculateWorkoutMinutes('jogging', 490, 60);

      expect(minutes60kg).toBeGreaterThan(minutes70kg);
    });
  });

  describe('formatWorkoutTime', () => {
    // 60분 미만 테스트
    it('should format minutes under 60', () => {
      expect(formatWorkoutTime(30)).toBe('30 min');
      expect(formatWorkoutTime(45)).toBe('45 min');
    });

    // 정확히 1시간 테스트
    it('should format exactly 1 hour', () => {
      expect(formatWorkoutTime(60)).toBe('1 hr');
    });

    // 시간과 분 조합 테스트
    it('should format hours and minutes', () => {
      expect(formatWorkoutTime(90)).toBe('1 hr 30 min');
      expect(formatWorkoutTime(135)).toBe('2 hr 15 min');
    });

    // 정확히 여러 시간 테스트
    it('should format multiple exact hours', () => {
      expect(formatWorkoutTime(120)).toBe('2 hr');
      expect(formatWorkoutTime(180)).toBe('3 hr');
    });

    // 0분 테스트
    it('should handle 0 minutes', () => {
      expect(formatWorkoutTime(0)).toBe('0 min');
    });
  });

  describe('workoutCaloriesPerHour', () => {
    // 데이터베이스에 충분한 운동이 있는지 테스트
    it('should have reasonable number of workouts', () => {
      const workoutCount = Object.keys(workoutCaloriesPerHour).length;

      expect(workoutCount).toBeGreaterThan(10);
    });

    // 모든 칼로리 값이 유효한지 테스트
    it('should have valid calorie values', () => {
      Object.values(workoutCaloriesPerHour).forEach(calories => {
        expect(calories).toBeGreaterThan(0);
        expect(calories).toBeLessThan(1000);
      });
    });

    // 강도에 따른 순서 테스트
    it('should have running burn more than walking', () => {
      expect(workoutCaloriesPerHour.running).toBeGreaterThan(
        workoutCaloriesPerHour.walking,
      );
    });
  });
});

/**
 * WorkoutCalculator 서비스 유닛 테스트
 */

import {
  calculateWorkoutDuration,
  calculateAllWorkoutRecommendations,
  formatDuration,
  getRecommendationsByDifficulty,
  getMostEfficientWorkout,
  getEasiestWorkout,
  EXERCISES,
} from '../services/WorkoutCalculator';

describe('WorkoutCalculator', () => {
  describe('calculateWorkoutDuration', () => {
    it('칼로리와 운동을 기반으로 시간을 계산해야 함', () => {
      const exercise = EXERCISES[0]; // Walking (3.5 kcal/min)
      const duration = calculateWorkoutDuration(350, exercise);

      expect(duration).toBe(100); // 350 / 3.5 = 100분
    });

    it('결과를 올림해야 함', () => {
      const exercise = EXERCISES[0]; // Walking (3.5 kcal/min)
      const duration = calculateWorkoutDuration(100, exercise);

      expect(duration).toBe(29); // ceil(100 / 3.5) = 29
    });

    it('0 칼로리에 대해 0을 반환해야 함', () => {
      const exercise = EXERCISES[0];
      const duration = calculateWorkoutDuration(0, exercise);

      expect(duration).toBe(0);
    });

    it('음수 칼로리에 대해 0을 반환해야 함', () => {
      const exercise = EXERCISES[0];
      const duration = calculateWorkoutDuration(-100, exercise);

      expect(duration).toBe(0);
    });
  });

  describe('calculateAllWorkoutRecommendations', () => {
    it('모든 운동에 대한 권장사항을 반환해야 함', () => {
      const recommendations = calculateAllWorkoutRecommendations(300);

      expect(recommendations).toHaveLength(EXERCISES.length);
      expect(recommendations[0].exercise).toBeDefined();
      expect(recommendations[0].durationMinutes).toBeGreaterThan(0);
      expect(recommendations[0].totalCaloriesToBurn).toBe(300);
    });

    it('고강도 운동이 저강도 운동보다 짧은 시간이어야 함', () => {
      const recommendations = calculateAllWorkoutRecommendations(300);

      const running = recommendations.find(r => r.exercise.name === 'Running');
      const walking = recommendations.find(r => r.exercise.name === 'Walking');

      expect(running!.durationMinutes).toBeLessThan(
        walking!.durationMinutes
      );
    });
  });

  describe('formatDuration', () => {
    it('60분 미만은 분으로 표시해야 함', () => {
      expect(formatDuration(30)).toBe('30 min');
      expect(formatDuration(59)).toBe('59 min');
    });

    it('60분은 1시간으로 표시해야 함', () => {
      expect(formatDuration(60)).toBe('1 hr');
    });

    it('60분 이상은 시간과 분으로 표시해야 함', () => {
      expect(formatDuration(90)).toBe('1 hr 30 min');
      expect(formatDuration(125)).toBe('2 hr 5 min');
    });

    it('정확히 시간 단위는 분을 생략해야 함', () => {
      expect(formatDuration(120)).toBe('2 hr');
      expect(formatDuration(180)).toBe('3 hr');
    });
  });

  describe('getRecommendationsByDifficulty', () => {
    it('난이도별로 운동을 분류해야 함', () => {
      const result = getRecommendationsByDifficulty(300);

      expect(result.light.length).toBeGreaterThan(0);
      expect(result.moderate.length).toBeGreaterThan(0);
      expect(result.intense.length).toBeGreaterThan(0);
    });

    it('light는 5 kcal/min 미만이어야 함', () => {
      const result = getRecommendationsByDifficulty(300);

      result.light.forEach(rec => {
        expect(rec.exercise.caloriesPerMinute).toBeLessThan(5);
      });
    });

    it('moderate는 5-9 kcal/min이어야 함', () => {
      const result = getRecommendationsByDifficulty(300);

      result.moderate.forEach(rec => {
        expect(rec.exercise.caloriesPerMinute).toBeGreaterThanOrEqual(5);
        expect(rec.exercise.caloriesPerMinute).toBeLessThan(9);
      });
    });

    it('intense는 9 kcal/min 이상이어야 함', () => {
      const result = getRecommendationsByDifficulty(300);

      result.intense.forEach(rec => {
        expect(rec.exercise.caloriesPerMinute).toBeGreaterThanOrEqual(9);
      });
    });
  });

  describe('getMostEfficientWorkout', () => {
    it('가장 짧은 시간의 운동을 반환해야 함', () => {
      const result = getMostEfficientWorkout(300);

      expect(result).not.toBeNull();
      expect(result!.exercise.name).toBe('Jump Rope'); // 가장 높은 kcal/min
    });

    it('0 칼로리에 대해서도 동작해야 함', () => {
      const result = getMostEfficientWorkout(0);

      expect(result).not.toBeNull();
      expect(result!.durationMinutes).toBe(0);
    });
  });

  describe('getEasiestWorkout', () => {
    it('가장 낮은 강도의 운동을 반환해야 함', () => {
      const result = getEasiestWorkout(300);

      expect(result).not.toBeNull();
      expect(result!.exercise.name).toBe('Yoga'); // 가장 낮은 kcal/min
    });

    it('가장 긴 시간이 필요한 운동이어야 함', () => {
      const all = calculateAllWorkoutRecommendations(300);
      const easiest = getEasiestWorkout(300);

      const maxDuration = Math.max(...all.map(r => r.durationMinutes));
      expect(easiest!.durationMinutes).toBe(maxDuration);
    });
  });

  describe('EXERCISES', () => {
    it('운동 목록이 비어있지 않아야 함', () => {
      expect(EXERCISES.length).toBeGreaterThan(0);
    });

    it('모든 운동이 유효한 데이터를 가져야 함', () => {
      EXERCISES.forEach(exercise => {
        expect(exercise.name).toBeTruthy();
        expect(exercise.caloriesPerMinute).toBeGreaterThan(0);
      });
    });

    it('최소 10개 이상의 운동이 있어야 함', () => {
      expect(EXERCISES.length).toBeGreaterThanOrEqual(10);
    });
  });
});

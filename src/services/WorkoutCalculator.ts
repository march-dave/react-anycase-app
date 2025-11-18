/**
 * 운동 시간 계산 서비스
 * 섭취한 칼로리를 소모하기 위한 운동 시간을 계산합니다
 */

import {Exercise, WorkoutRecommendation} from '../types';

// 운동별 분당 칼로리 소모량 (평균 체중 70kg 기준)
export const EXERCISES: Exercise[] = [
  {name: 'Walking', caloriesPerMinute: 3.5},
  {name: 'Jogging', caloriesPerMinute: 7.0},
  {name: 'Running', caloriesPerMinute: 11.4},
  {name: 'Cycling', caloriesPerMinute: 7.5},
  {name: 'Swimming', caloriesPerMinute: 9.0},
  {name: 'Jump Rope', caloriesPerMinute: 12.3},
  {name: 'Yoga', caloriesPerMinute: 2.5},
  {name: 'Weight Training', caloriesPerMinute: 6.0},
  {name: 'Dancing', caloriesPerMinute: 5.5},
  {name: 'Hiking', caloriesPerMinute: 6.5},
  {name: 'Basketball', caloriesPerMinute: 8.0},
  {name: 'Soccer', caloriesPerMinute: 8.5},
  {name: 'Tennis', caloriesPerMinute: 7.3},
  {name: 'Rowing', caloriesPerMinute: 8.5},
  {name: 'Elliptical', caloriesPerMinute: 7.0},
];

/**
 * 특정 칼로리를 소모하기 위한 운동 시간 계산
 */
export function calculateWorkoutDuration(
  calories: number,
  exercise: Exercise
): number {
  if (calories <= 0 || exercise.caloriesPerMinute <= 0) {
    return 0;
  }

  return Math.ceil(calories / exercise.caloriesPerMinute);
}

/**
 * 모든 운동에 대한 권장 시간 계산
 */
export function calculateAllWorkoutRecommendations(
  calories: number
): WorkoutRecommendation[] {
  return EXERCISES.map(exercise => ({
    exercise,
    durationMinutes: calculateWorkoutDuration(calories, exercise),
    totalCaloriesToBurn: calories,
  }));
}

/**
 * 시간을 사람이 읽기 쉬운 형식으로 변환
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }

  return `${hours} hr ${remainingMinutes} min`;
}

/**
 * 난이도별 운동 추천
 */
export function getRecommendationsByDifficulty(
  calories: number
): {
  light: WorkoutRecommendation[];
  moderate: WorkoutRecommendation[];
  intense: WorkoutRecommendation[];
} {
  const allRecommendations = calculateAllWorkoutRecommendations(calories);

  return {
    light: allRecommendations.filter(
      rec => rec.exercise.caloriesPerMinute < 5
    ),
    moderate: allRecommendations.filter(
      rec => rec.exercise.caloriesPerMinute >= 5 &&
             rec.exercise.caloriesPerMinute < 9
    ),
    intense: allRecommendations.filter(
      rec => rec.exercise.caloriesPerMinute >= 9
    ),
  };
}

/**
 * 가장 효율적인 운동 추천 (시간 기준)
 */
export function getMostEfficientWorkout(
  calories: number
): WorkoutRecommendation | null {
  const recommendations = calculateAllWorkoutRecommendations(calories);

  if (recommendations.length === 0) {
    return null;
  }

  return recommendations.reduce((best, current) =>
    current.durationMinutes < best.durationMinutes ? current : best
  );
}

/**
 * 가장 완만한 운동 추천 (초보자용)
 */
export function getEasiestWorkout(
  calories: number
): WorkoutRecommendation | null {
  const recommendations = calculateAllWorkoutRecommendations(calories);

  if (recommendations.length === 0) {
    return null;
  }

  return recommendations.reduce((easiest, current) =>
    current.exercise.caloriesPerMinute < easiest.exercise.caloriesPerMinute
      ? current
      : easiest
  );
}

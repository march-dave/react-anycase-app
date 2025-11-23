/**
 * 운동 시간 계산 유틸리티
 * 섭취한 칼로리를 소모하기 위한 운동 시간 계산
 */

// 운동 타입 정의
export interface WorkoutType {
  name: string;
  caloriesPerMinute: number;
  intensity: 'Low' | 'Moderate' | 'High' | 'Very High';
  description: string;
}

// 다양한 운동 타입별 분당 칼로리 소모량 (평균 70kg 성인 기준)
export const WORKOUT_TYPES: Record<string, WorkoutType> = {
  walking: {
    name: 'Walking',
    caloriesPerMinute: 3.5,
    intensity: 'Low',
    description: 'Casual walking at 3-4 km/h',
  },
  briskWalking: {
    name: 'Brisk Walking',
    caloriesPerMinute: 5,
    intensity: 'Moderate',
    description: 'Fast walking at 5-6 km/h',
  },
  jogging: {
    name: 'Jogging',
    caloriesPerMinute: 7,
    intensity: 'Moderate',
    description: 'Light jogging at 6-8 km/h',
  },
  running: {
    name: 'Running',
    caloriesPerMinute: 10,
    intensity: 'High',
    description: 'Running at 8-10 km/h',
  },
  fastRunning: {
    name: 'Fast Running',
    caloriesPerMinute: 13,
    intensity: 'Very High',
    description: 'Fast running at 10+ km/h',
  },
  cycling: {
    name: 'Cycling',
    caloriesPerMinute: 6,
    intensity: 'Moderate',
    description: 'Casual cycling at 15-20 km/h',
  },
  fastCycling: {
    name: 'Fast Cycling',
    caloriesPerMinute: 10,
    intensity: 'High',
    description: 'Fast cycling at 20-25 km/h',
  },
  swimming: {
    name: 'Swimming',
    caloriesPerMinute: 8,
    intensity: 'Moderate',
    description: 'Freestyle swimming',
  },
  jumpingRope: {
    name: 'Jumping Rope',
    caloriesPerMinute: 12,
    intensity: 'Very High',
    description: 'Continuous rope jumping',
  },
  hiking: {
    name: 'Hiking',
    caloriesPerMinute: 6,
    intensity: 'Moderate',
    description: 'Hiking with backpack',
  },
  yoga: {
    name: 'Yoga',
    caloriesPerMinute: 3,
    intensity: 'Low',
    description: 'Hatha yoga',
  },
  weightTraining: {
    name: 'Weight Training',
    caloriesPerMinute: 5,
    intensity: 'Moderate',
    description: 'General weight lifting',
  },
  basketball: {
    name: 'Basketball',
    caloriesPerMinute: 8,
    intensity: 'High',
    description: 'Playing basketball',
  },
  soccer: {
    name: 'Soccer',
    caloriesPerMinute: 9,
    intensity: 'High',
    description: 'Playing soccer',
  },
  dancing: {
    name: 'Dancing',
    caloriesPerMinute: 5,
    intensity: 'Moderate',
    description: 'General dancing',
  },
};

/**
 * 특정 운동으로 칼로리를 소모하는데 필요한 시간 계산
 * @param calories 소모할 칼로리
 * @param workoutKey 운동 타입 키
 * @returns 필요한 운동 시간 (분)
 */
export const calculateWorkoutTime = (
  calories: number,
  workoutKey: string,
): number => {
  const workout = WORKOUT_TYPES[workoutKey];
  if (!workout) {
    throw new Error(`Unknown workout type: ${workoutKey}`);
  }

  return Math.ceil(calories / workout.caloriesPerMinute);
};

/**
 * 모든 운동 타입에 대한 필요 시간 계산
 * @param calories 소모할 칼로리
 * @returns 운동별 필요 시간 객체
 */
export const calculateAllWorkoutTimes = (
  calories: number,
): Record<string, { time: number; workout: WorkoutType }> => {
  const result: Record<string, { time: number; workout: WorkoutType }> = {};

  Object.keys(WORKOUT_TYPES).forEach(key => {
    const workout = WORKOUT_TYPES[key];
    result[key] = {
      time: calculateWorkoutTime(calories, key),
      workout,
    };
  });

  return result;
};

/**
 * 추천 운동 목록 생성 (시간 기준으로 정렬)
 * @param calories 소모할 칼로리
 * @param maxWorkouts 최대 추천 개수
 * @returns 추천 운동 목록
 */
export const getRecommendedWorkouts = (
  calories: number,
  maxWorkouts: number = 5,
): Array<{ key: string; time: number; workout: WorkoutType }> => {
  const allWorkouts = calculateAllWorkoutTimes(calories);

  return Object.entries(allWorkouts)
    .map(([key, value]) => ({
      key,
      time: value.time,
      workout: value.workout,
    }))
    .sort((a, b) => a.time - b.time)
    .slice(0, maxWorkouts);
};

/**
 * 시간을 시:분 형식으로 변환
 * @param minutes 분
 * @returns 시:분 문자열
 */
export const formatWorkoutTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }

  return `${hours} hr ${remainingMinutes} min`;
};

/**
 * 체중에 따른 칼로리 소모량 조정
 * @param baseCalories 기본 칼로리 (70kg 기준)
 * @param userWeight 사용자 체중 (kg)
 * @returns 조정된 칼로리
 */
export const adjustCaloriesForWeight = (
  baseCalories: number,
  userWeight: number,
): number => {
  const baseWeight = 70; // 기준 체중
  return Math.round((baseCalories * userWeight) / baseWeight);
};

/**
 * 특정 시간 동안의 칼로리 소모량 계산
 * @param workoutKey 운동 타입 키
 * @param minutes 운동 시간 (분)
 * @returns 소모 칼로리
 */
export const calculateCaloriesBurned = (
  workoutKey: string,
  minutes: number,
): number => {
  const workout = WORKOUT_TYPES[workoutKey];
  if (!workout) {
    throw new Error(`Unknown workout type: ${workoutKey}`);
  }

  return Math.round(workout.caloriesPerMinute * minutes);
};

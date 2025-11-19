/**
 * 운동 시간 계산 유틸리티
 * 칼로리를 소모하기 위해 필요한 운동 시간을 계산합니다.
 */

// 운동별 시간당 칼로리 소모량 (체중 70kg 기준)
export const workoutCaloriesPerHour: Record<string, number> = {
  walking: 280,
  jogging: 490,
  running: 700,
  cycling: 560,
  swimming: 490,
  yoga: 210,
  pilates: 250,
  weightlifting: 420,
  hiit: 630,
  dancing: 385,
  jump_rope: 700,
  rowing: 560,
  climbing: 560,
  tennis: 490,
  basketball: 560,
  soccer: 490,
  boxing: 630,
  aerobics: 455,
  stretching: 140,
  elliptical: 455,
};

export interface WorkoutOption {
  name: string;
  displayName: string;
  caloriesPerHour: number;
  minutesRequired: number;
  icon: string;
}

/**
 * 칼로리를 소모하기 위한 운동 옵션들을 계산합니다.
 * @param calories 소모할 칼로리
 * @param weightKg 체중 (kg)
 * @returns 운동 옵션 목록
 */
export function calculateWorkoutOptions(
  calories: number,
  weightKg: number = 70
): WorkoutOption[] {
  // 체중에 따른 칼로리 소모량 조정 계수
  const weightMultiplier = weightKg / 70;

  const workouts: WorkoutOption[] = [
    {
      name: 'walking',
      displayName: 'Walking',
      caloriesPerHour: Math.round(workoutCaloriesPerHour.walking * weightMultiplier),
      minutesRequired: 0,
      icon: '🚶',
    },
    {
      name: 'jogging',
      displayName: 'Jogging',
      caloriesPerHour: Math.round(workoutCaloriesPerHour.jogging * weightMultiplier),
      minutesRequired: 0,
      icon: '🏃',
    },
    {
      name: 'running',
      displayName: 'Running',
      caloriesPerHour: Math.round(workoutCaloriesPerHour.running * weightMultiplier),
      minutesRequired: 0,
      icon: '🏃‍♂️',
    },
    {
      name: 'cycling',
      displayName: 'Cycling',
      caloriesPerHour: Math.round(workoutCaloriesPerHour.cycling * weightMultiplier),
      minutesRequired: 0,
      icon: '🚴',
    },
    {
      name: 'swimming',
      displayName: 'Swimming',
      caloriesPerHour: Math.round(workoutCaloriesPerHour.swimming * weightMultiplier),
      minutesRequired: 0,
      icon: '🏊',
    },
    {
      name: 'yoga',
      displayName: 'Yoga',
      caloriesPerHour: Math.round(workoutCaloriesPerHour.yoga * weightMultiplier),
      minutesRequired: 0,
      icon: '🧘',
    },
    {
      name: 'weightlifting',
      displayName: 'Weight Lifting',
      caloriesPerHour: Math.round(workoutCaloriesPerHour.weightlifting * weightMultiplier),
      minutesRequired: 0,
      icon: '🏋️',
    },
    {
      name: 'hiit',
      displayName: 'HIIT',
      caloriesPerHour: Math.round(workoutCaloriesPerHour.hiit * weightMultiplier),
      minutesRequired: 0,
      icon: '⚡',
    },
    {
      name: 'dancing',
      displayName: 'Dancing',
      caloriesPerHour: Math.round(workoutCaloriesPerHour.dancing * weightMultiplier),
      minutesRequired: 0,
      icon: '💃',
    },
    {
      name: 'jump_rope',
      displayName: 'Jump Rope',
      caloriesPerHour: Math.round(workoutCaloriesPerHour.jump_rope * weightMultiplier),
      minutesRequired: 0,
      icon: '🪢',
    },
  ];

  // 각 운동에 필요한 시간 계산
  return workouts.map(workout => ({
    ...workout,
    minutesRequired: Math.ceil((calories / workout.caloriesPerHour) * 60),
  }));
}

/**
 * 특정 운동으로 칼로리를 소모하는데 필요한 시간을 계산합니다.
 * @param workoutName 운동 이름
 * @param calories 소모할 칼로리
 * @param weightKg 체중 (kg)
 * @returns 필요한 분 수
 */
export function calculateWorkoutMinutes(
  workoutName: string,
  calories: number,
  weightKg: number = 70
): number {
  const caloriesPerHour =
    workoutCaloriesPerHour[workoutName] || workoutCaloriesPerHour.walking;
  const weightMultiplier = weightKg / 70;
  const adjustedCaloriesPerHour = caloriesPerHour * weightMultiplier;

  return Math.ceil((calories / adjustedCaloriesPerHour) * 60);
}

/**
 * 시간을 포맷팅합니다.
 * @param minutes 분
 * @returns 포맷팅된 문자열
 */
export function formatWorkoutTime(minutes: number): string {
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

/**
 * WorkoutCalculator - 운동 시간 계산 유틸리티
 * 칼로리를 소모하기 위해 필요한 운동 시간 계산
 */

import {WorkoutData, WorkoutTime} from '../types';

// 운동별 분당 칼로리 소모량 데이터 (70kg 기준)
const workoutDatabase: WorkoutData[] = [
  {name: 'Running', caloriesPerMinute: 11.4, icon: '🏃'},
  {name: 'Walking', caloriesPerMinute: 5.0, icon: '🚶'},
  {name: 'Cycling', caloriesPerMinute: 9.5, icon: '🚴'},
  {name: 'Swimming', caloriesPerMinute: 10.0, icon: '🏊'},
  {name: 'Jump Rope', caloriesPerMinute: 12.0, icon: '🪢'},
];

/**
 * 칼로리를 소모하기 위해 필요한 각 운동의 시간 계산
 * @param calories 소모해야 할 칼로리
 * @returns 운동별 필요 시간 배열
 */
export const calculateWorkoutTime = (calories: number): WorkoutTime[] => {
  if (calories <= 0) {
    return workoutDatabase.map(workout => ({
      workoutName: workout.name,
      minutes: 0,
      icon: workout.icon,
    }));
  }

  return workoutDatabase.map(workout => {
    const minutes = Math.round(calories / workout.caloriesPerMinute);
    return {
      workoutName: workout.name,
      minutes: minutes,
      icon: workout.icon,
    };
  });
};

/**
 * 특정 운동의 분당 칼로리 소모량 반환
 * @param workoutName 운동 이름
 * @returns 분당 칼로리 소모량 또는 null
 */
export const getCaloriesPerMinute = (workoutName: string): number | null => {
  const workout = workoutDatabase.find(
    item => item.name.toLowerCase() === workoutName.toLowerCase(),
  );
  return workout ? workout.caloriesPerMinute : null;
};

/**
 * 모든 운동 데이터 반환
 * @returns 운동 데이터 배열
 */
export const getAllWorkouts = (): WorkoutData[] => {
  return [...workoutDatabase];
};

/**
 * 특정 운동으로 특정 시간 동안 소모되는 칼로리 계산
 * @param workoutName 운동 이름
 * @param minutes 운동 시간 (분)
 * @returns 소모 칼로리 또는 null
 */
export const calculateCaloriesBurned = (
  workoutName: string,
  minutes: number,
): number | null => {
  const caloriesPerMinute = getCaloriesPerMinute(workoutName);
  if (caloriesPerMinute === null) {
    return null;
  }
  return Math.round(caloriesPerMinute * minutes);
};

export default {
  calculateWorkoutTime,
  getCaloriesPerMinute,
  getAllWorkouts,
  calculateCaloriesBurned,
};

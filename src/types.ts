/**
 * 타입 정의 파일
 */

// 네비게이션 스택 파라미터 타입
export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Result: {
    imageUri: string;
    calories: number;
    foodName: string;
  };
};

// 음식 칼로리 데이터 타입
export interface FoodCalorieData {
  name: string;
  calories: number;
  servingSize: string;
}

// 운동 데이터 타입
export interface WorkoutData {
  name: string;
  caloriesPerMinute: number;
  icon: string;
}

// 계산 결과 타입
export interface CalorieResult {
  foodName: string;
  calories: number;
  workouts: WorkoutTime[];
}

// 운동 시간 타입
export interface WorkoutTime {
  workoutName: string;
  minutes: number;
  icon: string;
}

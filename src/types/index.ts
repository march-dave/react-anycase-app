/**
 * 앱에서 사용하는 타입 정의
 */

export interface FoodAnalysisResult {
  foodName: string;
  calories: number;
  confidence: number;
  workoutTime: WorkoutTime;
}

export interface WorkoutTime {
  running: number;
  walking: number;
  cycling: number;
  swimming: number;
}

export interface FoodItem {
  name: string;
  avgCalories: number;
  keywords: string[];
}

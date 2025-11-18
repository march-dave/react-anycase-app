/**
 * 애플리케이션 타입 정의
 */

// 음식 항목 인터페이스
export interface FoodItem {
  name: string;
  calories: number;
  confidence: number;
}

// 운동 타입
export interface Exercise {
  name: string;
  caloriesPerMinute: number;
}

// 칼로리 분석 결과
export interface CalorieAnalysis {
  foodItems: FoodItem[];
  totalCalories: number;
  timestamp: Date;
  imageUri?: string;
}

// 운동 권장사항
export interface WorkoutRecommendation {
  exercise: Exercise;
  durationMinutes: number;
  totalCaloriesToBurn: number;
}

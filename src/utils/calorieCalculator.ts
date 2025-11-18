/**
 * 칼로리 계산 및 운동 시간 계산 유틸리티
 */

export interface FoodItem {
  foodName: string;
  calories: number;
}

export interface CalorieResult {
  foodName: string;
  calories: number;
  workoutMinutes: number;
}

/**
 * 운동 시간 계산 (칼로리를 소모하는데 필요한 시간)
 * 가정: 중간 강도 운동 시 분당 7칼로리 소모
 */
export const calculateWorkoutTime = (calories: number): number => {
  if (calories <= 0) {
    return 0;
  }
  const caloriesPerMinute = 7;
  return Math.ceil(calories / caloriesPerMinute);
};

/**
 * 음식 이미지 분석 시뮬레이션
 * 실제로는 AI/ML 모델을 사용해야 함
 */
export const analyzeFood = async (photoPath: string): Promise<CalorieResult> => {
  // 시뮬레이션 지연
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 예시 데이터
  const foods: FoodItem[] = [
    {foodName: 'Pizza Slice', calories: 285},
    {foodName: 'Hamburger', calories: 540},
    {foodName: 'Salad', calories: 150},
    {foodName: 'Fried Chicken', calories: 320},
    {foodName: 'Rice Bowl', calories: 380},
    {foodName: 'Sandwich', calories: 250},
    {foodName: 'Pasta', calories: 400},
    {foodName: 'Sushi Roll', calories: 200},
  ];

  const randomFood = foods[Math.floor(Math.random() * foods.length)];

  return {
    ...randomFood,
    workoutMinutes: calculateWorkoutTime(randomFood.calories),
  };
};

/**
 * 칼로리 유효성 검사
 */
export const isValidCalorie = (calories: number): boolean => {
  return calories >= 0 && calories <= 10000;
};

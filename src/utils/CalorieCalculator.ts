/**
 * 칼로리 계산 및 운동 시간 계산 유틸리티
 */

import type {FoodAnalysisResult, FoodItem, WorkoutTime} from '../types';

// 음식 데이터베이스 (간단한 예시)
const FOOD_DATABASE: FoodItem[] = [
  {name: 'Pizza', avgCalories: 285, keywords: ['pizza', 'pie', 'cheese']},
  {name: 'Burger', avgCalories: 540, keywords: ['burger', 'hamburger', 'beef']},
  {name: 'Pasta', avgCalories: 350, keywords: ['pasta', 'spaghetti', 'noodle']},
  {name: 'Salad', avgCalories: 150, keywords: ['salad', 'vegetable', 'greens']},
  {name: 'Rice Bowl', avgCalories: 400, keywords: ['rice', 'bowl', 'grain']},
  {name: 'Sandwich', avgCalories: 320, keywords: ['sandwich', 'bread', 'sub']},
  {name: 'Sushi', avgCalories: 250, keywords: ['sushi', 'roll', 'fish']},
  {name: 'Fried Chicken', avgCalories: 450, keywords: ['chicken', 'fried', 'crispy']},
  {name: 'Steak', avgCalories: 600, keywords: ['steak', 'beef', 'meat']},
  {name: 'Donut', avgCalories: 260, keywords: ['donut', 'doughnut', 'sweet']},
  {name: 'Ice Cream', avgCalories: 200, keywords: ['ice cream', 'dessert', 'frozen']},
  {name: 'Coffee', avgCalories: 5, keywords: ['coffee', 'espresso', 'latte']},
  {name: 'Smoothie', avgCalories: 180, keywords: ['smoothie', 'juice', 'fruit']},
  {name: 'Soup', avgCalories: 150, keywords: ['soup', 'broth', 'stew']},
  {name: 'Taco', avgCalories: 200, keywords: ['taco', 'tortilla', 'mexican']},
];

// 운동별 칼로리 소모율 (분당 kcal, 평균 체중 70kg 기준)
const EXERCISE_CALORIE_BURN: {[key: string]: number} = {
  running: 10.0, // 달리기 (8km/h)
  walking: 4.0, // 걷기 (5km/h)
  cycling: 7.5, // 자전거 (중간 강도)
  swimming: 8.0, // 수영 (중간 강도)
};

/**
 * 이미지를 분석하여 음식 종류와 칼로리를 추정
 * 실제로는 ML 모델을 사용하지만, 여기서는 시뮬레이션
 */
export const analyzeFood = async (
  imageUri: string,
): Promise<FoodAnalysisResult> => {
  // 시뮬레이션: 실제로는 ML 모델이나 API를 사용
  await new Promise(resolve => setTimeout(resolve, 1500));

  // 랜덤으로 음식 선택 (실제로는 이미지 분석 결과)
  const randomFood = FOOD_DATABASE[Math.floor(Math.random() * FOOD_DATABASE.length)];

  // 칼로리에 약간의 변동 추가 (±20%)
  const calorieVariation = 0.8 + Math.random() * 0.4;
  const estimatedCalories = Math.round(randomFood.avgCalories * calorieVariation);

  // 신뢰도 (80~95%)
  const confidence = 0.8 + Math.random() * 0.15;

  // 운동 시간 계산
  const workoutTime = calculateWorkoutTime(estimatedCalories);

  return {
    foodName: randomFood.name,
    calories: estimatedCalories,
    confidence: confidence,
    workoutTime: workoutTime,
  };
};

/**
 * 칼로리를 소모하기 위한 운동 시간 계산
 */
export const calculateWorkoutTime = (calories: number): WorkoutTime => {
  const workoutTime: WorkoutTime = {
    running: 0,
    walking: 0,
    cycling: 0,
    swimming: 0,
  };

  for (const [exercise, caloriesPerMinute] of Object.entries(
    EXERCISE_CALORIE_BURN,
  )) {
    workoutTime[exercise as keyof WorkoutTime] = Math.round(
      calories / caloriesPerMinute,
    );
  }

  return workoutTime;
};

/**
 * 특정 운동으로 칼로리를 소모하는데 필요한 시간 계산
 */
export const calculateTimeForExercise = (
  calories: number,
  exercise: keyof WorkoutTime,
): number => {
  const caloriesPerMinute = EXERCISE_CALORIE_BURN[exercise] || 5.0;
  return Math.round(calories / caloriesPerMinute);
};

/**
 * BMI 계산 (추가 기능)
 */
export const calculateBMI = (weightKg: number, heightCm: number): number => {
  const heightM = heightCm / 100;
  return Number((weightKg / (heightM * heightM)).toFixed(1));
};

/**
 * 일일 권장 칼로리 계산 (해리스-베네딕트 방정식)
 */
export const calculateDailyCalories = (
  gender: 'male' | 'female',
  weightKg: number,
  heightCm: number,
  age: number,
  activityLevel: number = 1.2, // 1.2 = sedentary
): number => {
  let bmr: number;

  if (gender === 'male') {
    bmr = 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age;
  } else {
    bmr = 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age;
  }

  return Math.round(bmr * activityLevel);
};

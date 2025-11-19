/**
 * 음식 분석 서비스
 * 이미지에서 음식을 식별하고 분석합니다.
 */

import {foodCalorieDatabase, getCaloriesForFood, CalorieResult} from '../utils/calorieCalculator';

export interface FoodAnalysisResult {
  foods: CalorieResult[];
  totalCalories: number;
  analysisTime: number;
}

// 데모용 음식 목록 (실제로는 ML 모델을 사용)
const demoFoods = [
  'pizza',
  'hamburger',
  'salad',
  'rice',
  'chicken',
  'apple',
  'banana',
  'sandwich',
  'pasta',
  'soup',
  'sushi',
  'ramen',
  'fish',
  'egg',
  'bread',
];

/**
 * 이미지에서 음식을 분석합니다.
 * 실제 앱에서는 TensorFlow Lite 또는 다른 ML 모델을 사용합니다.
 * @param imageUri 이미지 URI
 * @returns 분석 결과
 */
export async function analyzeFood(imageUri: string): Promise<FoodAnalysisResult> {
  // 분석 시작 시간 기록
  const startTime = Date.now();

  // 실제 앱에서는 여기서 ML 모델을 호출합니다.
  // 데모를 위해 랜덤 음식을 반환합니다.
  await simulateProcessingDelay();

  // 랜덤하게 1-3개의 음식 선택
  const numberOfFoods = Math.floor(Math.random() * 3) + 1;
  const selectedFoods: CalorieResult[] = [];

  for (let i = 0; i < numberOfFoods; i++) {
    const randomIndex = Math.floor(Math.random() * demoFoods.length);
    const foodName = demoFoods[randomIndex];

    // 랜덤 양 (50-300g)
    const servingSize = Math.floor(Math.random() * 250) + 50;
    const result = getCaloriesForFood(foodName, servingSize);

    selectedFoods.push(result);
  }

  const totalCalories = selectedFoods.reduce(
    (sum, food) => sum + food.totalCalories,
    0
  );

  const analysisTime = Date.now() - startTime;

  return {
    foods: selectedFoods,
    totalCalories,
    analysisTime,
  };
}

/**
 * 처리 지연을 시뮬레이션합니다.
 */
function simulateProcessingDelay(): Promise<void> {
  return new Promise(resolve => {
    const delay = Math.floor(Math.random() * 1000) + 500;
    setTimeout(resolve, delay);
  });
}

/**
 * 음식 이름을 기반으로 수동 분석을 수행합니다.
 * @param foodName 음식 이름
 * @param servingGrams 제공량
 * @returns 분석 결과
 */
export function analyzeManualEntry(
  foodName: string,
  servingGrams: number
): FoodAnalysisResult {
  const startTime = Date.now();
  const result = getCaloriesForFood(foodName, servingGrams);
  const analysisTime = Date.now() - startTime;

  return {
    foods: [result],
    totalCalories: result.totalCalories,
    analysisTime,
  };
}

/**
 * 사용 가능한 음식 목록을 반환합니다.
 * @returns 음식 이름 목록
 */
export function getAvailableFoods(): string[] {
  return Object.keys(foodCalorieDatabase).map(key =>
    key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  );
}

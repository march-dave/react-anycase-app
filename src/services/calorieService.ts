/**
 * CalorieService - 음식 분석 및 칼로리 계산 서비스
 * 실제 앱에서는 AI 기반 이미지 인식 API를 사용
 * 현재는 시뮬레이션된 데이터 반환
 */

import {FoodCalorieData} from '../types';

// 음식 칼로리 데이터베이스 (시뮬레이션용)
const foodDatabase: FoodCalorieData[] = [
  {name: 'Pizza Slice', calories: 285, servingSize: '1 slice'},
  {name: 'Hamburger', calories: 354, servingSize: '1 burger'},
  {name: 'Salad', calories: 152, servingSize: '1 bowl'},
  {name: 'Fried Rice', calories: 238, servingSize: '1 cup'},
  {name: 'Spaghetti', calories: 221, servingSize: '1 cup'},
  {name: 'Sushi Roll', calories: 200, servingSize: '6 pieces'},
  {name: 'Chicken Breast', calories: 165, servingSize: '100g'},
  {name: 'French Fries', calories: 365, servingSize: '1 serving'},
  {name: 'Ice Cream', calories: 207, servingSize: '1 cup'},
  {name: 'Apple', calories: 95, servingSize: '1 medium'},
  {name: 'Banana', calories: 105, servingSize: '1 medium'},
  {name: 'Orange', calories: 62, servingSize: '1 medium'},
  {name: 'Steak', calories: 271, servingSize: '100g'},
  {name: 'Sandwich', calories: 352, servingSize: '1 sandwich'},
  {name: 'Donut', calories: 195, servingSize: '1 donut'},
];

// 분석 결과 타입
interface AnalysisResult {
  foodName: string;
  calories: number;
}

/**
 * 음식 이미지를 분석하여 칼로리를 반환
 * @param imageUri 이미지 URI
 * @returns 분석 결과 (음식 이름과 칼로리)
 */
export const analyzeFood = async (imageUri: string): Promise<AnalysisResult> => {
  // 실제 앱에서는 여기서 AI 이미지 인식 API를 호출
  // 현재는 시뮬레이션을 위해 랜덤 음식 선택

  // 네트워크 지연 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 1500));

  // 랜덤 음식 선택
  const randomFood = foodDatabase[Math.floor(Math.random() * foodDatabase.length)];

  return {
    foodName: randomFood.name,
    calories: randomFood.calories,
  };
};

/**
 * 음식 이름으로 칼로리 조회
 * @param foodName 음식 이름
 * @returns 칼로리 또는 null
 */
export const getCaloriesByFoodName = (foodName: string): number | null => {
  const food = foodDatabase.find(
    item => item.name.toLowerCase() === foodName.toLowerCase(),
  );
  return food ? food.calories : null;
};

/**
 * 모든 음식 데이터 반환
 * @returns 음식 데이터 배열
 */
export const getAllFoods = (): FoodCalorieData[] => {
  return [...foodDatabase];
};

/**
 * 음식 데이터베이스에 새 항목 추가
 * @param food 추가할 음식 데이터
 */
export const addFood = (food: FoodCalorieData): void => {
  foodDatabase.push(food);
};

export default {
  analyzeFood,
  getCaloriesByFoodName,
  getAllFoods,
  addFood,
};

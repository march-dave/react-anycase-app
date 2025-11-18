/**
 * 칼로리 계산 서비스
 * 음식 이미지를 분석하여 칼로리를 추정합니다
 */

import {FoodItem, CalorieAnalysis} from '../types';

// 음식 칼로리 데이터베이스 (샘플 데이터)
const FOOD_CALORIE_DATABASE: Record<string, number> = {
  // 주식류
  'rice': 130,          // 밥 100g
  'bread': 265,         // 식빵 100g
  'pasta': 131,         // 파스타 100g
  'noodle': 138,        // 면 100g
  'pizza': 266,         // 피자 100g

  // 육류
  'chicken': 165,       // 닭가슴살 100g
  'beef': 250,          // 소고기 100g
  'pork': 242,          // 돼지고기 100g

  // 해산물
  'fish': 206,          // 생선 100g
  'shrimp': 99,         // 새우 100g
  'salmon': 208,        // 연어 100g

  // 야채
  'salad': 15,          // 샐러드 100g
  'vegetable': 25,      // 야채 100g
  'tomato': 18,         // 토마토 100g
  'broccoli': 34,       // 브로콜리 100g

  // 과일
  'apple': 52,          // 사과 100g
  'banana': 89,         // 바나나 100g
  'orange': 47,         // 오렌지 100g
  'strawberry': 32,     // 딸기 100g

  // 간식/음료
  'cake': 257,          // 케이크 100g
  'cookie': 502,        // 쿠키 100g
  'chocolate': 546,     // 초콜릿 100g
  'ice cream': 207,     // 아이스크림 100g
  'coffee': 1,          // 커피 100ml
  'juice': 45,          // 주스 100ml
  'soda': 41,           // 탄산음료 100ml

  // 기타
  'egg': 155,           // 계란 100g
  'cheese': 402,        // 치즈 100g
  'milk': 61,           // 우유 100ml
  'yogurt': 59,         // 요거트 100g
  'sandwich': 250,      // 샌드위치
  'burger': 295,        // 햄버거
  'hotdog': 290,        // 핫도그
  'fried chicken': 246, // 후라이드치킨 100g
};

// 일반 음식 추정치
const DEFAULT_CALORIE_ESTIMATE = 150;

/**
 * 이미지 레이블을 기반으로 음식 아이템 생성
 */
export function analyzeFoodFromLabels(labels: string[]): FoodItem[] {
  const foodItems: FoodItem[] = [];

  labels.forEach(label => {
    const normalizedLabel = label.toLowerCase().trim();

    // 데이터베이스에서 매칭되는 음식 찾기
    let calories = DEFAULT_CALORIE_ESTIMATE;
    let matchedName = label;

    // 부분 일치 검색
    for (const [foodName, foodCalories] of Object.entries(FOOD_CALORIE_DATABASE)) {
      if (normalizedLabel.includes(foodName) || foodName.includes(normalizedLabel)) {
        calories = foodCalories;
        matchedName = foodName;
        break;
      }
    }

    foodItems.push({
      name: matchedName,
      calories: calories,
      confidence: 0.7 + Math.random() * 0.3, // 0.7-1.0 신뢰도
    });
  });

  return foodItems;
}

/**
 * 전체 칼로리 분석 수행
 */
export function performCalorieAnalysis(
  labels: string[],
  imageUri?: string
): CalorieAnalysis {
  const foodItems = analyzeFoodFromLabels(labels);
  const totalCalories = foodItems.reduce((sum, item) => sum + item.calories, 0);

  return {
    foodItems,
    totalCalories: Math.round(totalCalories),
    timestamp: new Date(),
    imageUri,
  };
}

/**
 * 단일 음식 항목의 칼로리 조회
 */
export function getCaloriesForFood(foodName: string): number {
  const normalizedName = foodName.toLowerCase().trim();
  return FOOD_CALORIE_DATABASE[normalizedName] || DEFAULT_CALORIE_ESTIMATE;
}

/**
 * 칼로리 범위 추정 (최소-최대)
 */
export function estimateCalorieRange(calories: number): {min: number; max: number} {
  const variance = 0.2; // ±20% 오차 범위
  return {
    min: Math.round(calories * (1 - variance)),
    max: Math.round(calories * (1 + variance)),
  };
}

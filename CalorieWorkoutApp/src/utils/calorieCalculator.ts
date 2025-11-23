/**
 * 칼로리 계산 유틸리티
 * 음식 이미지를 기반으로 칼로리를 추정
 */

// 음식 타입 정의
export interface FoodItem {
  name: string;
  caloriesPerServing: number;
  servingSize: string;
}

// 일반적인 음식들의 칼로리 데이터베이스
export const FOOD_DATABASE: Record<string, FoodItem> = {
  // 밥류
  rice: { name: 'Rice', caloriesPerServing: 200, servingSize: '1 bowl (210g)' },
  friedRice: { name: 'Fried Rice', caloriesPerServing: 350, servingSize: '1 bowl (250g)' },

  // 면류
  ramen: { name: 'Ramen', caloriesPerServing: 380, servingSize: '1 bowl (300g)' },
  pasta: { name: 'Pasta', caloriesPerServing: 300, servingSize: '1 plate (200g)' },

  // 고기류
  chicken: { name: 'Chicken Breast', caloriesPerServing: 165, servingSize: '100g' },
  beef: { name: 'Beef', caloriesPerServing: 250, servingSize: '100g' },
  pork: { name: 'Pork', caloriesPerServing: 242, servingSize: '100g' },

  // 빵류
  bread: { name: 'Bread', caloriesPerServing: 80, servingSize: '1 slice' },
  croissant: { name: 'Croissant', caloriesPerServing: 231, servingSize: '1 piece' },

  // 패스트푸드
  burger: { name: 'Hamburger', caloriesPerServing: 540, servingSize: '1 burger' },
  pizza: { name: 'Pizza', caloriesPerServing: 285, servingSize: '1 slice' },
  fries: { name: 'French Fries', caloriesPerServing: 365, servingSize: 'Medium (117g)' },

  // 음료
  coke: { name: 'Coca Cola', caloriesPerServing: 140, servingSize: '355ml' },
  coffee: { name: 'Coffee (with sugar)', caloriesPerServing: 60, servingSize: '1 cup' },

  // 과일
  apple: { name: 'Apple', caloriesPerServing: 95, servingSize: '1 medium' },
  banana: { name: 'Banana', caloriesPerServing: 105, servingSize: '1 medium' },

  // 기타
  salad: { name: 'Salad', caloriesPerServing: 150, servingSize: '1 bowl' },
  sandwich: { name: 'Sandwich', caloriesPerServing: 300, servingSize: '1 sandwich' },
};

/**
 * 이미지 기반 칼로리 계산 (시뮬레이션)
 * 실제로는 ML 모델을 사용해야 하지만, 데모용으로 랜덤 음식 선택
 * @param imageUri 음식 이미지 URI
 * @returns 추정 칼로리
 */
export const calculateCaloriesFromImage = (imageUri: string): {
  calories: number;
  foodName: string;
  confidence: number;
} => {
  // 실제로는 ML 모델이 이미지를 분석해야 함
  // 데모용으로 랜덤하게 음식을 선택
  const foodKeys = Object.keys(FOOD_DATABASE);
  const randomKey = foodKeys[Math.floor(Math.random() * foodKeys.length)];
  const foodItem = FOOD_DATABASE[randomKey];

  // 신뢰도는 70-95% 사이로 시뮬레이션
  const confidence = 70 + Math.random() * 25;

  return {
    calories: foodItem.caloriesPerServing,
    foodName: foodItem.name,
    confidence: Math.round(confidence * 10) / 10,
  };
};

/**
 * 여러 음식 항목의 총 칼로리 계산
 * @param foodKeys 음식 키 배열
 * @returns 총 칼로리
 */
export const calculateTotalCalories = (foodKeys: string[]): number => {
  return foodKeys.reduce((total, key) => {
    const food = FOOD_DATABASE[key];
    return total + (food ? food.caloriesPerServing : 0);
  }, 0);
};

/**
 * 칼로리 범위에 따른 식사 분류
 * @param calories 칼로리
 * @returns 식사 크기 분류
 */
export const classifyMealSize = (calories: number): string => {
  if (calories < 100) return 'Snack';
  if (calories < 300) return 'Light Meal';
  if (calories < 500) return 'Regular Meal';
  if (calories < 800) return 'Large Meal';
  return 'Very Large Meal';
};

/**
 * 일일 권장 칼로리 대비 비율 계산
 * @param calories 섭취 칼로리
 * @param dailyTarget 일일 목표 칼로리 (기본값: 2000)
 * @returns 백분율
 */
export const calculateDailyPercentage = (
  calories: number,
  dailyTarget: number = 2000,
): number => {
  return Math.round((calories / dailyTarget) * 100 * 10) / 10;
};

/**
 * 칼로리 계산 유틸리티
 * 음식 이름을 기반으로 예상 칼로리를 계산합니다.
 */

// 음식별 칼로리 데이터베이스 (100g 기준)
export const foodCalorieDatabase: Record<string, number> = {
  // 과일
  apple: 52,
  banana: 89,
  orange: 47,
  grapes: 69,
  strawberry: 32,
  watermelon: 30,
  mango: 60,
  pineapple: 50,

  // 채소
  carrot: 41,
  broccoli: 34,
  spinach: 23,
  tomato: 18,
  cucumber: 16,
  lettuce: 15,
  potato: 77,
  corn: 86,

  // 고기
  chicken: 239,
  beef: 250,
  pork: 242,
  fish: 206,
  salmon: 208,
  tuna: 144,
  shrimp: 99,
  egg: 155,

  // 유제품
  milk: 42,
  cheese: 402,
  yogurt: 59,
  butter: 717,
  ice_cream: 207,

  // 곡물/탄수화물
  rice: 130,
  bread: 265,
  pasta: 131,
  noodles: 138,
  cereal: 379,
  oatmeal: 68,

  // 패스트푸드
  pizza: 266,
  hamburger: 295,
  french_fries: 312,
  hot_dog: 290,
  sandwich: 250,

  // 음료
  coffee: 2,
  tea: 1,
  juice: 45,
  soda: 41,
  beer: 43,

  // 디저트
  cake: 257,
  cookie: 488,
  chocolate: 546,
  donut: 452,
  candy: 394,

  // 기타
  soup: 50,
  salad: 20,
  fried_rice: 163,
  sushi: 150,
  ramen: 436,
};

export interface CalorieResult {
  foodName: string;
  calories: number;
  servingSize: number;
  totalCalories: number;
  confidence: number;
}

/**
 * 음식 이름으로 칼로리 정보를 가져옵니다.
 * @param foodName 음식 이름
 * @param servingGrams 제공량 (그램)
 * @returns 칼로리 결과
 */
export function getCaloriesForFood(
  foodName: string,
  servingGrams: number = 100
): CalorieResult {
  const normalizedName = foodName.toLowerCase().replace(/\s+/g, '_');

  // 정확한 매칭 시도
  let caloriesPer100g = foodCalorieDatabase[normalizedName];
  let confidence = 1.0;

  // 부분 매칭 시도
  if (!caloriesPer100g) {
    const matchedKey = Object.keys(foodCalorieDatabase).find(key =>
      normalizedName.includes(key) || key.includes(normalizedName)
    );

    if (matchedKey) {
      caloriesPer100g = foodCalorieDatabase[matchedKey];
      confidence = 0.7;
    } else {
      // 기본값 사용
      caloriesPer100g = 150;
      confidence = 0.3;
    }
  }

  const totalCalories = Math.round((caloriesPer100g * servingGrams) / 100);

  return {
    foodName,
    calories: caloriesPer100g,
    servingSize: servingGrams,
    totalCalories,
    confidence,
  };
}

/**
 * 여러 음식의 총 칼로리를 계산합니다.
 * @param foods 음식 목록과 양
 * @returns 총 칼로리
 */
export function calculateTotalCalories(
  foods: Array<{name: string; grams: number}>
): number {
  return foods.reduce((total, food) => {
    const result = getCaloriesForFood(food.name, food.grams);
    return total + result.totalCalories;
  }, 0);
}

/**
 * 일일 권장 칼로리 대비 비율을 계산합니다.
 * @param calories 섭취 칼로리
 * @param dailyGoal 일일 목표 칼로리 (기본값: 2000)
 * @returns 비율 (0-100+)
 */
export function calculateDailyPercentage(
  calories: number,
  dailyGoal: number = 2000
): number {
  return Math.round((calories / dailyGoal) * 100);
}

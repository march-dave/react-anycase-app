/**
 * 칼로리 계산 유틸리티
 */

export interface ExerciseTime {
  running: number;  // 러닝 시간 (분)
  walking: number;  // 걷기 시간 (분)
  cycling: number;  // 자전거 시간 (분)
}

/**
 * 칼로리를 기반으로 필요한 운동 시간을 계산합니다
 * @param calories 음식 칼로리 (kcal)
 * @returns 운동 종류별 필요 시간 (분)
 */
export function calculateExerciseTime(calories: number): ExerciseTime {
  // 평균 칼로리 소모율 (kcal/분)
  const RUNNING_RATE = 10;   // 러닝: 분당 약 10 kcal
  const WALKING_RATE = 5;    // 걷기: 분당 약 5 kcal
  const CYCLING_RATE = 8;    // 자전거: 분당 약 8 kcal

  return {
    running: Math.ceil(calories / RUNNING_RATE),
    walking: Math.ceil(calories / WALKING_RATE),
    cycling: Math.ceil(calories / CYCLING_RATE),
  };
}

/**
 * 이미지 URI를 기반으로 칼로리를 추정합니다
 * (실제로는 AI API를 사용해야 하지만, 여기서는 시뮬레이션)
 * @param imageUri 이미지 URI
 * @returns 추정 칼로리 (kcal)
 */
export function estimateCalories(imageUri: string): number {
  // 실제 구현에서는 이미지 분석 AI API를 호출해야 합니다
  // 예: Google Cloud Vision API, AWS Rekognition, 또는 전문 음식 인식 API

  // 시뮬레이션: 200-1000 kcal 범위의 랜덤 값
  const minCalories = 200;
  const maxCalories = 1000;
  return Math.floor(Math.random() * (maxCalories - minCalories + 1)) + minCalories;
}

/**
 * 칼로리 값이 유효한지 검증합니다
 * @param calories 칼로리 값
 * @returns 유효 여부
 */
export function isValidCalories(calories: number): boolean {
  return calories > 0 && calories <= 5000 && Number.isFinite(calories);
}

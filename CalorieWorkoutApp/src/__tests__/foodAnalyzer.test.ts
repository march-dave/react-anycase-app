/**
 * 음식 분석기 유닛 테스트
 */

import {
  analyzeFood,
  analyzeManualEntry,
  getAvailableFoods,
} from '../services/foodAnalyzer';

describe('foodAnalyzer', () => {
  describe('analyzeFood', () => {
    // 분석 결과 반환 테스트
    it('should return analysis result', async () => {
      const result = await analyzeFood('demo://test-image');

      expect(result).toBeDefined();
      expect(result.foods).toBeDefined();
      expect(result.totalCalories).toBeDefined();
      expect(result.analysisTime).toBeDefined();
    });

    // 최소 하나의 음식 감지 테스트
    it('should detect at least one food', async () => {
      const result = await analyzeFood('demo://test-image');

      expect(result.foods.length).toBeGreaterThan(0);
    });

    // 총 칼로리 계산 테스트
    it('should calculate total calories correctly', async () => {
      const result = await analyzeFood('demo://test-image');

      const manualTotal = result.foods.reduce(
        (sum, food) => sum + food.totalCalories,
        0,
      );

      expect(result.totalCalories).toBe(manualTotal);
    });

    // 분석 시간 기록 테스트
    it('should record analysis time', async () => {
      const result = await analyzeFood('demo://test-image');

      expect(result.analysisTime).toBeGreaterThan(0);
    });

    // 음식 데이터 형식 테스트
    it('should return food with correct format', async () => {
      const result = await analyzeFood('demo://test-image');

      result.foods.forEach(food => {
        expect(food).toHaveProperty('foodName');
        expect(food).toHaveProperty('calories');
        expect(food).toHaveProperty('servingSize');
        expect(food).toHaveProperty('totalCalories');
        expect(food).toHaveProperty('confidence');
      });
    });
  });

  describe('analyzeManualEntry', () => {
    // 수동 입력 분석 테스트
    it('should analyze manually entered food', () => {
      const result = analyzeManualEntry('apple', 150);

      expect(result.foods.length).toBe(1);
      expect(result.foods[0].foodName).toBe('apple');
      expect(result.foods[0].servingSize).toBe(150);
    });

    // 총 칼로리 계산 테스트
    it('should calculate total calories', () => {
      const result = analyzeManualEntry('rice', 200);

      // rice: 130kcal per 100g, 200g = 260kcal
      expect(result.totalCalories).toBe(260);
    });

    // 분석 시간 기록 테스트
    it('should record analysis time', () => {
      const result = analyzeManualEntry('pizza', 100);

      expect(result.analysisTime).toBeDefined();
      expect(result.analysisTime).toBeGreaterThanOrEqual(0);
    });

    // 알 수 없는 음식 처리 테스트
    it('should handle unknown food', () => {
      const result = analyzeManualEntry('unknown_xyz', 100);

      expect(result.foods[0].confidence).toBeLessThan(1);
    });
  });

  describe('getAvailableFoods', () => {
    // 음식 목록 반환 테스트
    it('should return list of available foods', () => {
      const foods = getAvailableFoods();

      expect(Array.isArray(foods)).toBe(true);
      expect(foods.length).toBeGreaterThan(0);
    });

    // 음식 이름 형식 테스트 (첫 글자 대문자)
    it('should format food names with capitalized words', () => {
      const foods = getAvailableFoods();

      foods.forEach(food => {
        // 각 단어의 첫 글자가 대문자인지 확인
        const words = food.split(' ');
        words.forEach(word => {
          expect(word[0]).toBe(word[0].toUpperCase());
        });
      });
    });

    // 언더스코어가 공백으로 변환되는지 테스트
    it('should replace underscores with spaces', () => {
      const foods = getAvailableFoods();

      foods.forEach(food => {
        expect(food).not.toContain('_');
      });
    });
  });
});

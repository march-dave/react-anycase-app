/**
 * imageAnalyzer 유틸리티 유닛 테스트
 */

import {analyzeImage, isValidImageUri} from '../utils/imageAnalyzer';

describe('imageAnalyzer', () => {
  describe('analyzeImage', () => {
    it('이미지 URI를 받아 음식 라벨 배열을 반환해야 함', async () => {
      const result = await analyzeImage('file:///test.jpg');

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('유효한 라벨을 반환해야 함', async () => {
      const result = await analyzeImage('file:///test.jpg');

      result.forEach(label => {
        expect(typeof label).toBe('string');
        expect(label.length).toBeGreaterThan(0);
      });
    });

    it('비동기로 동작해야 함', async () => {
      const promise = analyzeImage('file:///test.jpg');

      expect(promise).toBeInstanceOf(Promise);

      const result = await promise;
      expect(result).toBeDefined();
    });
  });

  describe('isValidImageUri', () => {
    it('유효한 이미지 URI에 대해 true를 반환해야 함', () => {
      expect(isValidImageUri('file:///test.jpg')).toBe(true);
      expect(isValidImageUri('file:///test.jpeg')).toBe(true);
      expect(isValidImageUri('file:///test.png')).toBe(true);
      expect(isValidImageUri('file:///test.gif')).toBe(true);
      expect(isValidImageUri('file:///test.webp')).toBe(true);
    });

    it('대소문자를 무시해야 함', () => {
      expect(isValidImageUri('file:///test.JPG')).toBe(true);
      expect(isValidImageUri('file:///test.PNG')).toBe(true);
    });

    it('유효하지 않은 URI에 대해 false를 반환해야 함', () => {
      expect(isValidImageUri('file:///test.txt')).toBe(false);
      expect(isValidImageUri('file:///test.pdf')).toBe(false);
      expect(isValidImageUri('')).toBe(false);
    });

    it('빈 문자열에 대해 false를 반환해야 함', () => {
      expect(isValidImageUri('')).toBe(false);
    });
  });
});

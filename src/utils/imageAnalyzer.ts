/**
 * 이미지 분석 유틸리티
 * ML Kit을 사용한 이미지 라벨링
 */

// 실제 환경에서는 ML Kit을 사용하지만,
// 여기서는 시뮬레이션된 결과를 반환합니다

/**
 * 이미지에서 음식 라벨 추출
 */
export async function analyzeImage(imageUri: string): Promise<string[]> {
  // 실제 앱에서는 ML Kit Image Labeling을 사용:
  // const labels = await ImageLabeler.label(imageUri);
  // return labels.map(label => label.text);

  // 시뮬레이션을 위한 더미 데이터
  return new Promise(resolve => {
    setTimeout(() => {
      // 랜덤 음식 라벨 생성
      const possibleLabels = [
        ['rice', 'chicken', 'vegetable'],
        ['pizza', 'cheese'],
        ['burger', 'bread'],
        ['salad', 'tomato', 'vegetable'],
        ['pasta', 'sauce'],
        ['sandwich', 'bread', 'cheese'],
        ['fish', 'rice'],
        ['noodle', 'vegetable'],
        ['cake', 'chocolate'],
        ['apple', 'banana'],
        ['coffee', 'milk'],
        ['egg', 'bread'],
        ['fried chicken', 'potato'],
      ];

      const randomLabels =
        possibleLabels[Math.floor(Math.random() * possibleLabels.length)];
      resolve(randomLabels);
    }, 1500); // 1.5초 지연 (분석 시뮬레이션)
  });
}

/**
 * 이미지 URI 유효성 검사
 */
export function isValidImageUri(uri: string): boolean {
  if (!uri) {
    return false;
  }

  // 이미지 확장자 체크
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
  const lowerUri = uri.toLowerCase();

  return imageExtensions.some(ext => lowerUri.includes(ext));
}

/**
 * 이미지 분석 전 전처리
 */
export async function preprocessImage(imageUri: string): Promise<string> {
  // 실제 앱에서는 이미지 리사이징, 압축 등을 수행
  // 여기서는 URI를 그대로 반환
  return imageUri;
}

/**
 * App 컴포넌트 유닛 테스트
 */

import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../../App';

// Mock 모듈
jest.mock('../components/CameraScreen', () => ({
  CameraScreen: () => null,
}));

jest.mock('../components/ResultScreen', () => ({
  ResultScreen: () => null,
}));

describe('App', () => {
  it('에러 없이 렌더링되어야 함', () => {
    const {toJSON} = render(<App />);
    expect(toJSON()).toBeTruthy();
  });

  it('초기 상태에서 CameraScreen을 표시해야 함', () => {
    const {UNSAFE_getByType} = render(<App />);
    const CameraScreen = require('../components/CameraScreen').CameraScreen;

    expect(() => UNSAFE_getByType(CameraScreen)).not.toThrow();
  });
});

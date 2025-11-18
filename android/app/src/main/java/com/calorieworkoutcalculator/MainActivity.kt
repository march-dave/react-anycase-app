package com.calorieworkoutcalculator

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

/**
 * 메인 액티비티
 * 칼로리 및 운동 계산 앱
 */
class MainActivity : ReactActivity() {

  /**
   * React Native가 렌더링할 메인 컴포넌트의 이름을 반환합니다.
   */
  override fun getMainComponentName(): String = "CalorieWorkoutCalculator"

  /**
   * ReactActivityDelegate를 생성합니다.
   * 새로운 아키텍처를 활성화하려면 fabricEnabled를 사용합니다.
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}

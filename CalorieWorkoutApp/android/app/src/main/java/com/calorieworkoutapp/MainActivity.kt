package com.calorieworkoutapp

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

/**
 * 메인 액티비티 - React Native 진입점
 */
class MainActivity : ReactActivity() {

  /**
   * React Native 앱의 메인 컴포넌트 이름을 반환합니다.
   * 이것은 JavaScript 번들에 등록된 컴포넌트 이름과 일치해야 합니다.
   */
  override fun getMainComponentName(): String = "CalorieWorkoutApp"

  /**
   * ReactActivityDelegate를 생성하여 반환합니다.
   * Fabric (새 아키텍처)를 활성화하거나 비활성화할 수 있습니다.
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}

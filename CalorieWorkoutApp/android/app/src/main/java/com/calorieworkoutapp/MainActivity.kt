package com.calorieworkoutapp

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

/**
 * 메인 액티비티 - React Native 앱의 진입점
 */
class MainActivity : ReactActivity() {

    /**
     * JavaScript에서 등록된 메인 컴포넌트 이름 반환
     */
    override fun getMainComponentName(): String = "CalorieWorkoutApp"

    /**
     * ReactActivityDelegate 반환
     * 새로운 아키텍처 지원을 위한 설정 포함
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}

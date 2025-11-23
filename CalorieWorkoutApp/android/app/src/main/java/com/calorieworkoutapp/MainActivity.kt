package com.calorieworkoutapp

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

/**
 * MainActivity
 * React Native 앱의 메인 액티비티
 */
class MainActivity : ReactActivity() {

    /**
     * 앱 이름을 반환
     */
    override fun getMainComponentName(): String = "CalorieWorkoutApp"

    /**
     * React Activity Delegate를 생성
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}

/**
 * 칼로리 운동 앱 - 메인 애플리케이션
 * 사진을 찍어 칼로리를 계산하고 운동 시간을 추천합니다.
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import CameraScreen from './src/screens/CameraScreen';
import ResultScreen from './src/screens/ResultScreen';

// 네비게이션 타입 정의
export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Result: {
    analysisResult: {
      foods: Array<{
        foodName: string;
        calories: number;
        servingSize: number;
        totalCalories: number;
        confidence: number;
      }>;
      totalCalories: number;
      analysisTime: number;
    };
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#388E3C"
      />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

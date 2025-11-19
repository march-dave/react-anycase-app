/**
 * CalorieWorkoutApp - 음식 사진으로 칼로리를 계산하고 운동 시간을 알려주는 앱
 * Main App Component
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import ResultScreen from './screens/ResultScreen';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Calorie Workout'}}
        />
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{title: 'Take Photo'}}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{title: 'Results'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

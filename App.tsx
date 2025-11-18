/**
 * 메인 애플리케이션 컴포넌트
 * Calorie Workout App - 칼로리 계산 및 운동 시간 추천 앱
 */

import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import {CameraScreen} from './src/components/CameraScreen';
import {ResultScreen} from './src/components/ResultScreen';
import {CalorieAnalysis, WorkoutRecommendation} from './src/types';
import {performCalorieAnalysis} from './src/services/CalorieCalculator';
import {calculateAllWorkoutRecommendations} from './src/services/WorkoutCalculator';
import {analyzeImage} from './src/utils/imageAnalyzer';

type AppState = 'camera' | 'analyzing' | 'results';

function App(): React.JSX.Element {
  const [appState, setAppState] = useState<AppState>('camera');
  const [analysis, setAnalysis] = useState<CalorieAnalysis | null>(null);
  const [workoutRecommendations, setWorkoutRecommendations] = useState<
    WorkoutRecommendation[]
  >([]);

  /**
   * 이미지 촬영/선택 후 처리
   */
  const handleImageCaptured = useCallback(async (imageUri: string) => {
    setAppState('analyzing');

    try {
      // 1. 이미지 분석 (ML Kit 라벨링)
      const labels = await analyzeImage(imageUri);

      // 2. 칼로리 계산
      const calorieAnalysis = performCalorieAnalysis(labels, imageUri);
      setAnalysis(calorieAnalysis);

      // 3. 운동 권장사항 계산
      const recommendations = calculateAllWorkoutRecommendations(
        calorieAnalysis.totalCalories
      );
      setWorkoutRecommendations(recommendations);

      // 4. 결과 화면으로 전환
      setAppState('results');
    } catch (error) {
      console.error('Analysis error:', error);
      // 에러 발생 시 카메라 화면으로 복귀
      setAppState('camera');
    }
  }, []);

  /**
   * 다시 시작
   */
  const handleReset = useCallback(() => {
    setAnalysis(null);
    setWorkoutRecommendations([]);
    setAppState('camera');
  }, []);

  /**
   * 분석 중 화면 렌더링
   */
  const renderAnalyzingScreen = () => (
    <View style={styles.analyzingContainer}>
      <Text style={styles.analyzingTitle}>Analyzing Image...</Text>
      <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
      <Text style={styles.analyzingText}>
        Detecting food items and calculating calories
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />

      {appState === 'camera' && (
        <CameraScreen onImageCaptured={handleImageCaptured} />
      )}

      {appState === 'analyzing' && renderAnalyzingScreen()}

      {appState === 'results' && analysis && (
        <ResultScreen
          analysis={analysis}
          workoutRecommendations={workoutRecommendations}
          onReset={handleReset}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  analyzingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  analyzingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  loader: {
    marginVertical: 30,
  },
  analyzingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default App;

/**
 * Calorie Workout App
 * 사진을 찍으면 칼로리를 계산하고 운동 시간을 계산해주는 앱
 */

import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Camera, useCameraDevice, useCameraPermission} from 'react-native-vision-camera';

interface CalorieResult {
  foodName: string;
  calories: number;
  workoutMinutes: number;
}

function App(): React.JSX.Element {
  const [result, setResult] = useState<CalorieResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();

  // 칼로리 계산 함수 (실제로는 AI 모델을 사용해야 함)
  const analyzeFood = async (photoPath: string): Promise<CalorieResult> => {
    // 시뮬레이션: 실제로는 AI/ML 모델을 사용하여 음식 인식 및 칼로리 계산
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 예시 데이터
    const foods = [
      {foodName: 'Pizza Slice', calories: 285},
      {foodName: 'Hamburger', calories: 540},
      {foodName: 'Salad', calories: 150},
      {foodName: 'Fried Chicken', calories: 320},
      {foodName: 'Rice Bowl', calories: 380},
    ];

    const randomFood = foods[Math.floor(Math.random() * foods.length)];

    return {
      ...randomFood,
      workoutMinutes: calculateWorkoutTime(randomFood.calories),
    };
  };

  // 운동 시간 계산 (칼로리를 소모하는데 필요한 시간)
  // 가정: 중간 강도 운동 시 분당 7칼로리 소모
  const calculateWorkoutTime = (calories: number): number => {
    const caloriesPerMinute = 7;
    return Math.ceil(calories / caloriesPerMinute);
  };

  // 사진 촬영
  const takePhoto = async () => {
    if (!camera.current) return;

    try {
      setIsAnalyzing(true);
      const photo = await camera.current.takePhoto({
        flash: 'off',
      });

      setShowCamera(false);

      // 칼로리 분석
      const analysisResult = await analyzeFood(photo.path);
      setResult(analysisResult);
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 카메라 열기
  const openCamera = async () => {
    if (!hasPermission) {
      const granted = await requestPermission();
      if (!granted) {
        Alert.alert('Permission Denied', 'Camera permission is required');
        return;
      }
    }
    setShowCamera(true);
  };

  // 카메라 화면
  if (showCamera) {
    if (!device) {
      return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.errorText}>Camera device not available</Text>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.fullScreen}>
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={showCamera}
          photo={true}
        />
        <View style={styles.cameraControls}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setShowCamera(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={takePhoto}
            disabled={isAnalyzing}>
            {isAnalyzing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <View style={styles.captureButtonInner} />
            )}
          </TouchableOpacity>
          <View style={styles.placeholder} />
        </View>
      </SafeAreaView>
    );
  }

  // 메인 화면
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Calorie Workout App</Text>
          <Text style={styles.subtitle}>
            Take a photo of your food to calculate calories and workout time
          </Text>
        </View>

        <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
          <Text style={styles.cameraButtonText}>📷 Take Photo</Text>
        </TouchableOpacity>

        {isAnalyzing && (
          <View style={styles.analyzingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.analyzingText}>Analyzing food...</Text>
          </View>
        )}

        {result && !isAnalyzing && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Analysis Result</Text>

            <View style={styles.resultCard}>
              <Text style={styles.foodName}>{result.foodName}</Text>

              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Calories:</Text>
                <Text style={styles.resultValue}>{result.calories} kcal</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Workout Time:</Text>
                <Text style={styles.resultValue}>{result.workoutMinutes} minutes</Text>
              </View>

              <Text style={styles.workoutNote}>
                💪 You need approximately {result.workoutMinutes} minutes of
                moderate-intensity exercise to burn these calories
              </Text>
            </View>

            <TouchableOpacity
              style={styles.retakeButton}
              onPress={() => {
                setResult(null);
                openCamera();
              }}>
              <Text style={styles.retakeButtonText}>Take Another Photo</Text>
            </TouchableOpacity>
          </View>
        )}

        {!result && !isAnalyzing && (
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsTitle}>How it works:</Text>
            <Text style={styles.instructionItem}>1. Tap "Take Photo" button</Text>
            <Text style={styles.instructionItem}>2. Take a photo of your food</Text>
            <Text style={styles.instructionItem}>3. Get calorie count instantly</Text>
            <Text style={styles.instructionItem}>
              4. See how long you need to exercise
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  fullScreen: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  cameraButton: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cameraButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
  },
  analyzingContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  analyzingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  resultContainer: {
    marginTop: 10,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  resultCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  foodName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  resultLabel: {
    fontSize: 18,
    color: '#666',
  },
  resultValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  workoutNote: {
    marginTop: 15,
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  retakeButton: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  retakeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  instructionsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginTop: 10,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  instructionItem: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
    lineHeight: 24,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
  },
  placeholder: {
    width: 80,
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default App;

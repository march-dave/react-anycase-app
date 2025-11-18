/**
 * 칼로리 및 운동 계산 앱 메인 컴포넌트
 * 사진을 찍으면 칼로리를 계산하고 필요한 운동 시간을 알려줍니다
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';

interface CalorieResult {
  foodName: string;
  calories: number;
  workoutMinutes: number;
}

function App(): React.JSX.Element {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [result, setResult] = useState<CalorieResult | null>(null);

  // 카메라 권한 요청
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs camera access to take photos of food',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // 사진 촬영 (임시로 시뮬레이션)
  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();

    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Camera permission is required to take photos');
      return;
    }

    // TODO: 실제 카메라 기능 구현
    // 현재는 데모를 위해 샘플 데이터 사용
    Alert.alert(
      'Camera Feature',
      'Camera will be implemented with react-native-vision-camera',
      [
        {
          text: 'Use Sample Data',
          onPress: () => {
            setImageUri('sample');
            calculateCalories();
          },
        },
        {text: 'Cancel', style: 'cancel'},
      ],
    );
  };

  // 칼로리 계산 (샘플 구현)
  const calculateCalories = () => {
    // TODO: 실제 AI/ML 모델을 사용한 칼로리 계산 구현
    // 현재는 데모용 샘플 데이터
    const sampleFoods = [
      {foodName: 'Hamburger', calories: 540},
      {foodName: 'Pizza Slice', calories: 285},
      {foodName: 'Salad', calories: 150},
      {foodName: 'Fried Chicken', calories: 450},
      {foodName: 'Sushi Roll', calories: 300},
    ];

    const randomFood = sampleFoods[Math.floor(Math.random() * sampleFoods.length)];

    // 운동 시간 계산 (분당 약 8칼로리 소모 기준)
    const workoutMinutes = Math.ceil(randomFood.calories / 8);

    setResult({
      ...randomFood,
      workoutMinutes,
    });
  };

  // 결과 초기화
  const reset = () => {
    setImageUri(null);
    setResult(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Calorie & Workout Calculator</Text>
          <Text style={styles.subtitle}>Take a photo to analyze calories</Text>
        </View>

        <View style={styles.content}>
          {imageUri ? (
            <View style={styles.imageContainer}>
              <View style={styles.imagePlaceholder}>
                <Text style={styles.placeholderText}>Photo Captured</Text>
              </View>
            </View>
          ) : (
            <View style={styles.cameraPlaceholder}>
              <Text style={styles.placeholderText}>No photo taken yet</Text>
              <Text style={styles.placeholderSubtext}>Tap the button below to take a photo</Text>
            </View>
          )}

          {result && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>Analysis Result</Text>

              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Food Detected:</Text>
                <Text style={styles.resultValue}>{result.foodName}</Text>
              </View>

              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Estimated Calories:</Text>
                <Text style={styles.calorieValue}>{result.calories} kcal</Text>
              </View>

              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Recommended Workout Time:</Text>
                <Text style={styles.workoutValue}>{result.workoutMinutes} minutes</Text>
                <Text style={styles.workoutSubtext}>
                  (Based on moderate-intensity exercise)
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          {!imageUri ? (
            <TouchableOpacity style={styles.primaryButton} onPress={takePhoto}>
              <Text style={styles.primaryButtonText}>Take Photo</Text>
            </TouchableOpacity>
          ) : (
            <>
              {!result && (
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={calculateCalories}>
                  <Text style={styles.primaryButtonText}>Calculate Calories</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={reset}>
                <Text style={styles.secondaryButtonText}>Take New Photo</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    marginBottom: 20,
  },
  cameraPlaceholder: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 250,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  imageContainer: {
    marginBottom: 20,
  },
  imagePlaceholder: {
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 250,
    borderWidth: 2,
    borderColor: '#4caf50',
  },
  placeholderText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  calorieValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff6b6b',
  },
  workoutValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  workoutSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#2196f3',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2196f3',
  },
  secondaryButtonText: {
    color: '#2196f3',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;

/**
 * Calorie Workout App
 * 사진을 찍으면 칼로리를 계산하고 운동 시간을 계산해주는 앱
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {analyzeFood, calculateWorkoutTime} from './src/utils/CalorieCalculator';
import type {FoodAnalysisResult} from './src/types';

function App(): React.JSX.Element {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<FoodAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // 카메라로 사진 찍기
  const handleTakePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        quality: 0.8,
        saveToPhotos: true,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Camera error');
        } else if (response.assets && response.assets[0]) {
          const uri = response.assets[0].uri;
          if (uri) {
            setImageUri(uri);
            analyzeImage(uri);
          }
        }
      },
    );
  };

  // 갤러리에서 사진 선택
  const handlePickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Image picker error');
        } else if (response.assets && response.assets[0]) {
          const uri = response.assets[0].uri;
          if (uri) {
            setImageUri(uri);
            analyzeImage(uri);
          }
        }
      },
    );
  };

  // 이미지 분석 (칼로리 계산)
  const analyzeImage = async (uri: string) => {
    setIsAnalyzing(true);
    try {
      // 음식 분석 및 칼로리 계산
      const result = await analyzeFood(uri);
      setAnalysisResult(result);
    } catch (error) {
      Alert.alert('Error', 'Failed to analyze image');
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 결과 초기화
  const handleReset = () => {
    setImageUri(null);
    setAnalysisResult(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Calorie Workout Tracker</Text>
          <Text style={styles.subtitle}>
            Take a photo to calculate calories and workout time
          </Text>
        </View>

        {/* 버튼 영역 */}
        {!imageUri && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleTakePhoto}>
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handlePickImage}>
              <Text style={styles.buttonText}>Choose from Gallery</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* 이미지 표시 */}
        {imageUri && (
          <View style={styles.imageContainer}>
            <Image source={{uri: imageUri}} style={styles.image} />
          </View>
        )}

        {/* 분석 중 표시 */}
        {isAnalyzing && (
          <View style={styles.analyzingContainer}>
            <Text style={styles.analyzingText}>Analyzing food...</Text>
          </View>
        )}

        {/* 분석 결과 표시 */}
        {analysisResult && !isAnalyzing && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Analysis Result</Text>

            <View style={styles.resultCard}>
              <Text style={styles.foodName}>{analysisResult.foodName}</Text>
              <Text style={styles.confidence}>
                Confidence: {(analysisResult.confidence * 100).toFixed(1)}%
              </Text>

              <View style={styles.divider} />

              <View style={styles.calorieRow}>
                <Text style={styles.label}>Estimated Calories:</Text>
                <Text style={styles.calorieValue}>
                  {analysisResult.calories} kcal
                </Text>
              </View>

              <View style={styles.divider} />

              <Text style={styles.workoutTitle}>Required Workout Time:</Text>

              {Object.entries(analysisResult.workoutTime).map(
                ([exercise, minutes]) => (
                  <View key={exercise} style={styles.workoutRow}>
                    <Text style={styles.exerciseName}>
                      {exercise.charAt(0).toUpperCase() + exercise.slice(1)}:
                    </Text>
                    <Text style={styles.exerciseTime}>{minutes} minutes</Text>
                  </View>
                ),
              )}
            </View>

            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.buttonText}>Take Another Photo</Text>
            </TouchableOpacity>
          </View>
        )}
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
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 15,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  secondaryButton: {
    backgroundColor: '#34C759',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  resetButton: {
    backgroundColor: '#FF9500',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    marginVertical: 20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  analyzingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  analyzingText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  resultContainer: {
    marginTop: 10,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  foodName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  confidence: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 15,
  },
  calorieRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  calorieValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF3B30',
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  workoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  exerciseTime: {
    fontSize: 15,
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default App;

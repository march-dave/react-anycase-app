/**
 * Calorie & Workout Calculator App
 * 사진을 찍으면 칼로리를 계산하고 운동 시간을 추천하는 앱
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
  FlatList,
} from 'react-native';
import {calculateCaloriesFromImage} from './src/utils/calorieCalculator';
import {
  getRecommendedWorkouts,
  formatWorkoutTime,
} from './src/utils/workoutCalculator';

interface WorkoutRecommendation {
  key: string;
  time: number;
  workout: {
    name: string;
    intensity: string;
    description: string;
  };
}

function App(): React.JSX.Element {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [calories, setCalories] = useState<number>(0);
  const [foodName, setFoodName] = useState<string>('');
  const [confidence, setConfidence] = useState<number>(0);
  const [workoutRecommendations, setWorkoutRecommendations] = useState<
    WorkoutRecommendation[]
  >([]);

  // 카메라로 사진 촬영 시뮬레이션
  const takePhoto = async () => {
    // TODO: 실제 카메라 기능 구현
    // 지금은 데모용으로 시뮬레이션된 이미지 URI 사용
    const simulatedImageUri = `demo-image-${Date.now()}`;

    // 칼로리 계산
    const result = calculateCaloriesFromImage(simulatedImageUri);

    // 상태 업데이트
    setImageUri(simulatedImageUri);
    setCalories(result.calories);
    setFoodName(result.foodName);
    setConfidence(result.confidence);

    // 운동 추천 계산
    const recommendations = getRecommendedWorkouts(result.calories, 5);
    setWorkoutRecommendations(recommendations);

    Alert.alert(
      'Food Detected!',
      `Detected: ${result.foodName}\nCalories: ${result.calories} kcal\nConfidence: ${result.confidence}%`,
    );
  };

  const handleTakePhoto = () => {
    takePhoto();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Calorie & Workout Calculator</Text>
          <Text style={styles.subtitle}>Take a photo to calculate calories</Text>
        </View>

        <View style={styles.content}>
          {imageUri ? (
            <View style={styles.imageContainer}>
              <Image source={{uri: imageUri}} style={styles.image} />
            </View>
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>No photo taken yet</Text>
            </View>
          )}

          <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>

          {calories > 0 && (
            <View style={styles.resultsContainer}>
              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Detected Food</Text>
                <Text style={styles.resultValue}>{foodName}</Text>
                <Text style={styles.resultNote}>
                  Confidence: {confidence}%
                </Text>
              </View>

              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Estimated Calories</Text>
                <Text style={styles.resultValue}>{calories} kcal</Text>
              </View>

              <View style={styles.resultCard}>
                <Text style={styles.sectionTitle}>
                  Workout Time to Burn Calories
                </Text>
                <Text style={styles.sectionSubtitle}>
                  Choose your preferred exercise
                </Text>

                {workoutRecommendations.map((item, index) => (
                  <View key={item.key} style={styles.workoutItem}>
                    <View style={styles.workoutInfo}>
                      <Text style={styles.workoutName}>
                        {index + 1}. {item.workout.name}
                      </Text>
                      <Text style={styles.workoutDescription}>
                        {item.workout.description}
                      </Text>
                      <Text style={styles.workoutIntensity}>
                        Intensity: {item.workout.intensity}
                      </Text>
                    </View>
                    <View style={styles.workoutTime}>
                      <Text style={styles.timeValue}>
                        {formatWorkoutTime(item.time)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
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
  scrollView: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
  },
  content: {
    padding: 20,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    width: '100%',
    height: 300,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: '#757575',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultsContainer: {
    marginTop: 10,
  },
  resultCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
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
    fontSize: 16,
    color: '#757575',
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  resultNote: {
    fontSize: 12,
    color: '#9e9e9e',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 16,
  },
  workoutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  workoutInfo: {
    flex: 1,
    marginRight: 12,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  workoutDescription: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 2,
  },
  workoutIntensity: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '500',
  },
  workoutTime: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 70,
    alignItems: 'center',
  },
  timeValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default App;

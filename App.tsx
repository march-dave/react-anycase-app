/**
 * CalorieFit - 음식 사진으로 칼로리 계산 및 운동 시간 추천 앱
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
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// 음식별 칼로리 데이터 (100g 기준)
const FOOD_DATABASE: {[key: string]: number} = {
  rice: 130,
  chicken: 165,
  beef: 250,
  pork: 242,
  fish: 206,
  bread: 265,
  apple: 52,
  banana: 89,
  pizza: 266,
  hamburger: 295,
  salad: 15,
  pasta: 131,
  egg: 155,
  milk: 61,
  cheese: 402,
};

// 운동별 칼로리 소모량 (분당)
const EXERCISE_CALORIES: {[key: string]: number} = {
  running: 10,
  walking: 4,
  cycling: 8,
  swimming: 11,
  'jump rope': 12,
  yoga: 3,
  'weight training': 6,
};

function App(): React.JSX.Element {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [calories, setCalories] = useState<number>(0);
  const [selectedFood, setSelectedFood] = useState<string>('');

  // 카메라로 사진 촬영
  const handleTakePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        quality: 0.8,
      },
      response => {
        if (response.didCancel) {
          console.log('사용자가 카메라를 취소했습니다');
        } else if (response.errorCode) {
          Alert.alert('Error', 'Camera error: ' + response.errorMessage);
        } else if (response.assets && response.assets[0]) {
          setImageUri(response.assets[0].uri || null);
          // 랜덤으로 음식 선택 (실제로는 AI 이미지 인식 필요)
          analyzeFood();
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
          console.log('사용자가 이미지 선택을 취소했습니다');
        } else if (response.errorCode) {
          Alert.alert('Error', 'Image picker error: ' + response.errorMessage);
        } else if (response.assets && response.assets[0]) {
          setImageUri(response.assets[0].uri || null);
          // 랜덤으로 음식 선택 (실제로는 AI 이미지 인식 필요)
          analyzeFood();
        }
      },
    );
  };

  // 음식 분석 (간단한 시뮬레이션)
  // 실제 앱에서는 TensorFlow Lite나 ML Kit 사용 필요
  const analyzeFood = () => {
    const foods = Object.keys(FOOD_DATABASE);
    const randomFood = foods[Math.floor(Math.random() * foods.length)];
    const estimatedGrams = Math.floor(Math.random() * 200) + 100; // 100-300g
    const calculatedCalories = Math.floor(
      (FOOD_DATABASE[randomFood] * estimatedGrams) / 100,
    );

    setSelectedFood(randomFood);
    setCalories(calculatedCalories);
  };

  // 운동 시간 계산
  const calculateExerciseTime = (exerciseType: string): number => {
    if (calories === 0) return 0;
    const caloriesPerMinute = EXERCISE_CALORIES[exerciseType];
    return Math.ceil(calories / caloriesPerMinute);
  };

  // 수동으로 칼로리 입력 (테스트용)
  const handleManualInput = (food: string) => {
    const estimatedGrams = 150;
    const calculatedCalories = Math.floor(
      (FOOD_DATABASE[food] * estimatedGrams) / 100,
    );
    setSelectedFood(food);
    setCalories(calculatedCalories);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>CalorieFit</Text>
          <Text style={styles.subtitle}>Take a photo to calculate calories</Text>
        </View>

        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image source={{uri: imageUri}} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.placeholderText}>No image selected</Text>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={handlePickImage}>
            <Text style={styles.buttonText}>Choose from Gallery</Text>
          </TouchableOpacity>
        </View>

        {calories > 0 && (
          <View style={styles.resultContainer}>
            <View style={styles.calorieCard}>
              <Text style={styles.resultLabel}>Detected Food</Text>
              <Text style={styles.foodName}>{selectedFood.toUpperCase()}</Text>
              <Text style={styles.calorieText}>{calories} kcal</Text>
            </View>

            <View style={styles.exerciseSection}>
              <Text style={styles.sectionTitle}>
                Workout Time to Burn These Calories
              </Text>
              {Object.keys(EXERCISE_CALORIES).map(exercise => (
                <View key={exercise} style={styles.exerciseRow}>
                  <Text style={styles.exerciseName}>
                    {exercise.charAt(0).toUpperCase() + exercise.slice(1)}
                  </Text>
                  <Text style={styles.exerciseTime}>
                    {calculateExerciseTime(exercise)} min
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* 테스트용 수동 입력 버튼들 */}
        <View style={styles.testSection}>
          <Text style={styles.testTitle}>Quick Test (Manual Input)</Text>
          <View style={styles.testButtonContainer}>
            {Object.keys(FOOD_DATABASE)
              .slice(0, 6)
              .map(food => (
                <TouchableOpacity
                  key={food}
                  style={styles.testButton}
                  onPress={() => handleManualInput(food)}>
                  <Text style={styles.testButtonText}>
                    {food.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
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
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  imageContainer: {
    width: '100%',
    height: 250,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#ecf0f1',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#95a5a6',
  },
  buttonContainer: {
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  secondaryButton: {
    backgroundColor: '#2ecc71',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 20,
  },
  calorieCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  resultLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  foodName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  calorieText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  exerciseSection: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 15,
  },
  exerciseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  exerciseName: {
    fontSize: 16,
    color: '#34495e',
  },
  exerciseTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3498db',
  },
  testSection: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#fff3cd',
    borderRadius: 12,
  },
  testTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#856404',
    marginBottom: 12,
    textAlign: 'center',
  },
  testButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  testButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    margin: 4,
  },
  testButtonText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default App;

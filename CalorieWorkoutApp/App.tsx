/**
 * 칼로리 및 운동 시간 계산 앱 메인 컴포넌트
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

function App(): React.JSX.Element {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [calories, setCalories] = useState<number | null>(null);
  const [exerciseTime, setExerciseTime] = useState<number | null>(null);

  // 카메라로 사진 촬영
  const takePicture = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        quality: 0.8,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Camera error');
        } else if (response.assets && response.assets[0]) {
          const uri = response.assets[0].uri;
          setImageUri(uri || null);
          calculateCalories(uri);
        }
      },
    );
  };

  // 갤러리에서 이미지 선택
  const selectImage = () => {
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
          setImageUri(uri || null);
          calculateCalories(uri);
        }
      },
    );
  };

  // 칼로리 계산 (실제로는 AI API를 사용해야 하지만, 여기서는 시뮬레이션)
  const calculateCalories = (uri: string | undefined) => {
    // 시뮬레이션: 랜덤 칼로리 계산 (실제로는 이미지 분석 API 사용)
    const estimatedCalories = Math.floor(Math.random() * 800) + 200; // 200-1000 칼로리
    setCalories(estimatedCalories);

    // 운동 시간 계산 (칼로리를 소모하는데 필요한 시간)
    // 평균적으로 러닝은 분당 약 10칼로리 소모
    const runningTime = Math.ceil(estimatedCalories / 10);
    // 평균적으로 걷기는 분당 약 5칼로리 소모
    const walkingTime = Math.ceil(estimatedCalories / 5);

    setExerciseTime(runningTime);

    Alert.alert(
      'Calculation Complete',
      `Estimated Calories: ${estimatedCalories} kcal\n\n` +
      `Exercise needed:\n` +
      `- Running: ${runningTime} minutes\n` +
      `- Walking: ${walkingTime} minutes`,
      [{text: 'OK'}],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.content}>
          <Text style={styles.title}>Calorie & Workout Calculator</Text>
          <Text style={styles.subtitle}>Take a photo of your food</Text>

          {imageUri && (
            <View style={styles.imageContainer}>
              <Image source={{uri: imageUri}} style={styles.image} />
            </View>
          )}

          {calories !== null && exerciseTime !== null && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>Results:</Text>
              <Text style={styles.resultText}>
                Estimated Calories: {calories} kcal
              </Text>
              <Text style={styles.resultText}>
                Running Time: {exerciseTime} minutes
              </Text>
              <Text style={styles.resultText}>
                Walking Time: {Math.ceil(calories / 5)} minutes
              </Text>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={selectImage}>
              <Text style={styles.buttonText}>Choose from Gallery</Text>
            </TouchableOpacity>
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
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  resultContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  buttonContainer: {
    gap: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default App;

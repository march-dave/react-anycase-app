/**
 * CameraScreen - 카메라 화면
 * 사용자가 음식 사진을 촬영하거나 갤러리에서 선택
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import {analyzeFood} from '../services/calorieService';

type CameraScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Camera'
>;

interface Props {
  navigation: CameraScreenNavigationProp;
}

const CameraScreen: React.FC<Props> = ({navigation}) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // 카메라로 사진 촬영
  const handleTakePhoto = async () => {
    try {
      const result: ImagePickerResponse = await launchCamera({
        mediaType: 'photo',
        quality: 0.8,
        saveToPhotos: true,
      });

      if (result.assets && result.assets[0]?.uri) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  // 갤러리에서 이미지 선택
  const handleSelectFromGallery = async () => {
    try {
      const result: ImagePickerResponse = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (result.assets && result.assets[0]?.uri) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };

  // 이미지 분석 및 결과 화면으로 이동
  const handleAnalyze = async () => {
    if (!imageUri) {
      Alert.alert('No Image', 'Please take or select a photo first.');
      return;
    }

    setIsAnalyzing(true);

    try {
      // 음식 분석 서비스 호출
      const result = await analyzeFood(imageUri);

      navigation.navigate('Result', {
        imageUri: imageUri,
        calories: result.calories,
        foodName: result.foodName,
      });
    } catch (error) {
      Alert.alert('Analysis Error', 'Failed to analyze the image.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image
              source={{uri: imageUri}}
              style={styles.previewImage}
              testID="preview-image"
            />
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>No image selected</Text>
              <Text style={styles.placeholderSubtext}>
                Take a photo or select from gallery
              </Text>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleTakePhoto}
            testID="take-photo-button">
            <Text style={styles.actionButtonText}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.galleryButton]}
            onPress={handleSelectFromGallery}
            testID="gallery-button">
            <Text style={styles.actionButtonText}>Select from Gallery</Text>
          </TouchableOpacity>
        </View>

        {imageUri && (
          <TouchableOpacity
            style={[styles.analyzeButton, isAnalyzing && styles.disabledButton]}
            onPress={handleAnalyze}
            disabled={isAnalyzing}
            testID="analyze-button">
            {isAnalyzing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.analyzeButtonText}>Analyze Calories</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: '#999',
    marginBottom: 10,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#bbb',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  galleryButton: {
    backgroundColor: '#9C27B0',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  analyzeButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#a5d6a7',
  },
  analyzeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CameraScreen;

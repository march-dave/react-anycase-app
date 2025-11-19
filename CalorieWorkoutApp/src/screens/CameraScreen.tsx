/**
 * 카메라 화면
 * 사진 촬영 및 갤러리 선택 기능을 제공합니다.
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';
import {analyzeFood} from '../services/foodAnalyzer';

interface CameraScreenProps {
  navigation: any;
}

const CameraScreen: React.FC<CameraScreenProps> = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // 카메라 권한 요청
  const requestCameraPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') {
      return true;
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera to take food photos.',
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
  };

  // 사진 촬영 (데모용 - 실제로는 react-native-image-picker 사용)
  const handleTakePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Camera permission is required to take photos.',
      );
      return;
    }

    // 데모용 - 실제 앱에서는 launchCamera 사용
    // 여기서는 샘플 이미지 URI를 사용
    setSelectedImage('demo://food-image');
  };

  // 갤러리에서 선택 (데모용)
  const handleSelectFromGallery = async () => {
    // 데모용 - 실제 앱에서는 launchImageLibrary 사용
    setSelectedImage('demo://gallery-image');
  };

  // 이미지 분석
  const handleAnalyze = async () => {
    if (!selectedImage) {
      Alert.alert('No Image', 'Please take a photo or select one first.');
      return;
    }

    setIsAnalyzing(true);

    try {
      const result = await analyzeFood(selectedImage);
      navigation.navigate('Result', {analysisResult: result});
    } catch (error) {
      Alert.alert('Error', 'Failed to analyze the image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 뒤로 가기
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        title="Take Photo"
        showBackButton
        onBackPress={handleBack}
      />

      <View style={styles.content}>
        {/* 이미지 미리보기 영역 */}
        <View style={styles.previewContainer}>
          {selectedImage ? (
            <View style={styles.imageContainer}>
              <Image
                source={{uri: selectedImage}}
                style={styles.previewImage}
                testID="preview-image"
              />
              <Text style={styles.demoText}>Demo Image Selected</Text>
            </View>
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderIcon}>📷</Text>
              <Text style={styles.placeholderText}>
                Take a photo or select from gallery
              </Text>
            </View>
          )}
        </View>

        {/* 버튼 영역 */}
        <View style={styles.buttonContainer}>
          <Button
            title="Take Photo"
            onPress={handleTakePhoto}
            style={styles.button}
            testID="camera-button"
          />

          <Button
            title="Select from Gallery"
            onPress={handleSelectFromGallery}
            variant="outline"
            style={styles.button}
            testID="gallery-button"
          />

          {selectedImage && (
            <Button
              title="Analyze Food"
              onPress={handleAnalyze}
              variant="secondary"
              loading={isAnalyzing}
              style={styles.analyzeButton}
              testID="analyze-button"
            />
          )}
        </View>

        {/* 안내 문구 */}
        <View style={styles.tips}>
          <Text style={styles.tipsTitle}>Tips for better results:</Text>
          <Text style={styles.tipText}>
            - Make sure the food is clearly visible
          </Text>
          <Text style={styles.tipText}>
            - Good lighting helps accuracy
          </Text>
          <Text style={styles.tipText}>
            - Take the photo from above
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  demoText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 8,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    marginBottom: 12,
  },
  analyzeButton: {
    marginTop: 8,
  },
  tips: {
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    padding: 12,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 4,
  },
});

export default CameraScreen;

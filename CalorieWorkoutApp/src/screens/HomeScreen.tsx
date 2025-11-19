/**
 * 홈 화면
 * 앱의 메인 화면으로 사진 촬영 및 수동 입력 옵션을 제공합니다.
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';
import {analyzeManualEntry} from '../services/foodAnalyzer';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [manualFood, setManualFood] = useState('');
  const [servingSize, setServingSize] = useState('100');

  // 카메라로 이동
  const handleTakePhoto = () => {
    navigation.navigate('Camera');
  };

  // 수동 입력 처리
  const handleManualAnalysis = () => {
    if (!manualFood.trim()) {
      return;
    }

    const grams = parseInt(servingSize, 10) || 100;
    const result = analyzeManualEntry(manualFood.trim(), grams);

    navigation.navigate('Result', {analysisResult: result});
  };

  return (
    <View style={styles.container}>
      <Header title="Calorie Workout" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* 앱 소개 */}
          <View style={styles.introSection}>
            <Text style={styles.introTitle}>Track Your Calories</Text>
            <Text style={styles.introText}>
              Take a photo of your food to calculate calories and see how much
              exercise you need to burn them off.
            </Text>
          </View>

          {/* 카메라 버튼 */}
          <View style={styles.cameraSection}>
            <Button
              title="Take Photo"
              onPress={handleTakePhoto}
              testID="take-photo-button"
            />
            <Text style={styles.orText}>or</Text>
          </View>

          {/* 수동 입력 섹션 */}
          <View style={styles.manualSection}>
            <Text style={styles.sectionTitle}>Manual Entry</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Food Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., pizza, apple, rice"
                value={manualFood}
                onChangeText={setManualFood}
                testID="food-input"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Serving Size (grams)</Text>
              <TextInput
                style={styles.input}
                placeholder="100"
                value={servingSize}
                onChangeText={setServingSize}
                keyboardType="numeric"
                testID="serving-input"
              />
            </View>

            <Button
              title="Calculate"
              onPress={handleManualAnalysis}
              variant="secondary"
              disabled={!manualFood.trim()}
              testID="calculate-button"
            />
          </View>

          {/* 정보 섹션 */}
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>How it works</Text>
            <View style={styles.infoItem}>
              <Text style={styles.infoNumber}>1</Text>
              <Text style={styles.infoText}>
                Take a photo of your food or enter it manually
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoNumber}>2</Text>
              <Text style={styles.infoText}>
                Get instant calorie estimation
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoNumber}>3</Text>
              <Text style={styles.infoText}>
                See workout options to burn those calories
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  },
  scrollContent: {
    padding: 20,
  },
  introSection: {
    marginBottom: 24,
  },
  introTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  introText: {
    fontSize: 16,
    color: '#757575',
    lineHeight: 24,
  },
  cameraSection: {
    marginBottom: 24,
    alignItems: 'center',
  },
  orText: {
    fontSize: 16,
    color: '#757575',
    marginTop: 16,
  },
  manualSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333333',
    backgroundColor: '#FAFAFA',
  },
  infoSection: {
    marginTop: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4CAF50',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 28,
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#757575',
  },
});

export default HomeScreen;

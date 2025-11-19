/**
 * HomeScreen - 메인 홈 화면
 * 앱 소개 및 카메라 화면으로 이동하는 버튼 제공
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Calorie Workout</Text>
          <Text style={styles.subtitle}>
            Take a photo of your food and find out how long to exercise!
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How it works:</Text>
          <View style={styles.stepContainer}>
            <Text style={styles.stepNumber}>1</Text>
            <Text style={styles.stepText}>Take a photo of your food</Text>
          </View>
          <View style={styles.stepContainer}>
            <Text style={styles.stepNumber}>2</Text>
            <Text style={styles.stepText}>
              We calculate the calories automatically
            </Text>
          </View>
          <View style={styles.stepContainer}>
            <Text style={styles.stepNumber}>3</Text>
            <Text style={styles.stepText}>
              See how long you need to exercise to burn it off
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.cameraButton}
          onPress={() => navigation.navigate('Camera')}
          testID="camera-button">
          <Text style={styles.cameraButtonText}>Take Photo</Text>
        </TouchableOpacity>

        <View style={styles.workoutInfo}>
          <Text style={styles.workoutInfoTitle}>Supported Workouts:</Text>
          <Text style={styles.workoutItem}>Running</Text>
          <Text style={styles.workoutItem}>Walking</Text>
          <Text style={styles.workoutItem}>Cycling</Text>
          <Text style={styles.workoutItem}>Swimming</Text>
          <Text style={styles.workoutItem}>Jump Rope</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4CAF50',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 30,
    fontWeight: 'bold',
    marginRight: 15,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
  },
  cameraButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cameraButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  workoutInfo: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  workoutInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  workoutItem: {
    fontSize: 14,
    color: '#666',
    paddingVertical: 3,
  },
});

export default HomeScreen;

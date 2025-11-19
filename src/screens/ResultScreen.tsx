/**
 * ResultScreen - 결과 화면
 * 칼로리 분석 결과와 운동 시간을 표시
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../types';
import {calculateWorkoutTime} from '../utils/workoutCalculator';

type ResultScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Result'
>;

type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;

interface Props {
  navigation: ResultScreenNavigationProp;
  route: ResultScreenRouteProp;
}

const ResultScreen: React.FC<Props> = ({navigation, route}) => {
  const {imageUri, calories, foodName} = route.params;

  // 각 운동별 필요 시간 계산
  const workoutTimes = calculateWorkoutTime(calories);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: imageUri}}
            style={styles.foodImage}
            testID="result-image"
          />
        </View>

        <View style={styles.calorieCard}>
          <Text style={styles.foodName}>{foodName}</Text>
          <Text style={styles.calorieValue}>{calories}</Text>
          <Text style={styles.calorieLabel}>calories</Text>
        </View>

        <View style={styles.workoutSection}>
          <Text style={styles.sectionTitle}>Time to burn off:</Text>

          {workoutTimes.map((workout, index) => (
            <View key={index} style={styles.workoutCard} testID={`workout-${index}`}>
              <View style={styles.workoutIcon}>
                <Text style={styles.iconText}>{workout.icon}</Text>
              </View>
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutName}>{workout.workoutName}</Text>
                <Text style={styles.workoutTime}>
                  {workout.minutes} minutes
                </Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.newPhotoButton}
          onPress={() => navigation.navigate('Home')}
          testID="new-photo-button">
          <Text style={styles.newPhotoButtonText}>Take Another Photo</Text>
        </TouchableOpacity>
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
  imageContainer: {
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  foodImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  calorieCard: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  foodName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  calorieValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  calorieLabel: {
    fontSize: 16,
    color: '#e8f5e9',
  },
  workoutSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  workoutCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  workoutIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: {
    fontSize: 24,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  workoutTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  newPhotoButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  newPhotoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResultScreen;

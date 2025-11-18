/**
 * 결과 화면 컴포넌트
 * 칼로리 분석 결과 및 운동 권장사항 표시
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {CalorieAnalysis, WorkoutRecommendation} from '../types';
import {formatDuration} from '../services/WorkoutCalculator';

interface ResultScreenProps {
  analysis: CalorieAnalysis;
  workoutRecommendations: WorkoutRecommendation[];
  onReset: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  analysis,
  workoutRecommendations,
  onReset,
}) => {
  return (
    <ScrollView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Analysis Results</Text>
      </View>

      {/* 이미지 프리뷰 */}
      {analysis.imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{uri: analysis.imageUri}} style={styles.image} />
        </View>
      )}

      {/* 총 칼로리 카드 */}
      <View style={styles.calorieCard}>
        <Text style={styles.calorieLabel}>Total Calories</Text>
        <Text style={styles.calorieValue}>{analysis.totalCalories}</Text>
        <Text style={styles.calorieUnit}>kcal</Text>
      </View>

      {/* 음식 항목 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detected Food Items</Text>
        {analysis.foodItems.map((item, index) => (
          <View key={index} style={styles.foodItem}>
            <View style={styles.foodInfo}>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodConfidence}>
                {Math.round(item.confidence * 100)}% confident
              </Text>
            </View>
            <Text style={styles.foodCalories}>{item.calories} kcal</Text>
          </View>
        ))}
      </View>

      {/* 운동 권장사항 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Workout Recommendations to Burn {analysis.totalCalories} kcal
        </Text>
        <Text style={styles.sectionSubtitle}>
          Choose an exercise to burn off these calories
        </Text>

        {workoutRecommendations.map((rec, index) => (
          <View
            key={index}
            style={[
              styles.workoutItem,
              index === 0 && styles.recommendedWorkout,
            ]}>
            {index === 0 && (
              <View style={styles.recommendedBadge}>
                <Text style={styles.recommendedText}>⚡ Fastest</Text>
              </View>
            )}
            <View style={styles.workoutInfo}>
              <Text style={styles.workoutName}>{rec.exercise.name}</Text>
              <Text style={styles.workoutDetail}>
                {rec.exercise.caloriesPerMinute.toFixed(1)} kcal/min
              </Text>
            </View>
            <View style={styles.workoutDuration}>
              <Text style={styles.durationValue}>
                {formatDuration(rec.durationMinutes)}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* 다시 시작 버튼 */}
      <TouchableOpacity style={styles.resetButton} onPress={onReset}>
        <Text style={styles.resetButtonText}>🔄 Analyze Another Photo</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          * Calorie estimates are approximate and may vary based on portion
          size and preparation method.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  imageContainer: {
    margin: 15,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  calorieCard: {
    backgroundColor: '#4CAF50',
    margin: 15,
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  calorieLabel: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginBottom: 5,
  },
  calorieValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  calorieUnit: {
    fontSize: 18,
    color: 'white',
    opacity: 0.9,
  },
  section: {
    backgroundColor: 'white',
    margin: 15,
    marginTop: 0,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textTransform: 'capitalize',
  },
  foodConfidence: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  foodCalories: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  workoutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  recommendedWorkout: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  recommendedBadge: {
    position: 'absolute',
    top: -8,
    left: 10,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  recommendedText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  workoutDetail: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  workoutDuration: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  durationValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  resetButton: {
    backgroundColor: '#2196F3',
    margin: 15,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 15,
    paddingBottom: 30,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
});

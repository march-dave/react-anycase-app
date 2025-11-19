/**
 * 결과 화면
 * 칼로리 분석 결과와 운동 옵션을 표시합니다.
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import Header from '../components/Header';
import FoodCard from '../components/FoodCard';
import WorkoutCard from '../components/WorkoutCard';
import Button from '../components/Button';
import {FoodAnalysisResult} from '../services/foodAnalyzer';
import {
  calculateWorkoutOptions,
  calculateDailyPercentage,
} from '../utils/workoutCalculator';
import {calculateDailyPercentage as calcDailyPct} from '../utils/calorieCalculator';

interface ResultScreenProps {
  navigation: any;
  route: {
    params: {
      analysisResult: FoodAnalysisResult;
    };
  };
}

const ResultScreen: React.FC<ResultScreenProps> = ({navigation, route}) => {
  const {analysisResult} = route.params;
  const [userWeight, setUserWeight] = useState('70');

  // 사용자 체중 기반 운동 옵션 계산
  const weight = parseInt(userWeight, 10) || 70;
  const workoutOptions = calculateWorkoutOptions(
    analysisResult.totalCalories,
    weight,
  );

  // 일일 칼로리 비율 계산
  const dailyPercentage = calcDailyPct(analysisResult.totalCalories);

  // 뒤로 가기
  const handleBack = () => {
    navigation.goBack();
  };

  // 홈으로 돌아가기
  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Header
        title="Results"
        showBackButton
        onBackPress={handleBack}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {/* 총 칼로리 요약 */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Calories</Text>
          <Text style={styles.summaryValue} testID="total-calories-summary">
            {analysisResult.totalCalories}
          </Text>
          <Text style={styles.summaryUnit}>kcal</Text>
          <View style={styles.dailyProgress}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {width: `${Math.min(dailyPercentage, 100)}%`},
                ]}
              />
            </View>
            <Text style={styles.dailyText}>
              {dailyPercentage}% of daily goal (2000 kcal)
            </Text>
          </View>
        </View>

        {/* 분석된 음식 목록 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detected Foods</Text>
          {analysisResult.foods.map((food, index) => (
            <FoodCard key={`${food.foodName}-${index}`} food={food} />
          ))}
        </View>

        {/* 체중 입력 */}
        <View style={styles.weightSection}>
          <Text style={styles.weightLabel}>Your Weight (kg)</Text>
          <TextInput
            style={styles.weightInput}
            value={userWeight}
            onChangeText={setUserWeight}
            keyboardType="numeric"
            placeholder="70"
            testID="weight-input"
          />
        </View>

        {/* 운동 옵션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workout Options</Text>
          <Text style={styles.sectionSubtitle}>
            Time needed to burn {analysisResult.totalCalories} kcal
          </Text>
          {workoutOptions.map((workout, index) => (
            <WorkoutCard
              key={workout.name}
              workout={workout}
              isHighlighted={index === 0}
            />
          ))}
        </View>

        {/* 추가 정보 */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Quick Facts</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Foods detected:</Text>
            <Text style={styles.infoValue}>{analysisResult.foods.length}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Analysis time:</Text>
            <Text style={styles.infoValue}>
              {analysisResult.analysisTime}ms
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Fastest workout:</Text>
            <Text style={styles.infoValue}>
              {workoutOptions[0]?.displayName || 'N/A'}
            </Text>
          </View>
        </View>

        {/* 액션 버튼 */}
        <View style={styles.actionButtons}>
          <Button
            title="Analyze Another"
            onPress={handleGoHome}
            style={styles.actionButton}
            testID="analyze-another-button"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 20,
  },
  summaryCard: {
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#E8F5E9',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  summaryUnit: {
    fontSize: 18,
    color: '#E8F5E9',
    marginBottom: 16,
  },
  dailyProgress: {
    width: '100%',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  dailyText: {
    fontSize: 12,
    color: '#E8F5E9',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 12,
  },
  weightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  weightLabel: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  weightInput: {
    width: 80,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: '#FAFAFA',
  },
  infoCard: {
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
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#757575',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  actionButtons: {
    marginTop: 8,
    marginBottom: 20,
  },
  actionButton: {
    marginBottom: 12,
  },
});

export default ResultScreen;

/**
 * 음식 카드 컴포넌트
 * 분석된 음식 정보를 표시합니다.
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CalorieResult} from '../utils/calorieCalculator';

interface FoodCardProps {
  food: CalorieResult;
}

export const FoodCard: React.FC<FoodCardProps> = ({food}) => {
  // 신뢰도에 따른 배경색 설정
  const getConfidenceColor = () => {
    if (food.confidence >= 0.8) return '#4CAF50';
    if (food.confidence >= 0.5) return '#FFC107';
    return '#FF5722';
  };

  return (
    <View style={styles.container} testID="food-card">
      <View style={styles.header}>
        <Text style={styles.foodName} testID="food-name">
          {food.foodName.replace(/_/g, ' ').toUpperCase()}
        </Text>
        <View
          style={[
            styles.confidenceBadge,
            {backgroundColor: getConfidenceColor()},
          ]}>
          <Text style={styles.confidenceText}>
            {Math.round(food.confidence * 100)}%
          </Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Serving Size</Text>
          <Text style={styles.detailValue} testID="serving-size">
            {food.servingSize}g
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Per 100g</Text>
          <Text style={styles.detailValue}>{food.calories} kcal</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Total</Text>
          <Text style={styles.totalValue} testID="total-calories">
            {food.totalCalories} kcal
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
  },
  confidenceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confidenceText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  totalValue: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default FoodCard;

/**
 * 운동 카드 컴포넌트
 * 운동 옵션과 필요한 시간을 표시합니다.
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {WorkoutOption, formatWorkoutTime} from '../utils/workoutCalculator';

interface WorkoutCardProps {
  workout: WorkoutOption;
  isHighlighted?: boolean;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({
  workout,
  isHighlighted = false,
}) => {
  return (
    <View
      style={[styles.container, isHighlighted && styles.highlighted]}
      testID="workout-card">
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{workout.icon}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.workoutName} testID="workout-name">
          {workout.displayName}
        </Text>
        <Text style={styles.caloriesPerHour}>
          {workout.caloriesPerHour} kcal/hr
        </Text>
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.timeValue} testID="workout-time">
          {formatWorkoutTime(workout.minutesRequired)}
        </Text>
        <Text style={styles.timeLabel}>needed</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  highlighted: {
    borderColor: '#4CAF50',
    borderWidth: 2,
    backgroundColor: '#E8F5E9',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  caloriesPerHour: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  timeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  timeLabel: {
    fontSize: 10,
    color: '#757575',
  },
});

export default WorkoutCard;

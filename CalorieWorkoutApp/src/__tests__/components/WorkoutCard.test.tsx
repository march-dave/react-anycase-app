/**
 * WorkoutCard 컴포넌트 유닛 테스트
 */

import React from 'react';
import {render} from '@testing-library/react-native';
import WorkoutCard from '../../components/WorkoutCard';
import {WorkoutOption} from '../../utils/workoutCalculator';

describe('WorkoutCard', () => {
  const mockWorkout: WorkoutOption = {
    name: 'running',
    displayName: 'Running',
    caloriesPerHour: 700,
    minutesRequired: 30,
    icon: '🏃',
  };

  // 기본 렌더링 테스트
  it('should render workout card', () => {
    const {getByTestId} = render(<WorkoutCard workout={mockWorkout} />);

    expect(getByTestId('workout-card')).toBeTruthy();
  });

  // 운동 이름 표시 테스트
  it('should display workout name', () => {
    const {getByTestId} = render(<WorkoutCard workout={mockWorkout} />);

    const workoutName = getByTestId('workout-name');
    expect(workoutName.props.children).toBe('Running');
  });

  // 운동 시간 표시 테스트
  it('should display formatted workout time', () => {
    const {getByTestId} = render(<WorkoutCard workout={mockWorkout} />);

    const workoutTime = getByTestId('workout-time');
    expect(workoutTime.props.children).toBe('30 min');
  });

  // 1시간 이상 시간 포맷 테스트
  it('should display time in hours for longer workouts', () => {
    const longWorkout: WorkoutOption = {
      ...mockWorkout,
      minutesRequired: 90,
    };

    const {getByTestId} = render(<WorkoutCard workout={longWorkout} />);

    const workoutTime = getByTestId('workout-time');
    expect(workoutTime.props.children).toBe('1 hr 30 min');
  });

  // 하이라이트 스타일 테스트
  it('should render with highlight style when isHighlighted is true', () => {
    const {getByTestId} = render(
      <WorkoutCard workout={mockWorkout} isHighlighted />,
    );

    expect(getByTestId('workout-card')).toBeTruthy();
  });

  // 기본 하이라이트 비활성화 테스트
  it('should not be highlighted by default', () => {
    const {getByTestId} = render(<WorkoutCard workout={mockWorkout} />);

    expect(getByTestId('workout-card')).toBeTruthy();
  });

  // 정확히 1시간 포맷 테스트
  it('should display exact hours without minutes', () => {
    const exactHourWorkout: WorkoutOption = {
      ...mockWorkout,
      minutesRequired: 60,
    };

    const {getByTestId} = render(<WorkoutCard workout={exactHourWorkout} />);

    const workoutTime = getByTestId('workout-time');
    expect(workoutTime.props.children).toBe('1 hr');
  });
});

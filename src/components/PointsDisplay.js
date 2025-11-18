import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const PointsContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  padding: 20px;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  max-width: 600px;
`;

const PointsHeader = styled.h2`
  margin: 0 0 15px 0;
  font-size: 24px;
  font-weight: 600;
`;

const PointsValue = styled.div`
  font-size: 48px;
  font-weight: bold;
  margin: 10px 0;
`;

const PointsLabel = styled.div`
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 5px;
`;

const DailyProgress = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
`;

const ProgressBar = styled.div`
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  height: 20px;
  overflow: hidden;
  margin: 10px 0;
`;

const ProgressFill = styled.div`
  background: linear-gradient(90deg, #4ade80 0%, #22c55e 100%);
  height: 100%;
  width: ${props => props.percentage}%;
  transition: width 0.3s ease;
  border-radius: 10px;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 14px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const StatLabel = styled.div`
  opacity: 0.8;
  font-size: 12px;
  margin-top: 3px;
`;

const PointsDisplay = ({ totalPoints, dailyPoints, searchCount }) => {
  const maxDailyPoints = 90;
  const maxDailySearches = 30;
  const percentage = (dailyPoints / maxDailyPoints) * 100;
  const remainingPoints = maxDailyPoints - dailyPoints;
  const remainingSearches = maxDailySearches - searchCount;

  return (
    <PointsContainer>
      <PointsHeader>Your Points</PointsHeader>

      <PointsValue>{totalPoints}</PointsValue>
      <PointsLabel>Total Points Earned</PointsLabel>

      <DailyProgress>
        <div>Today's Progress</div>
        <ProgressBar>
          <ProgressFill percentage={percentage} />
        </ProgressBar>

        <StatsRow>
          <StatItem>
            <StatValue>{dailyPoints}</StatValue>
            <StatLabel>Points Today</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{searchCount}</StatValue>
            <StatLabel>Searches Today</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{remainingSearches}</StatValue>
            <StatLabel>Searches Left</StatLabel>
          </StatItem>
        </StatsRow>

        {remainingPoints > 0 ? (
          <div style={{ marginTop: '10px', fontSize: '12px', opacity: 0.9 }}>
            Earn {remainingPoints} more points today! ({remainingSearches} searches remaining)
          </div>
        ) : (
          <div style={{ marginTop: '10px', fontSize: '12px', opacity: 0.9 }}>
            Daily limit reached! Come back tomorrow for more points.
          </div>
        )}
      </DailyProgress>
    </PointsContainer>
  );
};

const mapStateToProps = state => ({
  totalPoints: state.totalPoints || 0,
  dailyPoints: state.dailyPoints || 0,
  searchCount: state.searchCount || 0
});

export default connect(mapStateToProps)(PointsDisplay);

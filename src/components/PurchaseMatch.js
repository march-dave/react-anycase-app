import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const StoreInfo = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StoreName = styled.h2`
  margin: 0 0 10px 0;
`;

const UserCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h3`
  margin: 0 0 10px 0;
  color: #333;
`;

const UserDetail = styled.div`
  color: #666;
  margin: 5px 0;
  font-size: 0.95em;
`;

const Button = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const MatchButton = styled(Button)`
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  margin-top: 20px;
  width: 100%;
  padding: 15px;
  font-size: 18px;
`;

const SuccessMessage = styled.div`
  background: #e8f5e9;
  color: #2e7d32;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  margin: 20px 0;
  font-size: 1.2em;
  font-weight: bold;
`;

const NoUsersMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 1.1em;
`;

const WaitingInfo = styled.div`
  background: #fff3e0;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  text-align: center;
`;

// 샘플 사용자 데이터
const sampleUsers = [
  {
    id: 1,
    name: '김철수',
    rating: 4.8,
    completedPurchases: 12,
    preferredSize: '270mm',
    interestedBrand: '나이키',
    estimatedArrival: '10분 후'
  },
  {
    id: 2,
    name: '이영희',
    rating: 4.9,
    completedPurchases: 8,
    preferredSize: '250mm',
    interestedBrand: '아디다스',
    estimatedArrival: '15분 후'
  },
  {
    id: 3,
    name: '박지민',
    rating: 5.0,
    completedPurchases: 20,
    preferredSize: '260mm',
    interestedBrand: '뉴발란스',
    estimatedArrival: '5분 후'
  }
];

function PurchaseMatch({ store, onMatchComplete }) {
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMatching, setIsMatching] = useState(false);

  useEffect(() => {
    // 매장에 따른 사용자 목록 로드 (시뮬레이션)
    setTimeout(() => {
      setAvailableUsers(sampleUsers);
    }, 500);
  }, [store]);

  const handleMatch = (user) => {
    setSelectedUser(user);
  };

  const confirmMatch = () => {
    setIsMatching(true);
    // 매칭 시뮬레이션
    setTimeout(() => {
      onMatchComplete(selectedUser);
    }, 1500);
  };

  return (
    <Container>
      <StoreInfo>
        <StoreName>📍 {store.name}</StoreName>
        <div>위치: {store.location} ({store.distance})</div>
        <div>할인: {store.discount}</div>
      </StoreInfo>

      <WaitingInfo>
        <h3>💡 공동 구매 파트너를 찾아보세요!</h3>
        <p>현재 이 매장에서 구매를 원하는 {availableUsers.length}명의 사용자가 대기 중입니다.</p>
      </WaitingInfo>

      {selectedUser && !isMatching && (
        <SuccessMessage>
          ✅ {selectedUser.name}님과 매칭되었습니다!
        </SuccessMessage>
      )}

      {!selectedUser && availableUsers.length > 0 ? (
        <div>
          {availableUsers.map(user => (
            <UserCard key={user.id}>
              <UserInfo>
                <UserName>👤 {user.name}</UserName>
                <UserDetail>⭐ 평점: {user.rating}/5.0</UserDetail>
                <UserDetail>🛍️ 완료한 거래: {user.completedPurchases}회</UserDetail>
                <UserDetail>👟 선호 사이즈: {user.preferredSize}</UserDetail>
                <UserDetail>💖 관심 브랜드: {user.interestedBrand}</UserDetail>
                <UserDetail>🕐 도착 예정: {user.estimatedArrival}</UserDetail>
              </UserInfo>
              <Button onClick={() => handleMatch(user)}>
                매칭 요청
              </Button>
            </UserCard>
          ))}
        </div>
      ) : !selectedUser && availableUsers.length === 0 ? (
        <NoUsersMessage>
          현재 대기 중인 사용자가 없습니다.<br />
          잠시 후 다시 확인해주세요.
        </NoUsersMessage>
      ) : null}

      {selectedUser && (
        <MatchButton onClick={confirmMatch} disabled={isMatching}>
          {isMatching ? '매칭 중...' : '구매 진행하기'}
        </MatchButton>
      )}
    </Container>
  );
}

export default PurchaseMatch;

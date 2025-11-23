import React, { useState } from 'react';
import styled from 'styled-components';
import StoreList from './StoreList';
import PurchaseMatch from './PurchaseMatch';
import CostCalculator from './CostCalculator';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.5em;
  font-weight: bold;
`;

const Subtitle = styled.p`
  margin: 10px 0 0 0;
  font-size: 1.2em;
  opacity: 0.9;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
`;

const Tab = styled.button`
  padding: 12px 30px;
  font-size: 16px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s;
  background: ${props => props.active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f0f0f0'};
  color: ${props => props.active ? 'white' : '#333'};
  box-shadow: ${props => props.active ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

function ShoeSplitPurchaseApp() {
  const [activeTab, setActiveTab] = useState('stores');
  const [selectedStore, setSelectedStore] = useState(null);
  const [matchedUser, setMatchedUser] = useState(null);

  const handleStoreSelect = (store) => {
    setSelectedStore(store);
    setActiveTab('match');
  };

  const handleMatchComplete = (user) => {
    setMatchedUser(user);
    setActiveTab('calculate');
  };

  return (
    <AppContainer>
      <Header>
        <Title>👟 신발 공동 구매</Title>
        <Subtitle>1+1 할인 혜택을 나눠서 받아보세요!</Subtitle>
      </Header>

      <TabContainer>
        <Tab
          active={activeTab === 'stores'}
          onClick={() => setActiveTab('stores')}
        >
          매장 찾기
        </Tab>
        <Tab
          active={activeTab === 'match'}
          onClick={() => setActiveTab('match')}
          disabled={!selectedStore}
        >
          파트너 찾기
        </Tab>
        <Tab
          active={activeTab === 'calculate'}
          onClick={() => setActiveTab('calculate')}
          disabled={!matchedUser}
        >
          비용 계산
        </Tab>
      </TabContainer>

      {activeTab === 'stores' && (
        <StoreList onStoreSelect={handleStoreSelect} />
      )}

      {activeTab === 'match' && selectedStore && (
        <PurchaseMatch
          store={selectedStore}
          onMatchComplete={handleMatchComplete}
        />
      )}

      {activeTab === 'calculate' && selectedStore && matchedUser && (
        <CostCalculator
          store={selectedStore}
          matchedUser={matchedUser}
        />
      )}
    </AppContainer>
  );
}

export default ShoeSplitPurchaseApp;

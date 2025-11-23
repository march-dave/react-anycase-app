import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px 0;
`;

const StoreCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  cursor: pointer;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    border-color: #667eea;
  }
`;

const StoreName = styled.h3`
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1.5em;
`;

const StoreInfo = styled.div`
  margin: 10px 0;
  color: #666;
  line-height: 1.6;
`;

const Label = styled.span`
  font-weight: bold;
  color: #333;
`;

const DiscountBadge = styled.div`
  display: inline-block;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  margin: 10px 0;
  font-size: 1.1em;
`;

const LocationBadge = styled.div`
  display: inline-block;
  background: #e8f5e9;
  color: #2e7d32;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.9em;
  margin-top: 10px;
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
`;

const FilterLabel = styled.label`
  margin-right: 10px;
  font-weight: bold;
`;

const Select = styled.select`
  padding: 8px 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 14px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

// 샘플 데이터
const sampleStores = [
  {
    id: 1,
    name: 'ABC 신발',
    location: '강남역',
    distance: '0.5km',
    discount: '1+1 (두 번째 50% 할인)',
    activeUsers: 3,
    address: '서울시 강남구 강남대로 123'
  },
  {
    id: 2,
    name: '나이키 매장',
    location: '홍대입구',
    distance: '1.2km',
    discount: '1+1 (두 번째 50% 할인)',
    activeUsers: 5,
    address: '서울시 마포구 양화로 456'
  },
  {
    id: 3,
    name: '슈마켓',
    location: '신촌',
    distance: '2.0km',
    discount: '1+1 (두 번째 50% 할인)',
    activeUsers: 2,
    address: '서울시 서대문구 신촌로 789'
  },
  {
    id: 4,
    name: '발편한 신발',
    location: '잠실',
    distance: '3.5km',
    discount: '1+1 (두 번째 50% 할인)',
    activeUsers: 4,
    address: '서울시 송파구 올림픽로 321'
  },
  {
    id: 5,
    name: '스니커즈 천국',
    location: '이태원',
    distance: '1.8km',
    discount: '1+1 (두 번째 50% 할인)',
    activeUsers: 6,
    address: '서울시 용산구 이태원로 654'
  },
  {
    id: 6,
    name: '런닝화 전문점',
    location: '건대입구',
    distance: '2.5km',
    discount: '1+1 (두 번째 50% 할인)',
    activeUsers: 1,
    address: '서울시 광진구 능동로 987'
  }
];

function StoreList({ onStoreSelect }) {
  const [stores] = useState(sampleStores);
  const [filter, setFilter] = useState('all');

  const filteredStores = filter === 'all'
    ? stores
    : stores.filter(store => {
        const distance = parseFloat(store.distance);
        if (filter === 'near') return distance <= 1;
        if (filter === 'medium') return distance > 1 && distance <= 2;
        if (filter === 'far') return distance > 2;
        return true;
      });

  return (
    <div>
      <FilterContainer>
        <FilterLabel>거리 필터:</FilterLabel>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">전체</option>
          <option value="near">1km 이내</option>
          <option value="medium">1-2km</option>
          <option value="far">2km 이상</option>
        </Select>
      </FilterContainer>

      <Container>
        {filteredStores.map(store => (
          <StoreCard key={store.id} onClick={() => onStoreSelect(store)}>
            <StoreName>{store.name}</StoreName>
            <DiscountBadge>🎉 {store.discount}</DiscountBadge>
            <StoreInfo>
              <div>📍 <Label>위치:</Label> {store.location}</div>
              <div>📏 <Label>거리:</Label> {store.distance}</div>
              <div>👥 <Label>대기 중인 사용자:</Label> {store.activeUsers}명</div>
              <div>🏠 <Label>주소:</Label> {store.address}</div>
            </StoreInfo>
            <LocationBadge>{store.distance} 거리</LocationBadge>
          </StoreCard>
        ))}
      </Container>
    </div>
  );
}

export default StoreList;

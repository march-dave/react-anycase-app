import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CostCalculator from './CostCalculator';
import './StoreList.css';

const StoreList = ({ stores, onSelectStore }) => {
  const [selectedStoreId, setSelectedStoreId] = useState(null);

  // 샘플 매장 데이터 (실제로는 Redux나 API에서 가져옴)
  const sampleStores = [
    {
      id: 1,
      name: '나이키 강남점',
      address: '서울시 강남구 테헤란로 123',
      discount: '1+1 50% 할인',
      distance: '0.5km',
      priceRange: '89,000 ~ 159,000원',
      popularShoe: {
        name: '에어맥스 270',
        price: 149000
      }
    },
    {
      id: 2,
      name: '아디다스 홍대점',
      address: '서울시 마포구 양화로 456',
      discount: '1+1 50% 할인',
      distance: '1.2km',
      priceRange: '79,000 ~ 139,000원',
      popularShoe: {
        name: '울트라부스트',
        price: 189000
      }
    },
    {
      id: 3,
      name: '뉴발란스 신촌점',
      address: '서울시 서대문구 신촌역로 789',
      discount: '1+1 50% 할인',
      distance: '0.8km',
      priceRange: '69,000 ~ 129,000원',
      popularShoe: {
        name: '530 시리즈',
        price: 119000
      }
    },
    {
      id: 4,
      name: '푸마 명동점',
      address: '서울시 중구 명동길 321',
      discount: '1+1 50% 할인',
      distance: '2.1km',
      priceRange: '59,000 ~ 99,000원',
      popularShoe: {
        name: 'RS-X',
        price: 129000
      }
    }
  ];

  const handleStoreClick = (store) => {
    setSelectedStoreId(store.id);
    if (onSelectStore) {
      onSelectStore(store);
    }
  };

  return (
    <div className="store-list-container">
      <div className="store-list-header">
        <h2>주변 신발 매장</h2>
        <p className="location-info">📍 현재 위치 기준</p>
      </div>

      <div className="stores-grid">
        {sampleStores.map((store) => (
          <div
            key={store.id}
            className={`store-card ${selectedStoreId === store.id ? 'selected' : ''}`}
            onClick={() => handleStoreClick(store)}
          >
            <div className="store-header">
              <h3>{store.name}</h3>
              <span className="distance-badge">{store.distance}</span>
            </div>

            <p className="store-address">{store.address}</p>

            <div className="discount-badge">
              🎁 {store.discount}
            </div>

            <div className="store-details">
              <p className="price-range">💰 {store.priceRange}</p>
              <p className="popular-item">
                인기: {store.popularShoe.name}
              </p>
            </div>

            {selectedStoreId === store.id && (
              <div className="calculator-section">
                <CostCalculator
                  originalPrice={store.popularShoe.price}
                  storeName={store.name}
                />
              </div>
            )}

            <button
              className="select-store-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleStoreClick(store);
              }}
            >
              이 매장에서 공동구매 하기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  stores: state.stores || []
});

export default connect(mapStateToProps)(StoreList);

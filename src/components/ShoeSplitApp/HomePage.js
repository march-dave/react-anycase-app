import React, { useState } from 'react';
import StoreList from './StoreList';
import RequestList from './RequestList';
import CreateRequest from './CreateRequest';
import './HomePage.css';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('stores');
  const [selectedStore, setSelectedStore] = useState(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'stores':
        return <StoreList onSelectStore={setSelectedStore} />;
      case 'requests':
        return <RequestList />;
      case 'create':
        return <CreateRequest selectedStore={selectedStore} />;
      default:
        return <StoreList onSelectStore={setSelectedStore} />;
    }
  };

  return (
    <div className="shoe-split-app">
      <header className="app-header">
        <h1>👟 신발 공동구매</h1>
        <p className="app-subtitle">1+1 할인을 함께 나눠요!</p>
      </header>

      <nav className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'stores' ? 'active' : ''}`}
          onClick={() => setActiveTab('stores')}
        >
          📍 매장 찾기
        </button>
        <button
          className={`tab-btn ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          🤝 요청 보기
        </button>
        <button
          className={`tab-btn ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => setActiveTab('create')}
        >
          ➕ 요청 만들기
        </button>
      </nav>

      <main className="app-content">
        {renderContent()}
      </main>

      <footer className="app-footer">
        <p>함께 구매하고 비용을 절약하세요!</p>
      </footer>
    </div>
  );
};

export default HomePage;

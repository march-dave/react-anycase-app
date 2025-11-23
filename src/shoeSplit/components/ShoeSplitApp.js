import React, { useState } from 'react';
import ShoeDealForm from './ShoeDealForm';
import DealList from './DealList';
import CostCalculator from './CostCalculator';
import './ShoeSplitApp.css';

const ShoeSplitApp = () => {
  const [activeTab, setActiveTab] = useState('deals');

  return (
    <div className="shoe-split-app">
      <header className="app-header">
        <h1>👟 신발 공동구매</h1>
        <p className="tagline">1+1 할인을 함께 나눠요!</p>
      </header>

      <nav className="app-nav">
        <button
          className={activeTab === 'deals' ? 'active' : ''}
          onClick={() => setActiveTab('deals')}
        >
          딜 찾기
        </button>
        <button
          className={activeTab === 'create' ? 'active' : ''}
          onClick={() => setActiveTab('create')}
        >
          딜 등록
        </button>
        <button
          className={activeTab === 'calculator' ? 'active' : ''}
          onClick={() => setActiveTab('calculator')}
        >
          비용 계산
        </button>
      </nav>

      <main className="app-content">
        {activeTab === 'deals' && <DealList />}
        {activeTab === 'create' && <ShoeDealForm />}
        {activeTab === 'calculator' && <CostCalculator />}
      </main>

      <footer className="app-footer">
        <p>신발 공동구매로 똑똑하게 절약하세요! 💰</p>
      </footer>
    </div>
  );
};

export default ShoeSplitApp;

import React from 'react';
import { calculateSplitCost } from '../utils';
import './DealCard.css';

const DealCard = ({ deal }) => {
  const costInfo = calculateSplitCost(deal.originalPrice);
  const isExpired = new Date(deal.expiryDate) < new Date();

  return (
    <div className={`deal-card ${isExpired ? 'expired' : ''}`}>
      {isExpired && <div className="expired-badge">만료됨</div>}

      <div className="deal-header">
        <h3>{deal.shoeModel}</h3>
        <p className="store-name">{deal.storeName}</p>
      </div>

      <div className="deal-details">
        {deal.distance !== undefined && (
          <div className="distance-badge">
            📍 {deal.distance}km
          </div>
        )}

        <div className="price-info">
          <div className="original-price">
            정가: ₩{deal.originalPrice.toLocaleString()}
          </div>
          <div className="split-price">
            나의 부담금: <span>₩{Math.round(costInfo.costPerPerson).toLocaleString()}</span>
          </div>
          <div className="savings">
            절약: ₩{Math.round(costInfo.savings).toLocaleString()} ({costInfo.savingsPercent}%)
          </div>
        </div>

        <div className="deal-meta">
          <div>연락처: {deal.contactInfo}</div>
          <div>유효기간: {new Date(deal.expiryDate).toLocaleDateString('ko-KR')}</div>
        </div>

        <div className="deal-breakdown">
          <h4>비용 상세:</h4>
          <ul>
            <li>첫번째 신발: ₩{Math.round(costInfo.firstShoePrice).toLocaleString()}</li>
            <li>두번째 신발 (50% 할인): ₩{Math.round(costInfo.secondShoePrice).toLocaleString()}</li>
            <li>총 금액: ₩{Math.round(costInfo.totalPrice).toLocaleString()}</li>
            <li className="highlight">1인당 부담: ₩{Math.round(costInfo.costPerPerson).toLocaleString()}</li>
          </ul>
        </div>
      </div>

      <button className="contact-btn" disabled={isExpired}>
        연락하기
      </button>
    </div>
  );
};

export default DealCard;

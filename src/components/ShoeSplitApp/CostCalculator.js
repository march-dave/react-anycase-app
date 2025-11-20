import React, { useState } from 'react';
import './CostCalculator.css';

const CostCalculator = ({ originalPrice = 100000, storeName }) => {
  const [firstShoePrice, setFirstShoePrice] = useState(originalPrice);
  const [secondShoePrice, setSecondShoePrice] = useState(originalPrice);

  // 1+1 50% 할인 계산
  const discountedSecondPrice = secondShoePrice * 0.5;
  const totalPrice = firstShoePrice + discountedSecondPrice;
  const pricePerPerson = totalPrice / 2;
  const savings = (firstShoePrice + secondShoePrice - totalPrice) / 2;
  const savingsPercent = ((savings / firstShoePrice) * 100).toFixed(1);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(price));
  };

  return (
    <div className="cost-calculator">
      <h3 className="calculator-title">💰 비용 계산기</h3>

      <div className="calculator-inputs">
        <div className="price-input-group">
          <label>첫 번째 신발 가격</label>
          <input
            type="number"
            value={firstShoePrice}
            onChange={(e) => setFirstShoePrice(Number(e.target.value))}
            placeholder="가격 입력"
          />
          <span className="currency">원</span>
        </div>

        <div className="price-input-group">
          <label>두 번째 신발 가격</label>
          <input
            type="number"
            value={secondShoePrice}
            onChange={(e) => setSecondShoePrice(Number(e.target.value))}
            placeholder="가격 입력"
          />
          <span className="currency">원</span>
        </div>
      </div>

      <div className="calculation-breakdown">
        <div className="breakdown-row">
          <span>첫 번째 신발</span>
          <span className="price">{formatPrice(firstShoePrice)}원</span>
        </div>

        <div className="breakdown-row discount">
          <span>두 번째 신발 (50% 할인)</span>
          <span className="price">
            <s>{formatPrice(secondShoePrice)}원</s>
            {' '}
            {formatPrice(discountedSecondPrice)}원
          </span>
        </div>

        <div className="breakdown-divider"></div>

        <div className="breakdown-row total">
          <span>총 가격</span>
          <span className="price">{formatPrice(totalPrice)}원</span>
        </div>

        <div className="breakdown-row highlight">
          <span>👥 1인당 부담금</span>
          <span className="price-per-person">{formatPrice(pricePerPerson)}원</span>
        </div>

        <div className="savings-info">
          <div className="savings-badge">
            ✨ 혼자 살 때보다 <strong>{formatPrice(savings)}원</strong> 절약!
            <span className="savings-percent">({savingsPercent}% 할인)</span>
          </div>
        </div>
      </div>

      <div className="calculator-note">
        <p>💡 공동구매로 똑똑하게 절약하세요!</p>
      </div>
    </div>
  );
};

export default CostCalculator;

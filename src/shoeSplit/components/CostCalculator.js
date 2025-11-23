import React, { useState } from 'react';
import { calculateSplitCost } from '../utils';
import './CostCalculator.css';

const CostCalculator = () => {
  const [price, setPrice] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const originalPrice = parseFloat(price);
    if (isNaN(originalPrice) || originalPrice <= 0) {
      alert('올바른 가격을 입력해주세요.');
      return;
    }

    const costInfo = calculateSplitCost(originalPrice);
    setResult(costInfo);
  };

  return (
    <div className="cost-calculator">
      <h2>비용 계산기</h2>
      <p className="description">
        1+1 할인(두번째 신발 50% 할인)을 공동구매할 때 1인당 부담금을 계산합니다.
      </p>

      <div className="calculator-input">
        <label>신발 정가 (₩):</label>
        <div className="input-group">
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="예: 150000"
            min="0"
            step="1000"
          />
          <button onClick={handleCalculate}>계산하기</button>
        </div>
      </div>

      {result && (
        <div className="calculator-result">
          <h3>계산 결과</h3>

          <div className="result-section">
            <div className="result-item total">
              <span>1인당 부담금</span>
              <strong>₩{Math.round(result.costPerPerson).toLocaleString()}</strong>
            </div>

            <div className="result-item savings">
              <span>절약 금액</span>
              <strong>₩{Math.round(result.savings).toLocaleString()} ({result.savingsPercent}%)</strong>
            </div>
          </div>

          <div className="breakdown">
            <h4>상세 내역</h4>
            <table>
              <tbody>
                <tr>
                  <td>첫번째 신발 (정가)</td>
                  <td>₩{Math.round(result.firstShoePrice).toLocaleString()}</td>
                </tr>
                <tr>
                  <td>두번째 신발 (50% 할인)</td>
                  <td>₩{Math.round(result.secondShoePrice).toLocaleString()}</td>
                </tr>
                <tr className="total-row">
                  <td>총 금액</td>
                  <td>₩{Math.round(result.totalPrice).toLocaleString()}</td>
                </tr>
                <tr className="split-row">
                  <td>÷ 2명</td>
                  <td></td>
                </tr>
                <tr className="final-row">
                  <td><strong>1인당 부담금</strong></td>
                  <td><strong>₩{Math.round(result.costPerPerson).toLocaleString()}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="comparison">
            <div className="compare-item original">
              <div className="label">혼자 구매 시</div>
              <div className="value">₩{Math.round(result.originalPrice).toLocaleString()}</div>
            </div>
            <div className="arrow">→</div>
            <div className="compare-item discounted">
              <div className="label">공동구매 시</div>
              <div className="value">₩{Math.round(result.costPerPerson).toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CostCalculator;

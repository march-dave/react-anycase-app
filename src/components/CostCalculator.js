import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0 0 20px 0;
  color: #333;
  text-align: center;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const CalculationBreakdown = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
`;

const BreakdownRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
    font-weight: bold;
    font-size: 1.2em;
    color: #667eea;
    margin-top: 10px;
    padding-top: 15px;
    border-top: 2px solid #667eea;
  }
`;

const BreakdownLabel = styled.span`
  color: #666;
`;

const BreakdownValue = styled.span`
  color: #333;
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
`;

const SavingsHighlight = styled.div`
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  margin: 20px 0;
  font-size: 1.3em;
  font-weight: bold;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const MatchInfo = styled.div`
  background: #e8f5e9;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background: white;
  border-radius: 8px;
  margin-bottom: 10px;
`;

function CostCalculator({ store, matchedUser }) {
  const [firstShoePrice, setFirstShoePrice] = useState('100000');
  const [secondShoePrice, setSecondShoePrice] = useState('100000');

  const calculateCosts = () => {
    const price1 = parseFloat(firstShoePrice) || 0;
    const price2 = parseFloat(secondShoePrice) || 0;

    // 두 번째 신발 50% 할인
    const discountedPrice2 = price2 * 0.5;

    // 총 비용
    const totalCost = price1 + discountedPrice2;

    // 각자 부담 비용 (50%)
    const costPerPerson = totalCost / 2;

    // 정상가 대비 절약액
    const normalPrice = price1 + price2;
    const totalSavings = normalPrice - totalCost;
    const savingsPerPerson = totalSavings / 2;
    const savingsPercentage = ((savingsPerPerson / price1) * 100).toFixed(1);

    return {
      price1,
      price2,
      discountedPrice2,
      totalCost,
      costPerPerson,
      normalPrice,
      totalSavings,
      savingsPerPerson,
      savingsPercentage
    };
  };

  const costs = calculateCosts();

  const handlePurchase = () => {
    alert(`구매가 완료되었습니다!\n\n${matchedUser.name}님과 함께 총 ${costs.totalCost.toLocaleString()}원을 결제합니다.\n각자 부담: ${costs.costPerPerson.toLocaleString()}원\n\n절약한 금액: ${costs.savingsPerPerson.toLocaleString()}원 (${costs.savingsPercentage}%)`);
  };

  return (
    <Container>
      <Card>
        <Title>💰 비용 계산</Title>

        <MatchInfo>
          <strong>🤝 매칭 정보</strong>
          <InfoRow>
            <span>매장:</span>
            <span>{store.name}</span>
          </InfoRow>
          <InfoRow>
            <span>파트너:</span>
            <span>{matchedUser.name}</span>
          </InfoRow>
        </MatchInfo>

        <InputGroup>
          <Label>첫 번째 신발 가격 (원)</Label>
          <Input
            type="number"
            value={firstShoePrice}
            onChange={(e) => setFirstShoePrice(e.target.value)}
            placeholder="첫 번째 신발 가격 입력"
          />
        </InputGroup>

        <InputGroup>
          <Label>두 번째 신발 가격 (원)</Label>
          <Input
            type="number"
            value={secondShoePrice}
            onChange={(e) => setSecondShoePrice(e.target.value)}
            placeholder="두 번째 신발 가격 입력"
          />
        </InputGroup>

        <CalculationBreakdown>
          <BreakdownRow>
            <BreakdownLabel>첫 번째 신발 (정가)</BreakdownLabel>
            <BreakdownValue>{costs.price1.toLocaleString()}원</BreakdownValue>
          </BreakdownRow>
          <BreakdownRow>
            <BreakdownLabel>두 번째 신발 (정가)</BreakdownLabel>
            <BreakdownValue>{costs.price2.toLocaleString()}원</BreakdownValue>
          </BreakdownRow>
          <BreakdownRow>
            <BreakdownLabel>두 번째 신발 (50% 할인 적용)</BreakdownLabel>
            <BreakdownValue bold>{costs.discountedPrice2.toLocaleString()}원</BreakdownValue>
          </BreakdownRow>
          <BreakdownRow>
            <BreakdownLabel>📦 총 구매 금액</BreakdownLabel>
            <BreakdownValue bold>{costs.totalCost.toLocaleString()}원</BreakdownValue>
          </BreakdownRow>
          <BreakdownRow>
            <BreakdownLabel>👤 각자 부담 금액 (50%)</BreakdownLabel>
            <BreakdownValue>{costs.costPerPerson.toLocaleString()}원</BreakdownValue>
          </BreakdownRow>
        </CalculationBreakdown>

        <SavingsHighlight>
          🎉 1인당 {costs.savingsPerPerson.toLocaleString()}원 절약!
          <div style={{ fontSize: '0.8em', marginTop: '10px' }}>
            (정상가 대비 {costs.savingsPercentage}% 할인)
          </div>
        </SavingsHighlight>

        <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          <strong>💡 절약 요약:</strong>
          <div style={{ marginTop: '10px' }}>
            <div>• 정상가 합계: {costs.normalPrice.toLocaleString()}원</div>
            <div>• 할인 적용 후: {costs.totalCost.toLocaleString()}원</div>
            <div>• 총 절약액: {costs.totalSavings.toLocaleString()}원</div>
          </div>
        </div>

        <Button onClick={handlePurchase}>
          구매 완료하기
        </Button>
      </Card>
    </Container>
  );
}

export default CostCalculator;

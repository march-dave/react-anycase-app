import React, { useState } from 'react';
import CostCalculator from './CostCalculator';
import './CreateRequest.css';

const CreateRequest = ({ selectedStore }) => {
  const [formData, setFormData] = useState({
    userName: '',
    phoneNumber: '',
    storeName: selectedStore && selectedStore.name ? selectedStore.name : '',
    storeAddress: selectedStore && selectedStore.address ? selectedStore.address : '',
    shoeModel: '',
    shoeSize: '',
    price: selectedStore && selectedStore.popularShoe && selectedStore.popularShoe.price ? selectedStore.popularShoe.price : 100000,
    meetingDate: '',
    meetingTime: '',
    additionalInfo: ''
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 필수 항목 검증
    if (!formData.userName || !formData.phoneNumber || !formData.storeName ||
        !formData.shoeModel || !formData.price || !formData.meetingDate || !formData.meetingTime) {
      alert('필수 항목을 모두 입력해주세요!');
      return;
    }

    // 전화번호 형식 검증 (간단한 검증)
    const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
    if (!phoneRegex.test(formData.phoneNumber.replace(/\s/g, ''))) {
      alert('올바른 전화번호 형식을 입력해주세요. (예: 010-1234-5678)');
      return;
    }

    setShowPreview(true);
  };

  const handleConfirmRequest = () => {
    alert(`공동구매 요청이 등록되었습니다!\n\n다른 사용자들이 곧 응답할 거예요 😊`);

    // 폼 초기화
    setFormData({
      userName: '',
      phoneNumber: '',
      storeName: '',
      storeAddress: '',
      shoeModel: '',
      shoeSize: '',
      price: 100000,
      meetingDate: '',
      meetingTime: '',
      additionalInfo: ''
    });
    setShowPreview(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(price));
  };

  if (showPreview) {
    const splitCost = (formData.price + formData.price * 0.5) / 2;
    const savings = formData.price - splitCost;

    return (
      <div className="request-preview-container">
        <h2>📋 요청 미리보기</h2>

        <div className="preview-card">
          <div className="preview-section">
            <h3>👤 요청자 정보</h3>
            <p><strong>이름:</strong> {formData.userName}</p>
            <p><strong>연락처:</strong> {formData.phoneNumber}</p>
          </div>

          <div className="preview-section">
            <h3>📍 매장 정보</h3>
            <p><strong>매장:</strong> {formData.storeName}</p>
            <p><strong>주소:</strong> {formData.storeAddress || '매장에서 만나요'}</p>
          </div>

          <div className="preview-section">
            <h3>👟 신발 정보</h3>
            <p><strong>모델:</strong> {formData.shoeModel}</p>
            {formData.shoeSize && <p><strong>사이즈:</strong> {formData.shoeSize}</p>}
            <p><strong>가격:</strong> {formatPrice(formData.price)}원</p>
          </div>

          <div className="preview-section">
            <h3>⏰ 만남 정보</h3>
            <p><strong>날짜:</strong> {formData.meetingDate}</p>
            <p><strong>시간:</strong> {formData.meetingTime}</p>
          </div>

          {formData.additionalInfo && (
            <div className="preview-section">
              <h3>📝 추가 정보</h3>
              <p>{formData.additionalInfo}</p>
            </div>
          )}

          <div className="preview-section cost-preview">
            <h3>💰 비용 정보</h3>
            <div className="cost-breakdown">
              <p>원래 가격: {formatPrice(formData.price)}원</p>
              <p className="highlight">1인당 부담금: {formatPrice(splitCost)}원</p>
              <p className="savings">절약 금액: {formatPrice(savings)}원</p>
            </div>
          </div>
        </div>

        <div className="preview-actions">
          <button
            className="btn-back"
            onClick={() => setShowPreview(false)}
          >
            ← 수정하기
          </button>
          <button
            className="btn-confirm"
            onClick={handleConfirmRequest}
          >
            ✅ 요청 등록하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="create-request-container">
      <div className="create-request-header">
        <h2>➕ 공동구매 요청 만들기</h2>
        <p className="header-subtitle">함께 구매할 파트너를 찾아보세요!</p>
      </div>

      <form onSubmit={handleSubmit} className="request-form">
        <div className="form-section">
          <h3>👤 요청자 정보</h3>

          <div className="form-group">
            <label htmlFor="userName">이름 *</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              placeholder="홍길동"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">연락처 *</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="010-1234-5678"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>📍 매장 정보</h3>

          <div className="form-group">
            <label htmlFor="storeName">매장명 *</label>
            <input
              type="text"
              id="storeName"
              name="storeName"
              value={formData.storeName}
              onChange={handleInputChange}
              placeholder="나이키 강남점"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="storeAddress">매장 주소</label>
            <input
              type="text"
              id="storeAddress"
              name="storeAddress"
              value={formData.storeAddress}
              onChange={handleInputChange}
              placeholder="서울시 강남구 테헤란로 123"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>👟 신발 정보</h3>

          <div className="form-group">
            <label htmlFor="shoeModel">신발 모델 *</label>
            <input
              type="text"
              id="shoeModel"
              name="shoeModel"
              value={formData.shoeModel}
              onChange={handleInputChange}
              placeholder="에어맥스 270"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="shoeSize">사이즈 (선택)</label>
              <input
                type="text"
                id="shoeSize"
                name="shoeSize"
                value={formData.shoeSize}
                onChange={handleInputChange}
                placeholder="270mm"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">가격 *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="149000"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>⏰ 만남 정보</h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="meetingDate">날짜 *</label>
              <input
                type="date"
                id="meetingDate"
                name="meetingDate"
                value={formData.meetingDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="meetingTime">시간 *</label>
              <input
                type="time"
                id="meetingTime"
                name="meetingTime"
                value={formData.meetingTime}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>📝 추가 정보</h3>

          <div className="form-group">
            <label htmlFor="additionalInfo">추가 메시지 (선택)</label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              placeholder="함께 구매하고 싶은 신발에 대한 추가 정보나 요청사항을 입력해주세요."
              rows="4"
            />
          </div>
        </div>

        {formData.price > 0 && (
          <div className="calculator-preview">
            <CostCalculator originalPrice={formData.price} />
          </div>
        )}

        <button type="submit" className="submit-btn">
          📝 요청서 작성 완료
        </button>
      </form>
    </div>
  );
};

export default CreateRequest;

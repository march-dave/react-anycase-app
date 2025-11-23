import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addShoeDeal } from '../actions';
import './ShoeDealForm.css';

const ShoeDealForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    storeName: '',
    shoeModel: '',
    originalPrice: '',
    location: { lat: '', lng: '' },
    contactInfo: '',
    expiryDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: parseFloat(value) || ''
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const deal = {
      ...formData,
      originalPrice: parseFloat(formData.originalPrice),
      createdAt: new Date().toISOString(),
      status: 'available'
    };

    dispatch(addShoeDeal(deal));

    // 폼 초기화
    setFormData({
      storeName: '',
      shoeModel: '',
      originalPrice: '',
      location: { lat: '', lng: '' },
      contactInfo: '',
      expiryDate: ''
    });

    alert('신발 딜이 등록되었습니다!');
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }));
        },
        (error) => {
          alert('위치를 가져올 수 없습니다: ' + error.message);
        }
      );
    } else {
      alert('브라우저가 위치 정보를 지원하지 않습니다.');
    }
  };

  return (
    <div className="shoe-deal-form">
      <h2>신발 공동구매 등록</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>가게 이름:</label>
          <input
            type="text"
            name="storeName"
            value={formData.storeName}
            onChange={handleChange}
            required
            placeholder="예: 나이키 강남점"
          />
        </div>

        <div className="form-group">
          <label>신발 모델:</label>
          <input
            type="text"
            name="shoeModel"
            value={formData.shoeModel}
            onChange={handleChange}
            required
            placeholder="예: 에어맥스 270"
          />
        </div>

        <div className="form-group">
          <label>정가 (₩):</label>
          <input
            type="number"
            name="originalPrice"
            value={formData.originalPrice}
            onChange={handleChange}
            required
            min="0"
            step="1000"
            placeholder="예: 150000"
          />
        </div>

        <div className="form-group">
          <label>위치:</label>
          <div className="location-input">
            <input
              type="number"
              name="lat"
              value={formData.location.lat}
              onChange={handleLocationChange}
              placeholder="위도"
              step="any"
              required
            />
            <input
              type="number"
              name="lng"
              value={formData.location.lng}
              onChange={handleLocationChange}
              placeholder="경도"
              step="any"
              required
            />
            <button type="button" onClick={getCurrentLocation}>
              현재 위치
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>연락처:</label>
          <input
            type="text"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            required
            placeholder="예: 010-1234-5678"
          />
        </div>

        <div className="form-group">
          <label>유효기간:</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          등록하기
        </button>
      </form>
    </div>
  );
};

export default ShoeDealForm;

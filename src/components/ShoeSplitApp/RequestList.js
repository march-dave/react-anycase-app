import React, { useState } from 'react';
import { connect } from 'react-redux';
import './RequestList.css';

const RequestList = ({ requests }) => {
  const [filter, setFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);

  // 샘플 요청 데이터
  const sampleRequests = [
    {
      id: 1,
      userName: '김철수',
      storeName: '나이키 강남점',
      shoeModel: '에어맥스 270',
      shoeSize: '270mm',
      price: 149000,
      splitCost: 111750,
      meetingTime: '오늘 오후 3시',
      distance: '0.5km',
      status: 'waiting',
      createdAt: '10분 전'
    },
    {
      id: 2,
      userName: '이영희',
      storeName: '아디다스 홍대점',
      shoeModel: '울트라부스트',
      shoeSize: '250mm',
      price: 189000,
      splitCost: 141750,
      meetingTime: '오늘 오후 5시',
      distance: '1.2km',
      status: 'waiting',
      createdAt: '25분 전'
    },
    {
      id: 3,
      userName: '박민수',
      storeName: '뉴발란스 신촌점',
      shoeModel: '530 시리즈',
      shoeSize: '280mm',
      price: 119000,
      splitCost: 89250,
      meetingTime: '내일 오전 11시',
      distance: '0.8km',
      status: 'waiting',
      createdAt: '1시간 전'
    },
    {
      id: 4,
      userName: '최지은',
      storeName: '푸마 명동점',
      shoeModel: 'RS-X',
      shoeSize: '240mm',
      price: 129000,
      splitCost: 96750,
      meetingTime: '오늘 오후 7시',
      distance: '2.1km',
      status: 'matched',
      createdAt: '2시간 전'
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(price));
  };

  const filteredRequests = sampleRequests.filter((req) => {
    if (filter === 'all') return true;
    if (filter === 'waiting') return req.status === 'waiting';
    if (filter === 'matched') return req.status === 'matched';
    return true;
  });

  const handleAcceptRequest = (request) => {
    alert(`${request.userName}님의 요청을 수락했습니다!\n\n매장: ${request.storeName}\n만남 시간: ${request.meetingTime}\n1인당 비용: ${formatPrice(request.splitCost)}원`);
  };

  return (
    <div className="request-list-container">
      <div className="request-list-header">
        <h2>공동구매 요청 목록</h2>
        <p className="request-count">총 {filteredRequests.length}개의 요청</p>
      </div>

      <div className="filter-buttons">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          전체
        </button>
        <button
          className={`filter-btn ${filter === 'waiting' ? 'active' : ''}`}
          onClick={() => setFilter('waiting')}
        >
          대기중
        </button>
        <button
          className={`filter-btn ${filter === 'matched' ? 'active' : ''}`}
          onClick={() => setFilter('matched')}
        >
          매칭완료
        </button>
      </div>

      <div className="requests-grid">
        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className={`request-card ${request.status}`}
          >
            <div className="request-header">
              <div className="user-info">
                <span className="user-avatar">👤</span>
                <span className="user-name">{request.userName}</span>
              </div>
              <span className="time-badge">{request.createdAt}</span>
            </div>

            <div className="request-store">
              <h3>{request.storeName}</h3>
              <span className="distance-badge">{request.distance}</span>
            </div>

            <div className="shoe-details">
              <p className="shoe-model">👟 {request.shoeModel}</p>
              <p className="shoe-size">📏 사이즈: {request.shoeSize}</p>
            </div>

            <div className="meeting-info">
              <p>⏰ 만남 시간: <strong>{request.meetingTime}</strong></p>
            </div>

            <div className="cost-info">
              <div className="cost-row">
                <span>원래 가격</span>
                <span className="original-price">{formatPrice(request.price)}원</span>
              </div>
              <div className="cost-row highlight">
                <span>1인당 부담금</span>
                <span className="split-cost">{formatPrice(request.splitCost)}원</span>
              </div>
              <div className="savings">
                💰 {formatPrice(request.price - request.splitCost)}원 절약
              </div>
            </div>

            {request.status === 'waiting' ? (
              <button
                className="accept-btn"
                onClick={() => handleAcceptRequest(request)}
              >
                🤝 함께 구매하기
              </button>
            ) : (
              <div className="matched-badge">
                ✅ 매칭 완료
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="empty-state">
          <p>😔 요청이 없습니다</p>
          <p>새로운 요청을 만들어보세요!</p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  requests: state.requests || []
});

export default connect(mapStateToProps)(RequestList);

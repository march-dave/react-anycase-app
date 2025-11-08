// UserCreatePopup.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserCreatePopup.css';

const UserCreatePopup = ({ onClose, onSubmit }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    planId: 'max' // Default to max plan with $1000 credits
  });
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch available plans on component mount
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('/api/plans');
        setPlans(response.data);
        // Find and set the max plan by default
        const maxPlan = response.data.find(p => p.id === 'max');
        if (maxPlan) {
          setSelectedPlan(maxPlan);
          setUserData(prev => ({ ...prev, planId: maxPlan.id }));
        }
      } catch (err) {
        console.error('Error fetching plans:', err);
        setError('플랜을 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setUserData(prev => ({ ...prev, planId: plan.id }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }

    if (!userData.email.trim()) {
      alert('이메일을 입력해주세요.');
      return;
    }

    if (!selectedPlan) {
      alert('플랜을 선택해주세요.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post('/api/users', {
        name: userData.name,
        email: userData.email,
        planId: userData.planId
      });

      if (response.data.success) {
        alert(`사용자 생성 완료! ${selectedPlan.credits} 크레딧이 할당되었습니다.`);
        if (onSubmit) {
          await onSubmit(response.data.user);
        }
        onClose(); // Close popup after successful creation
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setError(error.response?.data?.error || '유저 생성 중 오류가 발생했습니다.');
      alert(error.response?.data?.error || '유저 생성 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="popup">
        <div className="popup-content">
          <p>플랜을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-header">
          <h2>새 사용자 생성</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="popup-form">
          {error && <div className="error-message">{error}</div>}

          {/* User Information Section */}
          <div className="form-section">
            <h3>사용자 정보</h3>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              placeholder="이름"
              disabled={submitting}
              required
            />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="이메일"
              disabled={submitting}
              required
            />
          </div>

          {/* Plan Selection Section */}
          <div className="form-section">
            <h3>플랜 선택</h3>
            <p className="section-info">API 사용을 위한 크레딧이 할당됩니다.</p>

            <div className="plans-grid">
              {plans.map(plan => (
                <div
                  key={plan.id}
                  className={`plan-card ${selectedPlan?.id === plan.id ? 'selected' : ''} ${plan.id === 'max' ? 'highlighted' : ''}`}
                  onClick={() => handlePlanSelect(plan)}
                >
                  <div className="plan-name">{plan.name}</div>
                  <div className="plan-credits">${plan.credits}</div>
                  <div className="plan-description">{plan.description}</div>
                  {plan.id === 'max' && <div className="badge">추천</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Selected Plan Summary */}
          {selectedPlan && (
            <div className="plan-summary">
              <div className="summary-item">
                <span className="label">선택된 플랜:</span>
                <span className="value">{selectedPlan.name}</span>
              </div>
              <div className="summary-item highlight">
                <span className="label">할당될 크레딧:</span>
                <span className="value">${selectedPlan.credits}</span>
              </div>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="form-actions">
            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
            >
              {submitting ? '생성 중...' : '사용자 생성'}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={submitting}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserCreatePopup;

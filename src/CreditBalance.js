import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setUserCredits } from './Action';
import './CreditBalance.css';

const CreditBalance = ({ userId }) => {
  const dispatch = useDispatch();
  const userCredits = useSelector(state => state.userCredits);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchCredits = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/users/${userId}/credits`);
        dispatch(setUserCredits({
          credits: response.data.credits,
          maxCredits: response.data.maxCredits,
          plan: response.data.plan
        }));
      } catch (err) {
        console.error('Error fetching credits:', err);
        setError('크레딧 정보를 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, [userId, dispatch]);

  if (loading) {
    return <div className="credit-balance loading">크레딧 정보 로드 중...</div>;
  }

  if (error) {
    return <div className="credit-balance error">{error}</div>;
  }

  const percentage = (userCredits.credits / userCredits.maxCredits) * 100;
  const statusClass = percentage > 30 ? 'good' : percentage > 10 ? 'warning' : 'critical';

  return (
    <div className="credit-balance">
      <div className="credit-header">
        <h3>API 크레딧</h3>
        <span className={`credit-status ${statusClass}`}>${userCredits.credits}</span>
      </div>

      <div className="credit-details">
        <div className="credit-info">
          <span className="label">플랜:</span>
          <span className="value">{userCredits.plan || 'No Plan'}</span>
        </div>
        <div className="credit-info">
          <span className="label">최대 크레딧:</span>
          <span className="value">${userCredits.maxCredits}</span>
        </div>
      </div>

      <div className="credit-progress">
        <div className="progress-bar">
          <div
            className={`progress-fill ${statusClass}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="progress-text">
          <span>${userCredits.credits}</span>
          <span>/ ${userCredits.maxCredits}</span>
        </div>
      </div>

      {userCredits.credits < userCredits.maxCredits * 0.2 && (
        <div className="credit-warning">
          ⚠️ 크레딧이 부족합니다. 플랜을 업그레이드하거나 크레딧을 추가해주세요.
        </div>
      )}
    </div>
  );
};

export default CreditBalance;

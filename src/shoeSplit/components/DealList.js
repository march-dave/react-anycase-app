import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserLocation } from '../actions';
import { getNearbyDeals } from '../utils';
import DealCard from './DealCard';
import './DealList.css';

const DealList = () => {
  const dispatch = useDispatch();
  const deals = useSelector(state => state.shoeSplit?.deals || []);
  const userLocation = useSelector(state => state.shoeSplit?.userLocation);
  const [maxDistance, setMaxDistance] = useState(5);
  const [nearbyDeals, setNearbyDeals] = useState([]);

  useEffect(() => {
    // 컴포넌트 마운트 시 사용자 위치 가져오기
    if (!userLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }));
        },
        (error) => {
          console.error('위치 가져오기 실패:', error);
        }
      );
    }
  }, [dispatch, userLocation]);

  useEffect(() => {
    const filtered = getNearbyDeals(deals, userLocation, maxDistance);
    setNearbyDeals(filtered);
  }, [deals, userLocation, maxDistance]);

  return (
    <div className="deal-list">
      <div className="deal-list-header">
        <h2>근처 신발 공동구매</h2>
        <div className="distance-filter">
          <label>
            최대 거리: {maxDistance}km
            <input
              type="range"
              min="1"
              max="20"
              value={maxDistance}
              onChange={(e) => setMaxDistance(parseInt(e.target.value))}
            />
          </label>
        </div>
      </div>

      {!userLocation && (
        <div className="location-warning">
          위치 정보를 사용할 수 없습니다. 거리 계산이 제한됩니다.
        </div>
      )}

      <div className="deals-container">
        {nearbyDeals.length === 0 ? (
          <div className="no-deals">
            근처에 등록된 딜이 없습니다.
          </div>
        ) : (
          nearbyDeals.map(deal => (
            <DealCard key={deal.id} deal={deal} />
          ))
        )}
      </div>
    </div>
  );
};

export default DealList;

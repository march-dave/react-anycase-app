/**
 * 신발 공동구매 비용 계산
 * 1+1 할인: 첫번째 신발 정가, 두번째 신발 50% 할인
 *
 * @param {number} originalPrice - 신발 정가
 * @returns {object} 비용 계산 결과
 */
export const calculateSplitCost = (originalPrice) => {
  const firstShoePrice = originalPrice;
  const secondShoePrice = originalPrice * 0.5;
  const totalPrice = firstShoePrice + secondShoePrice;
  const costPerPerson = totalPrice / 2;
  const savings = originalPrice - costPerPerson;
  const savingsPercent = (savings / originalPrice) * 100;

  return {
    originalPrice,
    firstShoePrice,
    secondShoePrice,
    totalPrice,
    costPerPerson,
    savings,
    savingsPercent: Math.round(savingsPercent)
  };
};

/**
 * 두 지점 간의 거리를 계산 (Haversine formula)
 *
 * @param {object} location1 - {lat, lng}
 * @param {object} location2 - {lat, lng}
 * @returns {number} 거리 (km)
 */
export const calculateDistance = (location1, location2) => {
  const R = 6371; // 지구 반지름 (km)
  const dLat = toRad(location2.lat - location1.lat);
  const dLon = toRad(location2.lng - location1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(location1.lat)) * Math.cos(toRad(location2.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // 소수점 첫째자리까지
};

const toRad = (degree) => {
  return degree * (Math.PI / 180);
};

/**
 * 근처 딜 필터링
 *
 * @param {array} deals - 전체 딜 목록
 * @param {object} userLocation - 사용자 위치 {lat, lng}
 * @param {number} maxDistance - 최대 거리 (km)
 * @returns {array} 필터링된 딜 목록
 */
export const getNearbyDeals = (deals, userLocation, maxDistance = 5) => {
  if (!userLocation) return deals;

  return deals
    .map(deal => ({
      ...deal,
      distance: calculateDistance(userLocation, deal.location)
    }))
    .filter(deal => deal.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance);
};

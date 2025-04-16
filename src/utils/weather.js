const axios = require('axios');

/**
 * 토론토의 날씨 정보를 OpenWeatherMap API를 통해 가져옵니다.
 * @returns {Promise<Object>} 현재 날씨와 5일 예보 데이터
 */
async function getTorontoWeather() {
  try {
    // OpenWeatherMap API에서는 API 키가 필요합니다.
    // 실제 구현 시에는 .env 파일이나 환경 변수에서 가져오는 것이 좋습니다.
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || 'YOUR_API_KEY_HERE';
    const TORONTO_LAT = 43.6532;
    const TORONTO_LON = -79.3832;
    
    // 현재 날씨 가져오기
    const currentWeatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${TORONTO_LAT}&lon=${TORONTO_LON}&units=metric&appid=${API_KEY}`
    );
    
    // 5일 예보 가져오기
    const forecastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${TORONTO_LAT}&lon=${TORONTO_LON}&units=metric&appid=${API_KEY}`
    );
    
    // 현재 날씨 데이터 구성
    const current = {
      temperature: `${Math.round(currentWeatherResponse.data.main.temp)}°C`,
      condition: currentWeatherResponse.data.weather[0].description,
      feelsLike: `${Math.round(currentWeatherResponse.data.main.feels_like)}°C`,
      humidity: `${currentWeatherResponse.data.main.humidity}%`,
      windSpeed: `${currentWeatherResponse.data.wind.speed} m/s`
    };
    
    // 5일 예보 데이터 구성 (3시간 간격 데이터를 일별로 그룹화)
    const dailyForecasts = {};
    
    forecastResponse.data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString('ko-KR', { weekday: 'short' });
      
      if (!dailyForecasts[day]) {
        dailyForecasts[day] = {
          day,
          high: item.main.temp_max,
          low: item.main.temp_min,
          conditions: new Set([item.weather[0].description])
        };
      } else {
        dailyForecasts[day].high = Math.max(dailyForecasts[day].high, item.main.temp_max);
        dailyForecasts[day].low = Math.min(dailyForecasts[day].low, item.main.temp_min);
        dailyForecasts[day].conditions.add(item.weather[0].description);
      }
    });
    
    // Set을 배열로 변환하고 가장 일반적인 상태 선택
    const forecast = Object.values(dailyForecasts).map(day => ({
      day: day.day,
      high: `${Math.round(day.high)}°C`,
      low: `${Math.round(day.low)}°C`,
      condition: Array.from(day.conditions)[0]
    }));
    
    return {
      current,
      forecast: forecast.slice(0, 5) // 최대 5일 예보로 제한
    };
  } catch (error) {
    console.error('날씨 데이터를 가져오는 중 오류가 발생했습니다:', error);
    throw error;
  }
}

module.exports = {
  getTorontoWeather
}; 
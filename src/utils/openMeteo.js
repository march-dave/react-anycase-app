const axios = require('axios');
const { toronto, requireNumber, formatTemperature } = require('./weatherData');

const forecastDays = 5;
const weekdayFormatter = new Intl.DateTimeFormat('ko-KR', { weekday: 'short', timeZone: 'UTC' });

// WMO weather interpretation codes used by Open-Meteo.
const conditionLabels = {
  0: '맑음', 1: '대체로 맑음', 2: '구름 조금', 3: '흐림',
  45: '안개', 48: '착빙성 안개',
  51: '약한 이슬비', 53: '이슬비', 55: '강한 이슬비',
  56: '약한 어는 이슬비', 57: '강한 어는 이슬비',
  61: '약한 비', 63: '비', 65: '강한 비',
  66: '약한 어는 비', 67: '강한 어는 비',
  71: '약한 눈', 73: '눈', 75: '강한 눈', 77: '눈알갱이',
  80: '약한 소나기', 81: '소나기', 82: '강한 소나기',
  85: '약한 소낙눈', 86: '강한 소낙눈',
  95: '뇌우', 96: '약한 우박을 동반한 뇌우',
  97: '강한 뇌우', 99: '강한 우박을 동반한 뇌우'
};

function condition(code) {
  if (!Number.isInteger(code)) throw new Error('Invalid Open-Meteo weather code');
  return conditionLabels[code] || '날씨 상태 미상';
}

function localWeekday(isoDate) {
  // The provider already gives the Toronto calendar date. Keep that date in UTC for formatting.
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== isoDate) {
    throw new Error('Invalid Open-Meteo forecast date');
  }
  return weekdayFormatter.format(date);
}

async function getOpenMeteoWeather() {
  const { data } = await axios.get('https://api.open-meteo.com/v1/forecast', {
    timeout: 5000,
    params: {
      latitude: toronto.latitude,
      longitude: toronto.longitude,
      timezone: toronto.timeZone,
      forecast_days: forecastDays,
      temperature_unit: 'celsius',
      wind_speed_unit: 'ms',
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
      daily: 'temperature_2m_max,temperature_2m_min,weather_code'
    }
  });

  const { current, daily } = data || {};
  if (!current || !daily) throw new Error('Incomplete Open-Meteo forecast');
  const columns = [daily.time, daily.temperature_2m_max, daily.temperature_2m_min, daily.weather_code];
  if (!columns.every(column => Array.isArray(column) && column.length === forecastDays)) {
    throw new Error('Incomplete Open-Meteo daily forecast');
  }

  return {
    current: {
      temperature: formatTemperature(current.temperature_2m),
      condition: condition(current.weather_code),
      feelsLike: formatTemperature(current.apparent_temperature),
      humidity: `${requireNumber(current.relative_humidity_2m)}%`,
      windSpeed: `${requireNumber(current.wind_speed_10m)} m/s`
    },
    forecast: daily.time.map((date, index) => ({
      day: localWeekday(date),
      high: formatTemperature(daily.temperature_2m_max[index]),
      low: formatTemperature(daily.temperature_2m_min[index]),
      condition: condition(daily.weather_code[index])
    }))
  };
}

module.exports = { getOpenMeteoWeather };

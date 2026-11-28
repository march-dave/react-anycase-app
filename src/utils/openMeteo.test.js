const axios = require('axios');
const { getOpenMeteoWeather } = require('./openMeteo');

jest.mock('axios');

function forecastResponse() {
  return {
    current: {
      temperature_2m: 0, relative_humidity_2m: 92, apparent_temperature: -3.7,
      weather_code: 0, wind_speed_10m: 2.4
    },
    daily: {
      time: ['2026-10-30', '2026-10-31', '2026-11-01', '2026-11-02', '2026-11-03'],
      temperature_2m_max: [2.3, 3, 4, 6.8, 4],
      temperature_2m_min: [-2.2, 1, 0, 2, -1],
      weather_code: [45, 67, 75, 86, 99]
    }
  };
}

beforeEach(() => axios.get.mockReset());

it('requests a keyless metric forecast and preserves Toronto dates across the DST change', async () => {
  axios.get.mockResolvedValueOnce({ data: forecastResponse() });
  await expect(getOpenMeteoWeather()).resolves.toEqual({
    current: { temperature: '0°C', condition: '맑음', feelsLike: '-4°C', humidity: '92%', windSpeed: '2.4 m/s' },
    forecast: [
      { day: '금', high: '2°C', low: '-2°C', condition: '안개' },
      { day: '토', high: '3°C', low: '1°C', condition: '강한 어는 비' },
      { day: '일', high: '4°C', low: '0°C', condition: '강한 눈' },
      { day: '월', high: '7°C', low: '2°C', condition: '강한 소낙눈' },
      { day: '화', high: '4°C', low: '-1°C', condition: '강한 우박을 동반한 뇌우' }
    ]
  });
  expect(axios.get).toHaveBeenCalledWith('https://api.open-meteo.com/v1/forecast', {
    timeout: 5000,
    params: {
      latitude: 43.6532, longitude: -79.3832, timezone: 'America/Toronto', forecast_days: 5,
      temperature_unit: 'celsius', wind_speed_unit: 'ms',
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
      daily: 'temperature_2m_max,temperature_2m_min,weather_code'
    }
  });
});

it('distinguishes heavy thunderstorms from unrecognized WMO codes', async () => {
  const data = forecastResponse();
  data.current.weather_code = 120;
  data.daily.weather_code[0] = 97;
  data.daily.weather_code[1] = 121;
  axios.get.mockResolvedValueOnce({ data });
  const weather = await getOpenMeteoWeather();
  expect(weather.current.condition).toBe('날씨 상태 미상');
  expect(weather.forecast[0].condition).toBe('강한 뇌우');
  expect(weather.forecast[1].condition).toBe('날씨 상태 미상');
});

it.each([
  ['absent current observations', data => { data.current = null; }],
  ['missing humidity', data => { data.current.relative_humidity_2m = null; }],
  ['non-finite daily low', data => { data.daily.temperature_2m_min[1] = Infinity; }],
  ['missing daily code', data => { data.daily.weather_code[2] = null; }],
  ['misaligned daily highs', data => { data.daily.temperature_2m_max.pop(); }],
  ['absent daily dates', data => { delete data.daily.time; }],
  ['invalid calendar date', data => { data.daily.time[3] = '2026-02-30'; }]
])('rejects %s', async (reason, change) => {
  const data = forecastResponse();
  change(data);
  axios.get.mockResolvedValueOnce({ data });
  await expect(getOpenMeteoWeather()).rejects.toThrow();
});

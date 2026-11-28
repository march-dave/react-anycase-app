const express = require('express');
const { getTorontoWeather } = require('../utils/weather');
const { getOpenMeteoWeather } = require('../utils/openMeteo');

const router = express.Router();

router.get('/weather', async (req, res) => {
  const apiKey = [process.env.OPENWEATHER_API_KEY, process.env.REACT_APP_WEATHER_API_KEY]
    .map(value => (value || '').trim())
    .find(value => value && !/^(your_|여기에_)/i.test(value));

  try {
    const weather = apiKey ? await getTorontoWeather(apiKey) : await getOpenMeteoWeather();
    res.json({ ...weather, provider: apiKey ? 'openweathermap' : 'open-meteo' });
  } catch (error) {
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      return res.status(504).json({ error: '날씨 서비스의 응답 시간이 초과됐습니다.' });
    }
    res.status(502).json({ error: '날씨 서비스에서 데이터를 가져오지 못했습니다.' });
  }
});

router.use((req, res) => {
  res.status(404).json({ error: '요청한 API 경로를 찾을 수 없습니다.' });
});

module.exports = router;

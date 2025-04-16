const express = require('express');
const router = express.Router();
const { getTorontoWeather } = require('../utils/weather');

router.get('/api/weather', async (req, res) => {
  try {
    const weatherData = await getTorontoWeather();
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: '날씨 데이터를 가져오는데 실패했습니다.' });
  }
});

module.exports = router; 
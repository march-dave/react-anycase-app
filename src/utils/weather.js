const axios = require('axios');
const { toronto, requireNumber, formatTemperature } = require('./weatherData');

const providerUrl = 'https://api.openweathermap.org/data/2.5';
const torontoWeekday = new Intl.DateTimeFormat('ko-KR', {
  timeZone: toronto.timeZone,
  weekday: 'short'
});

function condition(observation) {
  const description = observation.weather[0].description;
  if (typeof description !== 'string' || !description.trim()) {
    throw new Error('Missing weather condition');
  }
  return description;
}

async function getTorontoWeather(apiKey) {
  const config = {
    params: { lat: toronto.latitude, lon: toronto.longitude, units: 'metric', appid: apiKey },
    timeout: 5000
  };
  const { data: observation } = await axios.get(`${providerUrl}/weather`, config);
  const current = {
    temperature: formatTemperature(observation.main.temp),
    condition: condition(observation),
    feelsLike: formatTemperature(observation.main.feels_like),
    humidity: `${requireNumber(observation.main.humidity)}%`,
    windSpeed: `${requireNumber(observation.wind.speed)} m/s`
  };

  const { data } = await axios.get(`${providerUrl}/forecast`, config);
  if (!Array.isArray(data.list) || !data.list.length) throw new Error('Missing forecast');

  const days = new Map();
  for (const item of data.list) {
    const day = torontoWeekday.format(requireNumber(item.dt) * 1000);
    const high = requireNumber(item.main.temp_max);
    const low = requireNumber(item.main.temp_min);
    const description = condition(item);
    const existing = days.get(day);
    if (existing) {
      existing.high = Math.max(existing.high, high);
      existing.low = Math.min(existing.low, low);
    } else {
      days.set(day, { day, high, low, condition: description });
    }
  }
  const forecast = Array.from(days.values()).slice(0, 5).map(day => ({
    ...day,
    high: formatTemperature(day.high),
    low: formatTemperature(day.low)
  }));
  return { current, forecast };
}

module.exports = { getTorontoWeather };

const axios = require('axios');
const { getTorontoWeather } = require('./weather');

jest.mock('axios');

const current = {
  main: { temp: 12.6, feels_like: 11.3, humidity: 72 },
  wind: { speed: 2.5 },
  weather: [{ description: 'clear sky' }]
};

function forecastAt(isoDate, high, low) {
  return {
    dt: Date.parse(isoDate) / 1000,
    main: { temp_max: high, temp_min: low },
    weather: [{ description: 'cloudy' }]
  };
}

beforeEach(() => axios.get.mockReset());

it('returns current conditions and groups forecast temperatures by the Toronto calendar day', async () => {
  const forecast = [
    forecastAt('2026-06-02T00:00:00Z', 15, 9),
    forecastAt('2026-06-02T03:00:00Z', 16, 8),
    forecastAt('2026-06-02T06:00:00Z', 17, 7)
  ];
  axios.get.mockResolvedValueOnce({ data: current });
  axios.get.mockResolvedValueOnce({ data: { list: forecast } });

  await expect(getTorontoWeather('test-key')).resolves.toEqual({
    current: {
      temperature: '13°C', condition: 'clear sky', feelsLike: '11°C',
      humidity: '72%', windSpeed: '2.5 m/s'
    },
    forecast: [
      { day: '월', high: '16°C', low: '8°C', condition: 'cloudy' },
      { day: '화', high: '17°C', low: '7°C', condition: 'cloudy' }
    ]
  });
  for (const [, config] of axios.get.mock.calls) {
    expect(config.params.appid).toBe('test-key');
    expect(config.timeout).toBeGreaterThan(0);
  }
});

it('rejects a provider response with a missing numeric reading', async () => {
  axios.get.mockResolvedValueOnce({ data: { ...current, wind: {} } });
  await expect(getTorontoWeather('test-key')).rejects.toThrow();
});

it('rejects an empty forecast', async () => {
  axios.get.mockResolvedValueOnce({ data: current });
  axios.get.mockResolvedValueOnce({ data: { list: [] } });
  await expect(getTorontoWeather('test-key')).rejects.toThrow();
});

/** @jest-environment node */
// Jest 24 cannot resolve the node: imports used by Express 5.
jest.doMock('express', () => require('module').createRequire(__filename)('express'));

const express = require('express');
const axios = require('axios');
const setupProxy = require('../setupProxy');
const { getTorontoWeather } = require('../utils/weather');
const { getOpenMeteoWeather } = require('../utils/openMeteo');

jest.mock('../utils/weather', () => ({ getTorontoWeather: jest.fn() }));
jest.mock('../utils/openMeteo', () => ({ getOpenMeteoWeather: jest.fn() }));

const originalEnv = process.env;
let server;
let client;

beforeAll(done => {
  const app = express();
  setupProxy(app);
  app.use((req, res) => res.type('html').send('<html></html>'));
  server = app.listen(0, '127.0.0.1', () => {
    client = axios.create({
      baseURL: `http://127.0.0.1:${server.address().port}`,
      proxy: false,
      validateStatus: () => true
    });
    done();
  });
});

beforeEach(() => {
  process.env = { ...originalEnv, OPENWEATHER_API_KEY: '', REACT_APP_WEATHER_API_KEY: '' };
  getTorontoWeather.mockReset();
  getOpenMeteoWeather.mockReset();
});

afterEach(() => { process.env = originalEnv; });
afterAll(done => { server.close(done); });

const report = { current: { temperature: '12°C' }, forecast: [{ day: '토' }] };

it.each(['', 'your_openweathermap_api_key'])('uses Open-Meteo with missing or placeholder credentials (%s)', async key => {
  process.env.REACT_APP_WEATHER_API_KEY = key;
  getOpenMeteoWeather.mockResolvedValueOnce(report);
  const response = await client.get('/api/weather');
  expect(response.status).toBe(200);
  expect(response.data).toEqual({ ...report, provider: 'open-meteo' });
  expect(getOpenMeteoWeather).toHaveBeenCalledWith();
  expect(getTorontoWeather).not.toHaveBeenCalled();
});

it.each(['OPENWEATHER_API_KEY', 'REACT_APP_WEATHER_API_KEY'])('keeps using OpenWeatherMap when %s is configured', async keyName => {
  process.env[keyName] = 'test-key';
  getTorontoWeather.mockResolvedValueOnce(report);
  const response = await client.get('/api/weather');
  expect(response.status).toBe(200);
  expect(response.data).toEqual({ ...report, provider: 'openweathermap' });
  expect(getTorontoWeather).toHaveBeenCalledWith('test-key');
  expect(getOpenMeteoWeather).not.toHaveBeenCalled();
});

it('returns a gateway error when the keyless provider is unavailable', async () => {
  getOpenMeteoWeather.mockRejectedValueOnce(new Error('private detail'));
  const response = await client.get('/api/weather');
  expect(response.status).toBe(502);
  expect(response.data).toEqual({ error: expect.any(String) });
  expect(response.data.error).not.toContain('private detail');
});

it('returns a JSON 404 ahead of the HTML fallback', async () => {
  const response = await client.get('/api/missing', { headers: { Accept: 'text/html' } });
  expect(response.status).toBe(404);
  expect(response.headers['content-type']).toMatch(/application\/json/);
  expect(response.data).toEqual({ error: expect.any(String) });
});

it.each([['ECONNABORTED', 504], ['ECONNRESET', 502]])(
  'maps provider error %s to HTTP %i without exposing provider details',
  async (code, status) => {
    process.env.OPENWEATHER_API_KEY = 'fixture-key';
    getTorontoWeather.mockRejectedValueOnce(Object.assign(new Error('private detail'), { code }));
    const response = await client.get('/api/weather');
    expect(getTorontoWeather).toHaveBeenCalledWith('fixture-key');
    expect(getOpenMeteoWeather).not.toHaveBeenCalled();
    expect(response.status).toBe(status);
    expect(response.data).toEqual({ error: expect.any(String) });
    expect(response.data.error).not.toContain('private detail');
  }
);

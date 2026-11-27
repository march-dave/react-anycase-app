/** @jest-environment node */
// Jest 24 cannot resolve the node: imports used by Express 5.
jest.doMock('express', () => require('module').createRequire(__filename)('express'));

const express = require('express');
const axios = require('axios');
const setupProxy = require('../setupProxy');
const { getTorontoWeather } = require('../utils/weather');

jest.mock('../utils/weather', () => ({ getTorontoWeather: jest.fn() }));

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
});

afterEach(() => { process.env = originalEnv; });
afterAll(done => { server.close(done); });

it('returns 503 before contacting the provider when only a placeholder is set', async () => {
  process.env.REACT_APP_WEATHER_API_KEY = 'your_openweathermap_api_key';
  const response = await client.get('/api/weather');
  expect(response.status).toBe(503);
  expect(response.data).toEqual({ error: expect.any(String) });
  expect(getTorontoWeather).not.toHaveBeenCalled();
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
    expect(response.status).toBe(status);
    expect(response.data).toEqual({ error: expect.any(String) });
    expect(response.data.error).not.toContain('private detail');
  }
);

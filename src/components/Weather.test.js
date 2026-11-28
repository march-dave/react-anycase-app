import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import Weather from './Weather';

jest.mock('axios');

const current = {
  temperature: '8°C',
  condition: 'clear sky',
  feelsLike: '7°C',
  humidity: '60%',
  windSpeed: '2 m/s'
};

describe('weather reports', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
  });

  afterEach(() => {
    act(() => { ReactDOM.unmountComponentAtNode(container); });
  });

  async function renderWeather() {
    await act(async () => { ReactDOM.render(<Weather />, container); });
  }

  async function renderAlert() {
    await renderWeather();
    return container.querySelector('[role="alert"]').textContent;
  }

  const forecast = [{ day: '월', high: '11°C', low: '3°C', condition: 'clear sky' }];

  it.each([
    ['open-meteo', [
      ['Open-Meteo', 'https://open-meteo.com/'],
      ['CC BY 4.0', 'https://creativecommons.org/licenses/by/4.0/']
    ]],
    ['openweathermap', [['OpenWeatherMap', 'https://openweathermap.org/']]]
  ])('credits %s below the forecast', async (provider, expectedLinks) => {
    axios.get.mockResolvedValueOnce({ data: { current, forecast, provider } });
    await renderWeather();
    const links = Array.from(container.querySelectorAll('footer a'), link => [link.textContent, link.href]);
    expect(links).toEqual(expectedLinks);
  });

  it.each([
    ['absent', {}],
    ['unrecognized', { provider: 'https://example.org/' }]
  ])('displays the forecast when provider metadata is %s', async (description, metadata) => {
    axios.get.mockResolvedValueOnce({ data: { current, forecast, ...metadata } });
    await renderWeather();
    expect(container.querySelector('h1').textContent).toBe(current.temperature);
    expect(container.querySelector('h3').textContent).toBe(forecast[0].day);
    expect(container.querySelector('footer')).toBeNull();
  });

  it.each([
    ['the HTML app shell', '<!doctype html><html></html>'],
    ['a missing current report', { forecast: [] }],
    ['an incomplete current report', { current: { temperature: '8°C' }, forecast: [] }],
    ['a missing forecast', { current }],
    ['an empty forecast', { current, forecast: [] }],
    ['a null forecast day', { current, forecast: [null] }],
    ['an invalid forecast value', { current, forecast: [{ day: '월', high: {}, low: '2°C', condition: 'rain' }] }]
  ])('shows a data format error for %s', async (description, data) => {
    axios.get.mockResolvedValueOnce({ data });
    expect(await renderAlert()).toContain('날씨 데이터 형식을 읽을 수 없습니다');
  });

  it.each([
    [503, '현재 날씨 서비스를 이용할 수 없습니다. 잠시 후 새로고침해 주세요'],
    [502, '날씨 제공업체에서 데이터를 가져오지 못했습니다'],
    [504, '날씨 제공업체에서 데이터를 가져오지 못했습니다']
  ])('shows a visitor-facing error for HTTP %d', async (status, message) => {
    axios.get.mockRejectedValueOnce({ response: { status } });
    expect(await renderAlert()).toContain(message);
  });

  it('shows a connection error when no response is available', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));
    expect(await renderAlert()).toContain('연결 상태를 확인한 뒤 새로고침해 주세요');
  });
});

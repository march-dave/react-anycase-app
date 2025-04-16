import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const WeatherContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  color: #333;
`;

const CurrentWeather = styled.div`
  background: linear-gradient(to right, #74ebd5, #acb6e5);
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #fff;
`;

const Temperature = styled.h1`
  font-size: 4rem;
  margin: 0.5rem 0;
  font-weight: 700;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
`;

const Condition = styled.p`
  font-size: 1.8rem;
  margin: 1rem 0;
  font-weight: 500;
  text-transform: capitalize;
`;

const WeatherDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
  text-align: center;
`;

const DetailItem = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.8rem;
`;

const ForecastHeader = styled.h2`
  font-size: 1.8rem;
  margin: 2rem 0 1rem;
  color: #444;
  text-align: center;
`;

const ForecastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
`;

const ForecastCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const DayName = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 0.8rem;
  color: #444;
`;

const TemperatureRange = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 0.8rem 0;
`;

const HighTemp = styled.span`
  color: #e53935;
  font-weight: bold;
`;

const LowTemp = styled.span`
  color: #3949ab;
  font-weight: bold;
`;

const ForecastCondition = styled.p`
  font-size: 0.9rem;
  margin: 0.8rem 0;
  color: #666;
  text-transform: capitalize;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  margin: 2rem auto;
  max-width: 500px;
`;

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/weather');
        setWeatherData(response.data);
        setLoading(false);
      } catch (err) {
        setError('날씨 정보를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.');
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <LoadingSpinner>날씨 정보를 불러오는 중입니다...</LoadingSpinner>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!weatherData) return null;

  return (
    <WeatherContainer>
      <CurrentWeather>
        <h2>토론토 현재 날씨</h2>
        <Temperature>{weatherData.current.temperature}</Temperature>
        <Condition>{weatherData.current.condition}</Condition>
        
        <WeatherDetails>
          <DetailItem>
            <div>체감 온도</div>
            <div>{weatherData.current.feelsLike}</div>
          </DetailItem>
          <DetailItem>
            <div>습도</div>
            <div>{weatherData.current.humidity}</div>
          </DetailItem>
          <DetailItem>
            <div>풍속</div>
            <div>{weatherData.current.windSpeed}</div>
          </DetailItem>
        </WeatherDetails>
      </CurrentWeather>

      <ForecastHeader>5일 날씨 예보</ForecastHeader>
      <ForecastGrid>
        {weatherData.forecast.map((day, index) => (
          <ForecastCard key={index}>
            <DayName>{day.day}</DayName>
            <TemperatureRange>
              <HighTemp>{day.high}</HighTemp>
              <LowTemp>{day.low}</LowTemp>
            </TemperatureRange>
            <ForecastCondition>{day.condition}</ForecastCondition>
          </ForecastCard>
        ))}
      </ForecastGrid>
    </WeatherContainer>
  );
};

export default Weather; 
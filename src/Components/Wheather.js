import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Wheather.css';
import Search from './images/search.png';
import Rain from './images/rain.png';
import Humidity from './images/humidity.png';
import Wind from './images/wind.png';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const apiKey = '005cd9b7e0d68ede9200572b79cf6970';// Replace with your OpenWeatherMap API key

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) return; // Avoid making API calls if the city is empty

      const options = {
        method: 'GET',
        url: `https://api.openweathermap.org/data/2.5/weather`,
        params: {
          q: city,
          appid: apiKey,
          units: 'metric', // Fetch temperature in Celsius
        },
      };

      try {
        const response = await axios.request(options);
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setCity(e.target.value);
    }
  };

  return (
    <div className="card">
      <div className='search'>
        <input 
          type='text' 
          placeholder='Enter City Name' 
          spellCheck='false' 
          value={city} 
          onChange={handleCityChange} 
          onKeyDown={handleSearch} 
        />
        <button onClick={handleSearch}> 
          <img alt='' src={Search} />
        </button>
      </div>
      {city === '' ? (
        <div className="background-message">
          <p>Type to search weather</p>
        </div>
      ) : weather ? (
        <div className='weather'>
          <img src={Rain} className='weather-icon' alt='weather-icon'/>
          <h1 className='temp'>{weather.main.temp}°C</h1>
          <h2 className='city'>{weather.name}</h2>
          <span className='region'>{weather.sys.country}</span>
          <div className='details'>
            <div className='col'>
              <img src={Humidity} alt="Images"/>
              <div>
                <p className='humidity'>{weather.main.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className='col'>
              <img src={Wind} alt="Images"/>
              <div>
                <p className='wind'>{weather.wind.speed} km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p style={{ paddingTop: "20px" }}>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;




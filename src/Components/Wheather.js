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
  const apiKey = '3e093108cfbe8becafb6012c53333b53';

  useEffect(() => {
    const fetchWeather = async () => {
      const options = {
        method: 'GET',
        url: 'https://api.weatherstack.com/current',
        params: {
          access_key: apiKey,
          query: city,
        }
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
      {city === '' ? ( <p style={{ paddingTop: "20px" }}>Type to search weather</p>
      )
      :weather && weather.current ? (
        <div className='weather'>
          <img src={Rain} className='weather-icon' alt='weather-icon'/>
          <h1 className='temp'>{weather.current.temperature}°C</h1>
          <h2 className='city'>{weather.location.name}</h2>
          <span className='region'>{weather.location.region} ,</span>
          <span className='country'> {weather.location.country}</span>
          <div className='details'>
            <div className='col'>
              <img src={Humidity} alt="Images"/>
              <div>
                <p className='humidity'>{weather.current.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className='col'>
              <img src={Wind} alt="Images"/>
              <div>
                <p className='wind'>{weather.current.wind_speed} km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p style={{paddingTop:"20px"}}>Loading weather data...</p>
      )}
    </div>
  );
}

export default Weather;




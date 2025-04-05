import React, {useState, useEffect } from 'react'
import axios from 'axios';

function Demo() {
    const [weather, setWeather] = useState(null);
      const [city, setCity] = useState('Mysuru');
      const apiKey = '3e093108cfbe8becafb6012c53333b53';
    useEffect(()=>{
console.log("ashu")
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
            console.log(response.data,"wearjer")
          } catch (error) {
            console.error('Error fetching weather data:', error);
          }
        };
        
        fetchWeather();
}
    ,[city])

  return (
    <div>
      
    </div>
  )
}

export default Demo

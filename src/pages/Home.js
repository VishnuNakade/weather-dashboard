import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Search from '../components/Weather/Search';
import CurrentWeather from '../components/Weather/CurrentWeather';
import Forecast from '../components/Weather/Forecast';
import axios from 'axios';

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const apiKey = 'f9fbe9e4996c6565e9bb732a9b9f4210'; // Ensure this is your actual API key

  const fetchWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    console.log('Weather API URL:', url);

    try {
      const response = await axios.get(url);
      setWeather(response.data);
      fetchForecast(response.data.coord.lat, response.data.coord.lon);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
      }
    }
  };

  const fetchForecast = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`;
    console.log('Forecast API URL:', url);

    try {
      const response = await axios.get(url);
      setForecast(response.data.daily);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
      }
    }
  };

  const addToFavorites = (city) => {
    if (!favorites.includes(city)) {
      const updatedFavorites = [...favorites, city];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" component={Link} to="/favorites" style={{ marginBottom: '1rem',margin:'10px' }}>
        View Favorites
      </Button>
      <Search onCitySelect={fetchWeather}  />
      <CurrentWeather weather={weather} />
      <Forecast forecast={forecast} />
      {weather && (
        <Button variant="contained" color="secondary" onClick={() => addToFavorites(weather.name)} style={{margin:'5px'}}>
          Add to Favorites
        </Button>
      )}
    </div>
  );
};

export default Home;

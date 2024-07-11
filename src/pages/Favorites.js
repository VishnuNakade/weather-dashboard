import React, { useState, useEffect } from 'react';
import { List, ListItem, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
    fetchWeatherData(savedFavorites);
  }, []);

  const fetchWeatherData = async (cities) => {
    const apiKey = 'f9fbe9e4996c6565e9bb732a9b9f4210';
    const weatherDataPromises = cities.map((city) =>
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    );

    try {
      const weatherDataResponses = await Promise.all(weatherDataPromises);
      const weatherDataObj = weatherDataResponses.reduce((acc, response) => {
        acc[response.data.name] = response.data;
        return acc;
      }, {});
      setWeatherData(weatherDataObj);
    } catch (error) {
      console.error("Error fetching weather data for favorite cities:", error);
    }
  };

  const removeFavorite = (city) => {
    const updatedFavorites = favorites.filter((fav) => fav !== city);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    const updatedWeatherData = { ...weatherData };
    delete updatedWeatherData[city];
    setWeatherData(updatedWeatherData);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Favorite Cities
      </Typography>
      <List>
        {favorites.map((city) => (
          <ListItem key={city}>
            <Typography variant="body1">
              {city}: {weatherData[city]?.main.temp}°C, {weatherData[city]?.weather[0].description}
            </Typography>
            <IconButton edge="end" aria-label="delete" onClick={() => removeFavorite(city)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Favorites;

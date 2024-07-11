import React, { useState } from 'react';
import { TextField, List, ListItem, IconButton } from '@mui/material';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import axios from 'axios';

const Search = ({ onCitySelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const apiKey = 'f9fbe9e4996c6565e9bb732a9b9f4210'; // Ensure this is your actual API key

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${e.target.value}&type=like&appid=${apiKey}`);
      setSuggestions(response.data.list);
    }
  };

  const addFavorite = (city) => {
    let favorites = localStorage.getItem('favorites');
    favorites = favorites ? JSON.parse(favorites) : [];
    if (!favorites.includes(city)) {
      favorites.push(city);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  };

  return (
    <div>
      <TextField label="Search city" variant="outlined" fullWidth value={query} onChange={handleSearch} />
      <List>
        {suggestions.map((city) => (
          <ListItem button key={city.id} onClick={() => onCitySelect(city.name)}>
            {city.name}, {city.sys.country}
            <IconButton edge="end" aria-label="favorite" onClick={() => addFavorite(city.name)}>
              {/* <FavoriteIcon /> */}
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Search;

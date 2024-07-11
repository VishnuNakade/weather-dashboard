import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Forecast = ({ forecast }) => {
  if (!forecast) {
    return null;
  }

  const days = forecast.map(day => new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }));
  const temps = forecast.map(day => day.temp.day);
  const precipitations = forecast.map(day => day.pop);

  const data = {
    labels: days,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temps,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
      {
        label: 'Precipitation (%)',
        data: precipitations.map(p => p * 100),
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        7-Day Forecast
      </Typography>
      <Grid container spacing={2}>
        {forecast.map((day, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}
                </Typography>
                <Typography variant="body2">
                  Temp: {day.temp.day}°C
                </Typography>
                <Typography variant="body2">
                  Condition: {day.weather[0].description}
                </Typography>
                <Typography variant="body2">
                  Precipitation: {(day.pop * 100).toFixed(0)}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div style={{ marginTop: '2rem' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Forecast;

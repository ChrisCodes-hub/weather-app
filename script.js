const url = 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=35.5&lon=-78.5&units=imperial&lang=en';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'bfc8e83032mshd3f7bc43fb06810p145e41jsn88dc1fc1315b',
    'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com'
  }
};

async function getWeatherData() {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function updateWeatherUI(data) {
  if (!data || !data.data) {
    document.getElementById('weather-info').innerHTML = '<p>Error fetching weather data.</p>';
    return;
  }

  
  document.getElementById('location-name').textContent = data.city_name;
  document.getElementById('current-date').textContent = new Date().toLocaleDateString();
  document.getElementById('temp').textContent = data.data[0].temp + '°F';
  document.getElementById('weather-condition').textContent = data.data[0].weather.description;
  document.getElementById('weather-icon').src = `https://www.weatherbit.io/static/img/icons/${data.data[0].weather.icon}.png`;
  document.getElementById('humidity').textContent = data.data[0].rh + '%';
  document.getElementById('wind-speed').textContent = data.data[0].wind_spd + ' mph';

  const forecastContainer = document.getElementById('forecast-cards');
  forecastContainer.innerHTML = '';

  data.data.slice(0, 5).forEach((item) => {
    const card = document.createElement('div');
    card.className = 'forecast-card';
    card.innerHTML = `
      <div class="forecast-date">${new Date(item.timestamp_local).toLocaleDateString('en-US', { weekday: 'short' })}</div>
      <img src="https://www.weatherbit.io/static/img/icons/${item.weather.icon}.png" alt="${item.weather.description}">
      <div class="forecast-temp">${item.temp}°F</div>
      <div>${item.weather.description}</div>
    `;
    forecastContainer.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('location-input').value = 'London';
  
  const weatherData = await getWeatherData();
  updateWeatherUI(weatherData);
});

document.getElementById('search-button').addEventListener('click', async () => {
  const weatherData = await getWeatherData();
  updateWeatherUI(weatherData);
});

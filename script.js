
async function getWeatherData(location) {
  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${location}`;
  
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'bfc8e83032mshd3f7bc43fb06810p145e41jsn88dc1fc1315b',
      'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
    }
  };

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
  if (!data || !data.current) {
    document.getElementById('weather-info').innerHTML = '<p>Error fetching weather data.</p>';
    return;
  }

  document.getElementById('location-name').textContent = data.location.name;
  document.getElementById('current-date').textContent = new Date().toLocaleDateString();
  document.getElementById('temp').textContent = data.current.temp_f + '°F';
  document.getElementById('weather-condition').textContent = data.current.condition.text;
  document.getElementById('weather-icon').src = data.current.condition.icon;
  document.getElementById('humidity').textContent = data.current.humidity + '%';
  document.getElementById('wind-speed').textContent = data.current.wind_mph + ' mph';
}

document.addEventListener('DOMContentLoaded', async () => {
  const defaultLocation = 'London';
  document.getElementById('location-input').value = defaultLocation;
  
  const weatherData = await getWeatherData(defaultLocation);
  updateWeatherUI(weatherData); 
});

document.getElementById('search-button').addEventListener('click', async () => {
  const location = document.getElementById('location-input').value;
  
  if (!location) {
    alert("Please enter a location!");
    return;
  }

  const weatherData = await getWeatherData(location);
  updateWeatherUI(weatherData); 
});

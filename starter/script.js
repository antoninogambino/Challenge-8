const apiKey = '6051d76e4cb4fd57d026a7641edc95fd';
const apiUrl = 'https://api.openweathermap.org/data/2.5';

// Prevent form submission and get city name from search input
function searchCity(event) {
  event.preventDefault();
  const city = searchInput.value.trim();

  // Use weather API to get current weather information for city
  const currentWeatherUrl = `${apiUrl}/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
      // Display current weather information on page
      cityElement.textContent = data.name;
      dateElement.textContent = new Date().toLocaleDateString();
      iconElement.setAttribute('src', `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
      temperatureElement.textContent = `${data.main.temp.toFixed(1)} °C`;
      humidityElement.textContent = `${data.main.humidity}%`;
      windSpeedElement.textContent = `${data.wind.speed.toFixed(1)} m/s`;

      // Add city to search history
      addToHistory(city);

      // Use weather API to get 5-day forecast for city
      const forecastUrl = `${apiUrl}/forecast?q=${city}&units=metric&appid=${apiKey}`;
      fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
          // Display 5-day forecast information on page
          const forecastData = data.list.filter(item => item.dt_txt.includes('12:00:00'));
          forecastData.forEach((item, index) => {
            const forecastCard = forecastCards[index];
            const date = new Date(item.dt * 1000).toLocaleDateString();
            const icon = item.weather[0].icon;
            const temp = `${item.main.temp.toFixed(1)} °C`;
            const humidity = `${item.main.humidity}%`;
            forecastCard.querySelector('.date').textContent = date;
            forecastCard.querySelector('.icon').setAttribute('src', `https://openweathermap.org/img/w/${icon}.png`);
            forecastCard.querySelector('.temperature').textContent = temp;
            forecastCard.querySelector('.humidity').textContent = humidity;
          });
        })
        .catch(error => {
          console.error(error);
          alert(`Error retrieving forecast information for ${city}. Please try again.`);
        });
    })
    .catch(error => {
      console.error(error);
      alert(`Error retrieving weather information for ${city}. Please try again.`);
    });
}

const apiKey = '6051d76e4cb4fd57d026a7641edc95fd';
const apiUrl = 'https://api.openweathermap.org/data/2.5';

// Get references to the HTML elements we need to update
const cityElement = document.getElementById('city-name');
const dateElement = document.getElementById('current-date');
const iconElement = document.getElementById('weather-icon');
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');
const historyList = document.getElementById('history');
const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');
const forecastCards = document.querySelectorAll('.forecast-card');

// Prevent form submission and get city name from search input
function searchCity(event) {
  event.preventDefault();
  const city = searchInput.value.trim();

  // Use weather API to get current weather information for city
  const currentWeatherUrl = `${apiUrl}/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
      // Display current weather information on page
      cityElement.textContent = data.name;
      dateElement.textContent = new Date().toLocaleDateString();
      iconElement.setAttribute('src', `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
      temperatureElement.textContent = `${data.main.temp.toFixed(1)} °C`;
      humidityElement.textContent = `${data.main.humidity}%`;
      windSpeedElement.textContent = `${data.wind.speed.toFixed(1)} m/s`;

      // Add city to search history
      addToHistory(city);

      // Use weather API to get 5-day forecast for city
      const forecastUrl = `${apiUrl}/forecast?q=${city}&units=metric&appid=${apiKey}`;
      fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
          // Display 5-day forecast information on page
          const forecastData = data.list.filter(item => item.dt_txt.includes('12:00:00'));
          forecastData.forEach((item, index) => {
            const forecastCard = forecastCards[index];
            const date = new Date(item.dt * 1000).toLocaleDateString();
            const icon = item.weather[0].icon;
            const temp = `${item.main.temp.toFixed(1)} °C`;
            const humidity = `${item.main.humidity}%`;
            forecastCard.querySelector('.date').textContent = date;
            forecastCard.querySelector('.icon').setAttribute('src', `https://openweathermap.org/img/w/${icon}.png`);
            forecastCard.querySelector('.temperature').textContent = temp;
            forecastCard.querySelector('.humidity').textContent = humidity;
          });
        })
        .catch(error => {
          console.error(error);
          alert(`Error retrieving forecast information for ${city}. Please try again.`);
        });
    })
    .catch(error => {
      console.error(error);
      alert(`Error retrieving weather information for ${city}. Please try again.`);
    });
}

// Add the city to the search history and call searchCity
function addToHistory(city) {
  const historyItem = document.createElement('a');
  historyItem.classList.add('list-group-item', 'list-group-item-action');
  historyItem.textContent = city;
  historyList.appendChild(historyItem);
  historyItem.addEventListener('click', () => {
    searchInput.value = city;
    searchCity(new Event('submit'));
  });

  // Save search history to local storage
  const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  searchHistory.push(city);
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}


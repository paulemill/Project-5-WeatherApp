'use strict';

// 326fb4b5ebc0e9dc7d29f4470a3fba68

// Select elements from the DOM
const city = document.getElementById('city');
const image = document.getElementById('tempImage');
const description = document.getElementById('description');
const temp = document.getElementById('temp');
const tempMax = document.getElementById('tempMax');
const tempMin = document.getElementById('tempMin');
const windSpeed = document.getElementById('windSpeed');
const windDirection = document.getElementById('windDirection');
const country = document.getElementById('country');

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

let dateToday = new Date();
let month = months[dateToday.getUTCMonth()];
let day = dateToday.getUTCDate();
let year = dateToday.getUTCFullYear();
console.log(dateToday);

document.getElementById('date').innerHTML = `${month} ${day}, ${year}`;

const getWeather = async (event) => {
  event.preventDefault(); // Prevent form submission
  try {
    const cityName = document.getElementById('searchBarInput').value;
    const weatherFetch = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=326fb4b5ebc0e9dc7d29f4470a3fba68&units=metric`,
      {
        method: 'get',
        headers: {
          Accept: 'application/json',
        },
      }
    );

    if (!weatherFetch.ok) {
      throw new Error(`HTTP error! Status: ${weatherFetch.status}`);
    }

    const weatherData = await weatherFetch.json();
    console.log(weatherData);

    //Function to convert country code to country name
    const getCountryName = (code, locale = 'en') => {
      return (
        new Intl.DisplayNames([locale], { type: 'region' }).of(code) ||
        'Unknown Country'
      );
    };

    // Display weather data
    city.innerHTML = weatherData.name;
    image.innerHTML = `<img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png"/>`;
    country.innerHTML = `${getCountryName(weatherData.sys.country)}`;
    description.innerHTML = weatherData.weather[0].main;
    temp.innerHTML = `<h2>${weatherData.main.temp.toFixed(1)} °C</h2>`;
    tempMax.innerHTML = `${weatherData.main.temp_max.toFixed(1)} °C`;
    tempMin.innerHTML = `${weatherData.main.temp_min.toFixed(1)} °C`;
    windSpeed.innerHTML = `${weatherData.wind.speed.toFixed(1)} m/s`;
    windDirection.innerHTML = `${weatherData.wind.deg} °`;

    // Show the content and adjust the height of the container
    document.querySelector('.content').style.display = 'block';
    app.style.height = '500px'; // Adjusted height
  } catch (error) {
    console.log(error);
    alert('Invalid City Name');
  }
};

// search icon, can do click or press enter
document.getElementById('searchIcon').addEventListener('click', getWeather);
document
  .getElementById('searchBarInput')
  .addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      getWeather(event);
    }
  });

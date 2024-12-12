const options = {
    method: 'GET',
    headers: {
        accept: 'application/json'
    }
};

const apiKey = 'M5RsHE1wTXYgDqS9E6Y3yziFTOn0NjqE';  // my API key for Tomorrow.io
const latitude = 42.3478;
const longitude = -71.0466;
// const url = `https://api.tomorrow.io/v4/weather/realtime?location=${latitude},${longitude}&apikey=${apiKey}`;
// or simply use city name instead of lat/long
const city = 'paris';
const url = `https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=${apiKey}`;
// Put this json data into weatherCodeMapping
// "weatherCode": {
//       "0": "Unknown",
//       "1000": "Clear, Sunny",
//       "1100": "Mostly Clear",
//       "1101": "Partly Cloudy",
//       "1102": "Mostly Cloudy",
//       "1001": "Cloudy",
//       "2000": "Fog",
//       "2100": "Light Fog",
//       "4000": "Drizzle",
//       "4001": "Rain",
//       "4200": "Light Rain",
//       "4201": "Heavy Rain",
//       "5000": "Snow",
//       "5001": "Flurries",
//       "5100": "Light Snow",
//       "5101": "Heavy Snow",
//       "6000": "Freezing Drizzle",
//       "6001": "Freezing Rain",
//       "6200": "Light Freezing Rain",
//       "6201": "Heavy Freezing Rain",
//       "7000": "Ice Pellets",
//       "7101": "Heavy Ice Pellets",
//       "7102": "Light Ice Pellets",
//       "8000": "Thunderstorm"
//     }

const weatherCodeMapping = {
    "0": "Unknown",
    "1000": "Clear, Sunny",
    "1100": "Mostly Clear",
    "1101": "Partly Cloudy",
    "1102": "Mostly Cloudy",
    "1001": "Cloudy",
    "2000": "Fog",
    "2100": "Light Fog",
    "4000": "Drizzle",
    "4001": "Rain",
    "4200": "Light Rain",
    "4201": "Heavy Rain",
    "5000": "Snow",
    "5001": "Flurries",
    "5100": "Light Snow",
    "5101": "Heavy Snow",
    "6000": "Freezing Drizzle",
    "6001": "Freezing Rain",
    "6200": "Light Freezing Rain",
    "6201": "Heavy Freezing Rain",
    "7000": "Ice Pellets",
    "7101": "Heavy Ice Pellets",
    "7102": "Light Ice Pellets",
    "8000": "Thunderstorm"
    };

fetch(url, options)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Extract relevant weather data from the response
        const weatherData = data.data.values;
        console.log(`Weather Code: ${weatherData.weatherCode}`);
        console.log(`Weather Description: ${weatherCodeMapping[weatherData.weatherCode]}`);
        console.log(`Temperature: ${weatherData.temperature}°C`);
        console.log(`Humidity: ${weatherData.humidity}%`);
        console.log(`Visibility: ${weatherData.visibility} km`);
        console.log(`Wind Speed: ${weatherData.windSpeed} m/s`);
        console.log('--------------------------');

    })
    .catch(error => console.error("Error fetching weather data:", error));


// Code are fetched and modified from Tomorrow.io API documentation, link: https://www.weatherbit.io/api/historical-weather-hourly
// When future change to Tomorrow.io API, go to https://app.tomorrow.io/home

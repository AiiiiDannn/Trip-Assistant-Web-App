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
const city = 'irvine';
const url = `https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=${apiKey}`;

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
        console.log(`Temperature: ${weatherData.temperature}°C`);
        console.log(`Humidity: ${weatherData.humidity}%`);
        console.log(`Visibility: ${weatherData.visibility} km`);
        console.log(`Wind Speed: ${weatherData.windpeed} m/s`);
        console.log('--------------------------');
    })
    .catch(error => console.error("Error fetching weather data:", error));


// Code are fetched and modified from Tomorrow.io API documentation, link: https://www.weatherbit.io/api/historical-weather-hourly
// When future change to Tomorrow.io API, go to https://www.weatherbit.io/account/dashboard

const inputBox = document.querySelector('.input-box');
const searchbtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

// This function checks the weather data for a given city.
async function checkWeather(city) {
    const api_key = "39d0a189f3fa0d54a4651e5aca98bcda";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        // Fetch the weather data from the API
        const weather_data = await fetch(url).then(response => response.json());

        // Check if the response code indicates location not found (404)
       

        // Hide the location not found message and display the weather data
        

        // Update the UI with the weather information
        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

        // Update the weather image based on the weather condition
        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weather_img.src = "Assest_files/cloud.png";
                break;
            case 'Clear':
                weather_img.src = "Assest_files/clear.png";
                break;
            case 'Rain':
                weather_img.src = "Assest_files/rain.png";
                break;
            case 'Mist':
                weather_img.src = "Assest_files/mist.png";
                break;
            case 'Snow':
                weather_img.src = "Assest_files/snow.png";
                break;
            default:
                weather_img.src = "Assest_files/unknown.png";  // Fallback if the condition is not matched
                break;
        }
    } catch (error) {
        // If an error occurs during the fetch, show the location not found message
        console.error("Error fetching weather data:", error);
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
    }
}

// Search button click event to check the weather for the entered location
searchbtn.addEventListener('click', () => {
    const location = inputBox.value.trim(); // Trim whitespace from the input value
    if (location) {
        checkWeather(location);  // Call the checkWeather function with the input city
    } else {
        alert("Please enter a valid location.");
    }
});

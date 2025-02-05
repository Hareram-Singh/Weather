const apiKey = "1fa9ff4126d95b8db54f3897a208e91c"; // Api Key
const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherDisplay = document.getElementById("weatherDisplay");
const unitToggle = document.getElementById("unitToggle");
const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const humidity = document.getElementById("humidity");
const weatherCondition = document.getElementById("weatherCondition");
const temperature = document.getElementById("temperature");
const hourlyForecast = document.getElementById("hourlyForecast");
const fiveDayForecast = document.getElementById("fiveDayForecast");
const container = document.querySelector(".container");

let isCelsius = true;  //unittoggle button

// Get user location or default to Delhi
window.onload = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                getWeatherByCoords(latitude, longitude);
            },
            () => getWeatherData("Delhi") // Default to Delhi if permission denied
        );
    } else {
        getWeatherData("Delhi");
    }
};

// search manually other city
getWeatherBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    } else {
        displayError("Please enter a city name.");
    }
});
//change celcius to fahrenheit
unitToggle.addEventListener("click", () => {
    isCelsius = !isCelsius;
    unitToggle.textContent = isCelsius ? "F" : "C";
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
});

function getWeatherByCoords(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            getWeatherData(data.name);
        })
        .catch(() => getWeatherData("Delhi"));
}

function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not found.");
            }
            return response.json();
        })
        .then((data) => {
            displayCurrentWeather(data);
        })
        .catch((error) => {
            displayError(error.message);
        });

    fetch(forecastUrl)
        .then((response) => response.json())
        .then((data) => {
            displayHourlyForecast(data.list, data.city.timezone);
            displayFiveDayForecast(data.list, data.city.timezone);
        })
        .catch((error) => {
            console.error("Error fetching forecast data:", error);
        });
}

function displayCurrentWeather(data) {
    const { name, main, weather } = data;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    const temp = isCelsius ? main.temp : (main.temp * 9) / 5 + 32;

    cityName.textContent = name;
    weatherIcon.src = iconUrl;
    temperature.textContent = `${temp.toFixed(1)}°${isCelsius ? "C" : "F"}`;
    humidity.textContent = `Humidity: ${main.humidity}%`;
weatherCondition.textContent = `Condition: ${weather[0].description}`;


    changeBackgroundColor(temp);
}

// background color changes 
function changeBackgroundColor(temp) {
    if (temp < 15) {
        container.style.background = "linear-gradient(to bottom, #6db3f2, #1e3c72)"; // Cool blue gradient
    } else if (temp >= 15 && temp < 25) {
        container.style.background = "linear-gradient(to bottom, #FFD700, #FF8C00)"; // Warm yellow-orange gradient
    } else if (temp >= 25 && temp < 35) {
        container.style.background = "linear-gradient(to bottom, #FF8C00, #FF4500)"; // Hot orange-red gradient
    } else {
        container.style.background = "linear-gradient(to bottom, #FF4500, #8B0000)"; // Extreme heat red gradient
    }
}
 // 24 hour forecast
function displayHourlyForecast(hourlyData, timezoneOffset) {
    hourlyForecast.innerHTML = hourlyData
        .slice(0, 8)
        .map((item) => {
            const time = new Date((item.dt + timezoneOffset) * 1000).toLocaleTimeString([], {
                hour: "2-digit", minute: "2-digit", timeZone: "UTC"
            });
            const temp = isCelsius ? item.main.temp : (item.main.temp * 9) / 5 + 32;
            const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
            return `
                <div>
                    <p>${time}</p>
                    <img src="${iconUrl}" alt="${item.weather[0].description}">
                    <p>${temp.toFixed(1)}°${isCelsius ? "C" : "F"}</p>
                </div>
            `;
        })
        .join("");
}
// five day forecast
function displayFiveDayForecast(forecastData, timezoneOffset) {
    const dailyData = forecastData.filter((item, index) => index % 8 === 0);
    fiveDayForecast.innerHTML = dailyData
        .map((item) => {
            const date = new Date((item.dt + timezoneOffset) * 1000).toLocaleDateString("en-US", {
                timeZone: "UTC"
            });
            const temp = isCelsius ? item.main.temp : (item.main.temp * 9) / 5 + 32;
            const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
            return `
                <li>
                    <span>${date}</span>
                    <img src="${iconUrl}" alt="${item.weather[0].description}">
                    <span>${temp.toFixed(1)}°${isCelsius ? "C" : "F"}</span>
                </li>
            `;
        })
        .join("");
}
//error message
function displayError(message) {
    weatherDisplay.innerHTML = `<p class="error">${message}</p>`;
}

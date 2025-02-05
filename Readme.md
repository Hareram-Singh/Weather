# Weather App

## Introduction
This Weather App allows users to search for current weather conditions, including temperature, humidity, and general weather conditions. It also provides a 24-hour and 5-day forecast. The app fetches real-time weather data using the OpenWeather API and dynamically updates the UI based on the search query.

## Features
- Fetches real-time weather data based on city name.
- Automatically detects user location and shows weather details.
- Displays temperature, humidity, and weather condition.
- Provides a 24-hour and 5-day forecast.
- Background color changes dynamically based on temperature.
- Toggle between Celsius and Fahrenheit.

## Installation and Setup
### Prerequisites
- A web browser (Chrome, Firefox, Edge, etc.)
- Internet connection (for API requests)
- OpenWeather API key

### Steps to Run the Project Locally
1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-repository/weather-app.git
   ```
2. **Navigate to the Project Directory**
   ```sh
   cd weather-app
   ```
3. **Open the Project in a Code Editor (Optional)**
   Open the folder in VS Code or any preferred editor.
4. **Set Up API Key**
   - Replace `const apiKey = "YOUR_API_KEY";` in `weather.js` with your actual OpenWeather API key.
5. **Open `index.html` in a Browser**
   - Simply double-click `index.html` or run a local server using VS Code’s Live Server extension.

## Approach and Challenges
### Approach
- Used **JavaScript** to fetch weather data from OpenWeather API.
- Implemented **event listeners** to handle user inputs and API requests.
- Used **CSS** for responsive design and dynamic background changes based on temperature.
- Included **error handling** to manage invalid city searches.

### Challenges and Solutions
1. **Geolocation Permission Issues**
   - **Challenge:** Some users denied location access.
   - **Solution:** Defaulted the city to "Delhi" if location access was not granted.

2. **API Request Errors**
   - **Challenge:** Fetching data sometimes failed due to incorrect city names or API limits.
   - **Solution:** Implemented `try-catch` blocks and displayed error messages when requests failed.

3. **Responsive Design**
   - **Challenge:** UI elements overlapped on small screens.
   - **Solution:** Used `flexbox` and `media queries` to make components adaptive.

## Future Improvements
- Add more weather details like wind speed and UV index.
- Implement user preferences for default city selection.
- Improve UI with animations and better forecast visualization.
- Convert the project into a Progressive Web App (PWA) for offline support.

## Author
Developed by **Hareram Singh**


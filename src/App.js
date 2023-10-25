import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [location, setLocation] = useState("lahore");
  const [weatherData, setWeatherData] = useState({
    location: "",
    temperature: 0,
    description: "",
    feelsLike: 0,
    humidity: 0,
    windSpeed: 0,
    temp_min: 0,
    temp_max: 0,
    country: "",
    city: "",
    clouds: 0,
    feels_like: "",
  });

  const apiKey = process.env.WEATHER_APP_API_KEY;

  useEffect(() => {
    fetchWeatherData(location);
  }, [location]);

  const fetchWeatherData = (location) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        setWeatherData({
          location: data.name,
          temperature: data.main.temp,
          description: data.weather[0].description,
          feelsLike: data.main.feels_like,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          country: data.sys.country,
          city: data.name,
          clouds: data.clouds.all,
          feels_like: data.main.feels_like,
        });
      })
      .catch((error) => {
        console.error("Error fetching weather data: " + error);
      });
  };

  const getBackgroundClass = (description) => {
    const descriptionClassMap = {
      clouds: "cloud-background",
      smoke: "smoke-background ",
      haze: "haze-background",
      "clear sky": "clear-sky-background",
      "scattered clouds": "scattered-clouds-background",
      "broken clouds": "few-clouds-background",
      "few clouds": "few-clouds-background",
      "overcast clouds": "overcast-clouds-background ",
      "light rain": "light-rain-background",
      "moderate rain": "moderate-rain-background",
    };
    return descriptionClassMap[description] || "default-background";
  };

  const weatherIconMap = {
    clouds: "https://img.icons8.com/arcade/65/clouds.png",
    smoke: "https://img.icons8.com/arcade/65/water-steam.png",
    haze: "https://img.icons8.com/dusk/65/fog-day.png",
    "broken clouds": "https://img.icons8.com/bubbles/65/clouds.png",
    "few clouds": "https://img.icons8.com/bubbles/65/clouds.png",
    "overcast clouds": "https://img.icons8.com/stickers/65/clouds.png",
    "clear sky":
      "https://img.icons8.com/external-kosonicon-lineal-color-kosonicon/65/external-clear-sky-weather-kosonicon-lineal-color-kosonicon.png",
    "scattered clouds": "https://img.icons8.com/clouds/65/clouds.png",
    "light rain":
      "https://img.icons8.com/external-justicon-flat-justicon/65/external-light-rain-weather-justicon-flat-justicon.png",
    "moderate rain": "https://img.icons8.com/pulsar-color/65/moderate-rain.png",
  };

  const handleSearch = () => {
    fetchWeatherData(location);
  };

  return (
    <div className="App">
      <div id="main">
        <div class="background">
          <img
            class={`img-background ${getBackgroundClass(
              weatherData.description
            )}`}
            alt=""
          />
        </div>
        <div className="main-grid">
          <div className="app-name-c">
            <span className="app-name-text">React Weather App</span>
            <img
              src="https://img.icons8.com/fluency/48/clouds--v3.png"
              alt="logo"
              height="30px"
            />
          </div>
          <div style={{ opacity: 1 }}>
            <div className="content">
              <div className="principal">
                <div className="header">
                  <form>
                    <div className="extras">
                      <div className="get-location">
                        <span className="get-location-button">My Location</span>
                      </div>
                    </div>
                    <div className="input-wrapper">
                      <input
                        placeholder="Enter a city name"
                        type="text"
                        name="city"
                        className="cityInput"
                        autoComplete="off"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                      <button className="searchButton" onClick={handleSearch}>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 24 24"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z" />
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
                <div className="result">
                  <img
                    src={weatherIconMap[weatherData.description]}
                    alt="icon"
                    className="weather-icon"
                  />
                  <h1 className="temperature">
                    {Math.round(weatherData.temperature)}
                    <span>ºC</span>
                  </h1>
                  <span className="description">{weatherData.description}</span>
                  <span className="local">
                    {weatherData.city}, {weatherData.country}&nbsp;&nbsp;
                    <img
                      src={`https://raw.githubusercontent.com/hjnilsson/country-flags/master/png100px/${weatherData.country.toLowerCase()}.png`}
                      alt="country"
                    />
                  </span>
                </div>
                <div className="other-results">
                  <div className="other">
                    Feels Like:
                    <br />
                    <span>{Math.round(weatherData.feels_like)}ºC</span>
                  </div>
                  <div className="other">
                    Min Temp:
                    <br />
                    <span>{Math.round(weatherData.temp_min)}ºC</span>
                  </div>
                  <div className="other">
                    Max Temp:
                    <br />
                    <span>{Math.round(weatherData.temp_max)}ºC</span>
                  </div>
                </div>
              </div>
              <div className="secondary">
                <div className="secondary-results">
                  <div className="other-secondary-results">
                    <div className="icon-secondary-results humidity">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5.63604 6.633L12 0.269043L18.364 6.633C21.8787 10.1477 21.8787 15.8462 18.364 19.3609C14.8492 22.8756 9.15076 22.8756 5.63604 19.3609C2.12132 15.8462 2.12132 10.1477 5.63604 6.633H5.63604Z" />
                      </svg>
                    </div>
                    <p>
                      Humidity:
                      <br />
                      {weatherData.humidity}%
                    </p>
                  </div>
                  <div className="other-secondary-results">
                    <div className="icon-secondary-results">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        version="1.1"
                        id="Layer_1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 30 30"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.1,16.97c0,0.24,0.09,0.45,0.28,0.62c0.16,0.19,0.37,0.28,0.63,0.28H18.7c0.29,0,0.53,0.1,0.73,0.3
                  c0.20,0.20,0.30,0.45,0.30,0.74c0,0.29-0.10,0.53-0.30,0.72c-0.20,0.19-0.44,0.29-0.74,0.29c-0.29,0-0.54-0.10-0.73-0.29
                  c-0.16-0.18-0.36-0.26-0.60-0.26c-0.25,0-0.46,0.09-0.64,0.26s-0.27,0.38-0.27,0.61c0,0.25,0.09,0.46,0.28,0.63
                  c0.56,0.55,1.22,0.83,1.96,0.83c0.78,0,1.45-0.27,2.01-0.81c0.56-0.54,0.83-1.19,0.83-1.97s-0.28-1.44-0.84-2
                  c-0.56-0.56-1.23-0.84-2-0.84H4.01c-0.25,0-0.46,0.09-0.64,0.26C3.19,16.51,3.10,16.72,3.10,16.97z M3.10,13.69
                  c0,0.23,0.09,0.43,0.28,0.61c0.17,0.18,0.38,0.26,0.63,0.26h20.04c0.78,0,1.45-0.27,2.01-0.82c0.56-0.54,0.84-1.20,0.84-1.97
                  c0-0.77-0.28-1.44-0.84-1.99s-1.23-0.83-2.01-0.83c-0.77,0-1.42,0.27-1.95,0.80c-0.18,0.16-0.27,0.38-0.27,0.67
                  c0,0.26,0.09,0.47,0.26,0.63c0.17,0.16,0.38,0.24,0.63,0.24c0.24,0,0.45-0.08,0.63-0.24c0.19-0.21,0.42-0.31,0.70-0.31
                  c0.29,0,0.53,0.10,0.73,0.30c0.20,0.20,0.30,0.44,0.30,0.73c0,0.29-0.10,0.53-0.30,0.72c-0.20,0.19-0.44,0.29-0.73,0.29H4.01
                  c-0.25,0-0.46,0.09-0.64,0.26C3.19,13.23,3.10,13.44,3.10,13.69z"
                        ></path>
                      </svg>
                    </div>
                    <p>
                      Wind:
                      <br />
                      {weatherData.windSpeed} m/s
                    </p>
                  </div>
                  <div className="other-secondary-results">
                    <div className="icon-secondary-results">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        version="1.1"
                        id="Layer_1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 30 30"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.89,17.6c0-0.99,0.31-1.88,0.93-2.65s1.41-1.27,2.38-1.49c0.26-1.17,0.85-2.14,1.78-2.88c0.93-0.75,2-1.12,3.22-1.12
                  c1.18,0,2.24,0.36,3.16,1.09c0.93,0.73,1.53,1.66,1.80,2.80h0.27c1.18,0,2.18,0.41,3.01,1.24s1.25,1.83,1.25,3
                  c0,1.18-0.42,2.18-1.25,3.01s-1.83,1.25-3.01,1.25H8.16c-0.58,0-1.13-0.11-1.65-0.34s-0.42-0.54-0.80-0.72
                  c-0.38-0.38-0.68-0.84-0.91-1.36S3.89,18.17,3.89,17.6z M5.34,17.6c0,0.76,0.28,1.42,0.82,1.96s1.21,0.82,1.99,0.82h9.28
                  c0.77,0,1.44-0.27,1.99-0.82c0.55-0.55,0.83-1.20,0.83-1.96c0-0.76-0.27-1.42-0.83-1.96c-0.55-0.54-1.21-0.82-1.99-0.82h-1.39
                  c-0.10,0-0.15-0.05-0.15-0.15l-0.07-0.49c-0.10-0.94-0.50-1.73-1.19-2.35s-1.51-0.93-2.45-0.93c-0.94,0-1.76,0.31-2.46,0.94
                  c-0.70,0.62-1.09,1.41-1.18,2.34l-0.07,0.42c0,0.10-0.05,0.15-0.16,0.15l-0.45,0.07c-0.72,0.06-1.32,0.36-1.81,0.89
                  C5.59,16.24,5.34,16.87,5.34,17.6z M14.19,8.88c-0.10,0.09-0.08,0.16,0.07,0.21c0.43,0.19,0.79,0.37,1.08,0.55
                  c0.11,0.03,0.19,0.02,0.22-0.03c0.61-0.57,1.31-0.86,2.12-0.86c0.81,0,1.5,0.27,2.10,0.81c0.59,0.54,0.92,1.21,0.99,2l0.09,0.64h1.42
                  c0.65,0,1.21,0.23,1.68,0.70c0.47,0.47,0.70,1.02,0.70,1.66c0,0.60-0.21,1.12-0.62,1.57s-0.92,0.70-1.53,0.77
                  c-0.10,0-0.15,0.05-0.15,0.16v1.13c0,0.11,0.05,0.16,0.15,0.16c1.01-0.06,1.86-0.46,2.55-1.19s1.04-1.60,1.04-2.60
                  c0-1.06-0.37-1.96-1.12-2.70c-0.75-0.75-1.65-1.12-2.70-1.12h-0.15c-0.26-1.00-0.81-1.82-1.65-2.47c-0.83-0.65-1.77-0.97-2.80-0.97
                  C16.28,7.29,15.11,7.82,14.19,8.88"
                        ></path>
                      </svg>
                    </div>
                    <p>
                      Clouds: <br />
                      {weatherData.clouds}%
                    </p>
                  </div>
                </div>
                <div className="go-maps">
                  <a
                    className="go-maps-link"
                    href={`https://www.google.com/maps/place/${weatherData.city}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open location in Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

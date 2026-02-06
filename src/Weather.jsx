import React, { useState } from "react";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import { FaSearch } from "react-icons/fa";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);

  const API_URL="https://api.openweathermap.org/data/2.5/weather";
  const API_KEY="30759e4be55a3852393829f81c599854"

  const fetchWeather = async () => {
    if (!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    setWeather(data);
    setCity("");
  };

  const toggleUnit = () => setIsCelsius(!isCelsius);

  const convertTemp = (temp) => {
    return isCelsius ? temp : (temp * 9) / 5 + 32;
  };

  return (
    <div className="weather-container">
      <div className="search-box">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
        />
        <button className="search-btn" onClick={fetchWeather}>
          <FaSearch size={18} />
        </button>
      </div>

      {weather && weather.main && (
        <div className="weather-card">
          <h2>{weather.name}</h2>

          <h1 className="temp">
            {Math.round(convertTemp(weather.main.temp))}
            °{isCelsius ? "C" : "F"}
          </h1>

          <button className="toggle-btn" onClick={toggleUnit}>
            Switch to °{isCelsius ? "F" : "C"}
          </button>

          <img
            className="weather-icon"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather"
          />

          <h3>{weather.weather[0].description}</h3>

          <div className="extra-info">
            <p><WiHumidity size={28} /> Humidity: {weather.main.humidity}%</p>
            <p><WiStrongWind size={28} /> Wind: {weather.wind.speed} km/h</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;

import { useState } from "react";
import { WiHumidity ,WiStrongWind} from "react-icons/wi";
import { FaTemperatureHigh } from "react-icons/fa";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css'

function App() {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = '46bdd3cbd1af4ec97c99cb70979c0988';

  const fetchWeather = async () => {
    if (!city) return;
    try {
      setError("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeather(data);
      console.log(data);
    } catch (err) {
      setError(err.massage);
      setWeather(null);
    }
  };
  const getWeatherEmoji = (main) =>{
    switch (main) {
      case "Clear":
        return "☀️";
      case "Clouds":
        return "☁️";
      case "Rain":
        return "🌧️";
      case "Snow":
        return "❄️";
      case "Thunderstorm":
        return "⛈️";
      case "Dizzle":
        return "🌦️";
        
        break;
    
      default:
        return "🌈"
        break;
    }
  }
  // -------- BACKGROUND CLASS -------
  const getBackgroundClass = (main) =>{
    
      switch (main) {
      case "Clear":
        return "bg-linear-to-br from-blue-400 to-yellow-300";
      case "Clouds":
        return "bg-linear-to-br from-gray-400 to-gray-600";
      case "Rain":
       
      case "Snow":
        return "bg-linear-to-br from-blue-200 to-white";
      case "Thunderstorm":
        return "bg-linear-to-br from-gray-800 to-indigo-900";
      case "Dizzle":
        return "bg-linear-to-br from-blue-600 to-gray-800";
        
        break;
    
      default:
        return "bg-linear-to-br from-indigo-400 to-purple-700"
        break;
    }
  }
  const backgroundclass = weather? getBackgroundClass(weather.weather[0].main): "bg-linear-to-br from-indigo-400 to-purple-700"

  return (
    <div className={`flex flex-col justify-center items-center min-h-screen transition-all duration-500 p-4 ${backgroundclass}`}>
      <div className="bg-white max-w-sm w-full shadow-2xl rounded-2xl p-6 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          🌥️ Weather App
        </h2>
        <div className="flex mb-4">
          <input
            type="text"
            onChange={(e)=>setCity(e.target.value)}
            value={city}
            className="flex-1 p-2 text-gray-700 border rounded-l-lg outline-none"
          />
          <button
            onClick={fetchWeather}
            className="text-white bg-indigo-600 px-4 py-2 hover:bg-indigo-800 rounded-r-lg transition"
          >
            Search
          </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {weather && (
            <div className="mb-4 space-y-2">
              <div className="text-5xl">{getWeatherEmoji(weather.weather[0].main)}</div>
              <h2 className="text-xl font-semibold text-gray-800">{weather.name}, {weather.sys.country}</h2>
              <p className="text-3xl font-bold text-indigo-800">{weather.main.temp}°C</p>
              <p className="capitalize text-gray-600">{weather.weather[0].description}</p>
              <div className="flex justify-around mt-4 text-gray-700">
                <div className="flex items-center space-x-1">
                  <FaTemperatureHigh className="text-red-500 text-xl" />
                  <p className="text-sm">Feels: {weather.main.feels_like}°C</p>
                </div>
                <div className="flex items-center space-x-1">
                  <WiHumidity className="text-blue-500 text-2xl" />
                  <p className="text-sm"> {weather.main.humidity}%</p>
                </div>
                <div className="flex items-center space-x-1">
                  <WiStrongWind className="text-gray-500 text-2xl" />
                  <p className="text-sm"> {weather.wind.speed} m/s</p>
                </div>
              </div>
            </div>
          )}
       
      </div>
    </div>
  );
}

export default App;

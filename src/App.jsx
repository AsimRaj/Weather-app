import { useState } from "react";
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

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-linear-to-br from-blue-400 to-indigo-600 p-4">
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
            className="text-white bg-indigo-600 px-4 py-2 hover:bg-indigo-800 rounded-r-lg"
          >
            Search
          </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {weather && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{weather.name}, {weather.sys.country}</h2>
              <p className="text-3xl font-bold text-indigo-800">{weather.main.temp}°C</p>
              <p className="capitalize text-gray-600">{weather.weather[0].description}</p>
            </div>
          )}
       
      </div>
    </div>
  );
}

export default App;

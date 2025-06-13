import { useState, useEffect, useCallback } from "react";
import weatherAPI from "../service/weatherAPI";

const useWeatherData = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [uvData, setUvData] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = useCallback(
    async (city = null, lat = null, lon = null) => {
      setLoading(true);
      setError(null);

      try {
        let current;
        let forecastData;

        if (lat && lon) {
          // Fetch using coordinates
          current = await weatherAPI.getWeatherByCoords(lat, lon);
          forecastData = await weatherAPI.getForecast(current.name); // fallback to city name from response
        } else {
          // Fetch using city name
          current = await weatherAPI.getCurrentWeather(city);
          forecastData = await weatherAPI.getForecast(city);
        }
        setCurrentWeather(current);
        setForecast(forecastData);
        if (current.coord) {
          const [uv, air] = await Promise.all([
            weatherAPI.getUVIndex(current.coord.lat, current.coord.lon),
            weatherAPI.getAirQuality(current.coord.lat, current.coord.lon),
          ]);
          setUvData(uv);
          setAirQuality(air);
        }
      } catch (err) {
        console.error("Weather Fetch Error:", err);
        setError("Failed to fetch weather data.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    currentWeather,
    forecast,
    uvData,
    airQuality,
    loading,
    error,
    fetchWeatherData,
  };
};

const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return currentTime;
};

export { useWeatherData, useCurrentTime };

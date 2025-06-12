import { useState, useEffect, useCallback } from "react";
import weatherAPI from "../service/weatherAPI";

const useWeatherData = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [uvData, setUvData] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = useCallback(async (city) => {
    setLoading(true);
    setError(null);

    try {
      const [current, forecastData] = await Promise.all([
        weatherAPI.getCurrentWeather(city),
        weatherAPI.getForecast(city),
      ]);

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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []); // ✅ stable reference

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

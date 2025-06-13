import { useEffect } from "react";
import { useWeatherData } from "./hooks/useWeatherData";
import SearchBar from "./components/SearchBar";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import ForecastCard from "./components/ForecastCard";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import "./App.css";

const App = () => {
  const {
    currentWeather,
    forecast,
    uvData,
    airQuality,
    loading,
    error,
    fetchWeatherData,
  } = useWeatherData();

  useEffect(() => {
    // Try to get weather from user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(null, latitude, longitude); // city is null, use lat/lon
        },
        (error) => {
          console.error("Geolocation error:", error);
          fetchWeatherData("Vapi"); // fallback city if geolocation fails
        }
      );
    } else {
      console.warn("Geolocation not supported");
      fetchWeatherData("Vapi"); // fallback city if geolocation fails
    }
  }, [fetchWeatherData]);

  const handleSearch = (city) => {
    fetchWeatherData(city); // manual search uses city name
  };

  return (
    <div className="bg-gradient-to-r from-blue-900 to-purple-900 min-h-screen text-white scrollbar-hide">
      <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8 max-w-7xl">
        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} loading={loading} />
        {/* Loading State */}
        {loading && <LoadingSpinner />}
        {/* Error State */}
        {error && <ErrorMessage message={error} />}
        {/* Weather Content */}
        {!loading && !error && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mb-6">
            <div className="xl:col-span-2">
              <CurrentWeatherCard
                weather={currentWeather}
                currentTime={new Date()}
                uvData={uvData}
                airQuality={airQuality}
                forecast={forecast}
              />
            </div>
            <div className="xl:col-span-1">
              <ForecastCard forecast={forecast} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

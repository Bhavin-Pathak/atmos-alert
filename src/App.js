import { useEffect } from "react";
import { useWeatherData, useCurrentTime } from "./hooks/useWeatherData";
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

  const currentTime = useCurrentTime();

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
        {/* Header */}
        <div className="flex items-center justify-left mb-6 sm:mb-8">
          <div className="flex items-center space-x-3">
            <div>
              <h1 className="text-white text-xl sm:text-2xl font-bold">
                Atmos-Alert{" "}
              </h1>
              <p className="text-white/70 text-xs sm:text-sm">
                {currentTime.toLocaleDateString([], {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
                {" - "}
                {currentTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} loading={loading} />

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Error State */}
        {error && <ErrorMessage message={error} />}

        {/* Weather Content */}
        {!loading && !error && (
          <>
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
          </>
        )}
      </div>

      {/* Hide Scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default App;

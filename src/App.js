import { useEffect } from "react";
import { useWeatherData, useCurrentTime } from "./hooks/useWeatherData";
import SearchBar from "./components/SearchBar";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import ForecastCard from "./components/ForecastCard";
import HourlyForecast from "./components/HourlyForecast";
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
    // Load default city weather on app start
    fetchWeatherData("Vapi");
  }, [fetchWeatherData]);

  const handleSearch = (city) => {
    fetchWeatherData(city);
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
              {/* Main Weather Card */}
              <div className="xl:col-span-2">
                <CurrentWeatherCard
                  weather={currentWeather}
                  currentTime={currentTime}
                  uvData={uvData}
                  airQuality={airQuality}
                />
              </div>

              {/* Forecast Card */}
              <div className="xl:col-span-1">
                <ForecastCard forecast={forecast} />
              </div>
            </div>

            {/* Additional Weather Info */}
            <div className="mb-6">
              <HourlyForecast forecast={forecast} currentTime={currentTime} />
            </div>
          </>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
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

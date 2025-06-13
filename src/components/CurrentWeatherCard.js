import { MapPin, Droplets, Wind, Gauge, Eye, Sun } from "lucide-react";
import WeatherIcon from "./WeatherIcon";
import weatherUtils from "../utils/weatherUtils";

const CurrentWeatherCard = ({
  weather,
  currentTime,
  uvData,
  airQuality,
  forecast,
}) => {
  if (!weather) return null;

  const uvValue = uvData?.value || 6;
  const aqiValue = airQuality?.list?.[0]?.main?.aqi || 2;

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Current Weather Section */}
      <div className="bg-white/20 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 border border-white/30 shadow-2xl">
        {/* Header: Location and Time */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 md:mb-6 space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <MapPin className="text-white/70 flex-shrink-0" size={16} />
            <span className="text-white/70 text-xs sm:text-sm md:text-base lg:text-lg font-medium truncate">
              {weather.name}
              {weather.state ? `, ${weather.state}` : ""}, {weather.sys.country}
            </span>
          </div>
        </div>

        {/* Main Weather Info */}
        <div className="flex items-start sm:items-center justify-between mb-4 sm:mb-6 md:mb-8">
          <div className="flex-1 min-w-0">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-1 sm:mb-2">
              {Math.round(weather.main.temp)}°
            </div>
            <div className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl mb-1 capitalize leading-tight">
              {weather.weather[0].description}
            </div>
            <div className="text-white/60 text-xs sm:text-sm md:text-base">
              Feels like {Math.round(weather.main.feels_like)}°
            </div>
          </div>
          <div className="flex-shrink-0 ml-4">
            <WeatherIcon
              iconCode={weather.weather[0].icon}
              size={50}
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24"
            />
          </div>
        </div>

        {/* Weather Metrics - Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
          {[
            {
              icon: (
                <Droplets
                  className="text-blue-300 mx-auto mb-1 sm:mb-2"
                  size={18}
                />
              ),
              label: "Humidity",
              value: `${weather.main.humidity}%`,
            },
            {
              icon: (
                <Wind
                  className="text-green-300 mx-auto mb-1 sm:mb-2"
                  size={18}
                />
              ),
              label: "Wind",
              value: `${Math.round(weather.wind.speed * 3.6)} km/h`,
            },
            {
              icon: (
                <Gauge
                  className="text-purple-300 mx-auto mb-1 sm:mb-2"
                  size={18}
                />
              ),
              label: "Pressure",
              value: `${weather.main.pressure} hPa`,
            },
            {
              icon: (
                <Eye
                  className="text-orange-300 mx-auto mb-1 sm:mb-2"
                  size={18}
                />
              ),
              label: "Visibility",
              value: `${Math.round(weather.visibility / 1000)} km`,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white/10 border border-white/30 shadow-xl rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-3 md:p-4 text-center transition-all duration-200 hover:scale-105 hover:bg-white/20 active:scale-95"
            >
              {item.icon}
              <div className="text-white/60 text-xs sm:text-sm leading-tight">
                {item.label}
              </div>
              <div className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-semibold leading-tight">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Metrics - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {/* UV Index */}
          <div className="bg-white/10 border border-white/30 shadow-xl rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 text-center transition-all duration-200 hover:scale-105 hover:bg-white/20 active:scale-95">
            <Sun className="text-yellow-300 mx-auto mb-1 sm:mb-2" size={18} />
            <div className="text-white/60 text-xs sm:text-sm">UV Index</div>
            <div className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-semibold leading-tight">
              {uvValue} - {weatherUtils.getUVIndexLabel(uvValue)}
            </div>
          </div>

          {/* Air Quality */}
          <div className="bg-white/10 border border-white/30 shadow-xl rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 text-center transition-all duration-200 hover:scale-105 hover:bg-white/20 active:scale-95">
            <Wind className="text-green-300 mx-auto mb-1 sm:mb-2" size={18} />
            <div className="text-white/60 text-xs sm:text-sm">Air Quality</div>
            <div className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-semibold leading-tight">
              {aqiValue} - {weatherUtils.getAirQualityLabel(aqiValue)}
            </div>
          </div>

          {/* Sunrise & Sunset */}
          <div className="bg-white/10 border border-white/30 shadow-xl rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 text-center transition-all duration-200 hover:scale-105 hover:bg-white/20 active:scale-95 sm:col-span-2 lg:col-span-1">
            <Sun className="text-orange-300 mx-auto mb-1 sm:mb-2" size={18} />
            <div className="text-white/60 text-xs sm:text-sm">
              Sunrise & Sunset
            </div>
            <div className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-semibold leading-tight">
              {weatherUtils.formatTime(weather.sys.sunrise)} /{" "}
              {weatherUtils.formatTime(weather.sys.sunset)}
            </div>
          </div>
        </div>
      </div>

      {/* Hourly Forecast UI */}
      {forecast?.list && (
        <div className="bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-2 sm:p-3 md:p-4 border border-white/30 shadow-2xl">
          <h3 className="text-white text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 md:mb-4">
            Hourly Forecast
          </h3>

          {/* Mobile: Horizontal Scroll */}
          <div className="sm:hidden">
            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
              {(() => {
                const today = new Date().toDateString();
                const todayEntries = forecast.list.filter(
                  (item) => new Date(item.dt * 1000).toDateString() === today
                );
                return todayEntries.slice(0, 12).map((hour, index) => (
                  <div
                    key={index}
                    className="bg-white/10 border border-white/30 shadow-xl rounded-lg p-2 text-center transition-all duration-200 hover:scale-[1.02] hover:bg-white/20 active:scale-95 flex-shrink-0 min-w-[72px]"
                  >
                    <div className="text-white/60 text-[10px] mb-1 whitespace-nowrap">
                      {index === 0 ? "Now" : weatherUtils.formatTime(hour.dt)}
                    </div>
                    <WeatherIcon
                      iconCode={hour.weather[0].icon}
                      size={22}
                      className="mx-auto mb-1 w-5 h-5"
                    />
                    <div className="text-white text-xs font-semibold mb-1">
                      {Math.round(hour.main.temp)}°
                    </div>
                    <div className="text-white/60 text-[10px]">
                      {Math.round(hour.pop * 100)}%
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>

          {/* Tablet and Desktop: Grid */}
          <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-2 sm:gap-3">
            {(() => {
              const today = new Date().toDateString();
              const todayEntries = forecast.list.filter(
                (item) => new Date(item.dt * 1000).toDateString() === today
              );
              return todayEntries.slice(0, 12).map((hour, index) => (
                <div
                  key={index}
                  className="bg-white/10 border border-white/30 shadow-xl rounded-lg lg:rounded-xl p-2 sm:p-3 text-center transition-all duration-200 hover:scale-[1.02] hover:bg-white/20 active:scale-95"
                >
                  <div className="text-white/60 text-xs mb-1 sm:mb-2">
                    {index === 0 ? "Now" : weatherUtils.formatTime(hour.dt)}
                  </div>
                  <WeatherIcon
                    iconCode={hour.weather[0].icon}
                    size={24}
                    className="mx-auto mb-1 sm:mb-2 w-6 h-6"
                  />
                  <div className="text-white text-sm sm:text-base font-semibold mb-1">
                    {Math.round(hour.main.temp)}°
                  </div>
                  <div className="text-white/60 text-xs">
                    {Math.round(hour.pop * 100)}% rain
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentWeatherCard;

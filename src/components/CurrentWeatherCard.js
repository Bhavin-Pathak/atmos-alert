import { MapPin, Droplets, Wind, Gauge, Eye } from "lucide-react";
import WeatherIcon from "./WeatherIcon";

const CurrentWeatherCard = ({ weather, currentTime }) => {
  if (!weather) return null;

  return (
    <div className="bg-white/20 backdrop-blur-x5 rounded-2xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/30 shadow-2xl">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <MapPin className="text-white/70" size={20} />
          <span className="text-white/70 text-sm sm:text-base lg:text-lg">
            {weather.name}, {weather.sys.country}
          </span>
        </div>
        <div className="text-white/70 text-sm sm:text-base lg:text-lg font-medium">
          {currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-1 sm:mb-2">
            {Math.round(weather.main.temp)}°
          </div>
          <div className="text-white/80 text-base sm:text-lg lg:text-xl mb-1 capitalize">
            {weather.weather[0].description}
          </div>
          <div className="text-white/60 text-sm sm:text-base">
            Feels like {Math.round(weather.main.feels_like)}°
          </div>
        </div>
        <div className="text-right">
          <WeatherIcon
            iconCode={weather.weather[0].icon}
            size={60}
            className="sm:w-16 sm:h-16 lg:w-20 lg:h-20"
          />
        </div>
      </div>

      {/* Weather Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            icon: <Droplets className="text-blue-300 mx-auto mb-2" size={20} />,
            label: "Humidity",
            value: `${weather.main.humidity}%`,
          },
          {
            icon: <Wind className="text-green-300 mx-auto mb-2" size={20} />,
            label: "Wind",
            value: `${Math.round(weather.wind.speed * 3.6)} km/h`,
          },
          {
            icon: <Gauge className="text-purple-300 mx-auto mb-2" size={20} />,
            label: "Pressure",
            value: `${weather.main.pressure} hPa`,
          },
          {
            icon: <Eye className="text-orange-300 mx-auto mb-2" size={20} />,
            label: "Visibility",
            value: `${Math.round(weather.visibility / 1000)} km`,
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white/10 border border-white/30 shadow-xl  rounded-2xl p-4 text-center transition-all hover:scale-105 hover:bg-white/20"
          >
            {item.icon}
            <div className="text-white/60 text-xs sm:text-sm">{item.label}</div>
            <div className="text-white text-sm sm:text-base lg:text-lg font-semibold">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CurrentWeatherCard;

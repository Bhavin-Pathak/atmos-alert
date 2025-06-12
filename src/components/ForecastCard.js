import WeatherIcon from "./WeatherIcon";
import weatherUtils from "../utils/weatherUtils";

const ForecastCard = ({ forecast }) => {
  if (!forecast || !forecast.list) return null;

  const dailyForecasts = weatherUtils.groupForecastByDay(forecast.list);

  return (
    <div className="bg-white/20 backdrop-blur-x5 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/30 shadow-2xl">
      <h3 className="text-white text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
        5-Day Forecast
      </h3>
      <div className="space-y-3 sm:space-y-4">
        {dailyForecasts.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 sm:p-4 bg-white/10 border border-white/30 shadow-xl rounded-2xl text-left backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20"
          >
            <div className="flex items-center space-x-3">
              <WeatherIcon iconCode={day.weather.icon} size={30} />
              <div>
                <div className="text-white font-medium text-sm sm:text-base">
                  {index === 0 ? "Today" : weatherUtils.formatDate(day.dt)}
                </div>
                <div className="text-white/60 text-xs sm:text-sm capitalize">
                  {day.weather.main}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-semibold text-sm sm:text-base">
                {Math.round(day.main.temp_max)}°
              </div>
              <div className="text-white/60 text-xs sm:text-sm">
                {Math.round(day.main.temp_min)}°
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ForecastCard;

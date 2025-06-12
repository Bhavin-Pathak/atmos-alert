import weatherUtils from "../utils/weatherUtils";

const WeatherIcon = ({ iconCode, size = 24, className = "" }) => {
  const IconComponent = weatherUtils.getWeatherIcon(iconCode);
  return <IconComponent size={size} className={`text-blue-400 ${className}`} />;
};

export default WeatherIcon;

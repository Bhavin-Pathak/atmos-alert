import {
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  Zap,
  CloudDrizzle,
  Cloudy,
} from "lucide-react";

const weatherUtils = {
  getWeatherIcon: (iconCode) => {
    const iconMap = {
      "01d": Sun,
      "01n": Moon,
      "02d": Cloud,
      "02n": Cloud,
      "03d": Cloudy,
      "03n": Cloudy,
      "04d": Cloudy,
      "04n": Cloudy,
      "09d": CloudDrizzle,
      "09n": CloudDrizzle,
      "10d": CloudRain,
      "10n": CloudRain,
      "11d": Zap,
      "11n": Zap,
      "13d": CloudSnow,
      "13n": CloudSnow,
      "50d": Cloud,
      "50n": Cloud,
    };
    return iconMap[iconCode] || Cloud;
  },

  getAirQualityLabel: (aqi) => {
    const labels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
    return labels[aqi - 1] || "Unknown";
  },

  getUVIndexLabel: (uv) => {
    if (uv <= 2) return "Low";
    if (uv <= 5) return "Moderate";
    if (uv <= 7) return "High";
    if (uv <= 10) return "Very High";
    return "Extreme";
  },

  formatTime: (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  },

  formatDate: (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  },

  kelvinToCelsius: (kelvin) => Math.round(kelvin - 273.15),

  getWindDirection: (degrees) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(degrees / 45) % 8];
  },

  groupForecastByDay: (list) => {
    const grouped = {};
    list.forEach((item) => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(item);
    });

    return Object.values(grouped)
      .slice(0, 5)
      .map((entries) => {
        const middle = entries[Math.floor(entries.length / 2)];
        return {
          dt: middle.dt,
          main: {
            temp_max: Math.max(...entries.map((e) => e.main.temp_max)),
            temp_min: Math.min(...entries.map((e) => e.main.temp_min)),
          },
          weather: middle.weather[0],
        };
      });
  },
};

export default weatherUtils;

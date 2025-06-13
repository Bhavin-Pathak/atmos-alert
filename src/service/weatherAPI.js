const weatherAPI = {
  API_KEY: "5025dae397c52e181519b4b474b225c5", // Your OpenWeatherMap API key
  BASE_URL: "https://api.openweathermap.org/data/2.5", // Base URL for OpenWeatherMap API

  // Fetch current weather by city name
  getCurrentWeather: async (city) => {
    try {
      const response = await fetch(
        `${weatherAPI.BASE_URL}/weather?q=${city}&appid=${weatherAPI.API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error("Weather data not found");
      return await response.json();
    } catch (error) {
      console.error("Error fetching current weather:", error);
      return weatherAPI.getMockCurrentWeather();
    }
  },
  // Fetch 5-day weather forecast for a city
  getForecast: async (city) => {
    try {
      const response = await fetch(
        `${weatherAPI.BASE_URL}/forecast?q=${city}&appid=${weatherAPI.API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error("Forecast data not found");
      return await response.json();
    } catch (error) {
      console.error("Error fetching forecast:", error);
      return weatherAPI.getMockForecast();
    }
  },
  // Fetch UV index by coordinates (latitude and longitude)
  getUVIndex: async (lat, lon) => {
    try {
      const response = await fetch(
        `${weatherAPI.BASE_URL}/uvi?lat=${lat}&lon=${lon}&appid=${weatherAPI.API_KEY}`
      );
      if (!response.ok) throw new Error("UV data not found");
      return await response.json();
    } catch (error) {
      console.error("Error fetching UV data:", error);
      return { value: 6 }; // Mock UV index
    }
  },
  // Fetch air quality data by coordinates (latitude and longitude)
  getAirQuality: async (lat, lon) => {
    try {
      const response = await fetch(
        `${weatherAPI.BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${weatherAPI.API_KEY}`
      );
      if (!response.ok) throw new Error("Air quality data not found");
      return await response.json();
    } catch (error) {
      console.error("Error fetching air quality:", error);
      return { list: [{ main: { aqi: 2 }, components: { pm2_5: 15 } }] }; // Mock air quality
    }
  },
  // Fetch weather data by coordinates (latitude and longitude)
  getWeatherByCoords: async (lat, lon) => {
    try {
      const response = await fetch(
        `${weatherAPI.BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${weatherAPI.API_KEY}&units=metric`
      );
      if (!response.ok)
        throw new Error("Weather data not found by coordinates");
      return await response.json();
    } catch (error) {
      console.error("Error fetching weather by coordinates:", error);
      return weatherAPI.getMockCurrentWeather();
    }
  },

  // Mock data for demo (when API key is not set or API fails to respond)
  getMockCurrentWeather: () => ({
    name: "Sagwara",
    sys: { country: "IN" },
    main: {
      temp: 39,
      feels_like: 35,
      humidity: 65,
      pressure: 1000,
    },
    weather: [
      {
        main: "Clouds",
        description: "overcast clouds",
        icon: "04d",
      },
    ],
    wind: {
      speed: 6.7,
      deg: 240,
    },
    visibility: 10000,
    dt: Date.now() / 1000,
  }),
  // Mock forecast data for demo
  getMockForecast: () => ({
    list: [
      {
        dt: Date.now() / 1000 + 86400,
        main: { temp_max: 25, temp_min: 18, humidity: 60 },
        weather: [{ main: "Clear", icon: "01d" }],
        pop: 0.1,
      },
      {
        dt: Date.now() / 1000 + 172800,
        main: { temp_max: 28, temp_min: 20, humidity: 55 },
        weather: [{ main: "Clear", icon: "01d" }],
        pop: 0,
      },
      {
        dt: Date.now() / 1000 + 259200,
        main: { temp_max: 24, temp_min: 17, humidity: 75 },
        weather: [{ main: "Rain", icon: "10d" }],
        pop: 0.8,
      },
      {
        dt: Date.now() / 1000 + 345600,
        main: { temp_max: 26, temp_min: 19, humidity: 70 },
        weather: [{ main: "Clouds", icon: "03d" }],
        pop: 0.2,
      },
      {
        dt: Date.now() / 1000 + 432000,
        main: { temp_max: 23, temp_min: 16, humidity: 80 },
        weather: [{ main: "Thunderstorm", icon: "11d" }],
        pop: 0.9,
      },
    ],
  }),
};

export default weatherAPI;

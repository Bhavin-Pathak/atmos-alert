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

  getMockCurrentWeather: () => ({
    name: "Sagwara",
    sys: {
      country: "IN",
      sunrise: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
      sunset: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
    },
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

  getMockForecast: () => {
    const now = Math.floor(Date.now() / 1000);
    return {
      list: Array.from({ length: 40 }).map((_, index) => {
        const dt = now + index * 3 * 3600; // 3-hour intervals
        return {
          dt,
          main: {
            temp: 28 + Math.random() * 5,
            temp_min: 26 + Math.random() * 3,
            temp_max: 30 + Math.random() * 3,
            humidity: 50 + Math.floor(Math.random() * 20),
          },
          weather: [{ main: "Clear", icon: "01d" }],
          pop: Math.random(),
        };
      }),
    };
  },
};

export default weatherAPI;

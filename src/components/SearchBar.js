import { useState } from "react";
import { Search } from "lucide-react";
import { useCurrentTime } from "../hooks/useWeatherData";

const SearchBar = ({ onSearch, loading }) => {
  const [query, setQuery] = useState("");
  const currentTime = useCurrentTime();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      onSearch(query.trim());
      setQuery("");
    }
  };

  const popularCities = [
    "Ahmedabad",
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Jaipur",
    "London",
    "New York",
  ];

  return (
    <div className="mb-5">
      {/* Header */}
      <div className="flex items-center justify-left mb-6 sm:mb-8">
        <div className="flex items-center space-x-3 sm:space-x-3">
          <img
            src={`${process.env.PUBLIC_URL}/favicon.ico`}
            alt="Atmos-Alert Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
          />
          {""}{" "}
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
      <div className="relative mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search a city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
            disabled={loading}
            className="w-full pl-4 pr-16 sm:pr-18 py-3 sm:py-4 text-sm sm:text-base rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 disabled:opacity-50"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading || !query.trim()}
            className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white p-2.5 sm:p-3 rounded-xl transition-all duration-300 shadow-lg"
          >
            <Search size={16} />
          </button>
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="absolute right-16 sm:right-20 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
          </div>
        )}
      </div>

      {/* Popular Cities */}
      <div className="text-center">
        <div className="flex flex-wrap justify-center gap-2">
          {popularCities.map((city) => (
            <button
              key={city}
              onClick={() => onSearch(city)}
              disabled={loading}
              className="px-3 py-1 text-xs sm:text-sm bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white/80 hover:text-white rounded-full transition-all duration-300 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

import { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch, loading }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      onSearch(query.trim());
      setQuery("");
    }
  };

  return (
    <div className="mb-5">
      <div className="relative">
        <Search
          className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-black"
          size={18}
        />
        <input
          type="text"
          placeholder="Search a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
          disabled={loading}
          className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 text-sm sm:text-base rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 disabled:opacity-50"
        />
      </div>
    </div>
  );
};

export default SearchBar;

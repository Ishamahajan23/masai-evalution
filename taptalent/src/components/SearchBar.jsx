import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchCities, clearSearchResults } from '../features/weather/weatherSlice';
import { addFavorite } from '../features/favoritesSlice';

const SearchBar = ({ onCitySelect }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const searchRef = useRef(null);
  const resultsRef = useRef(null);
  
  const { searchResults, searchStatus } = useSelector(state => state.weather);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (query.length > 2) {
        dispatch(searchCities(query));
        setIsOpen(true);
      } else {
        dispatch(clearSearchResults());
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [query, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCitySelect = (city) => {
    setQuery('');
    setIsOpen(false);
    dispatch(clearSearchResults());
    
    if (onCitySelect) {
      onCitySelect(city.name);
    } else {
      // Add to favorites if no specific handler provided
      dispatch(addFavorite(city.name));
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
    } else if (e.key === 'Enter' && searchResults.length > 0) {
      handleCitySelect(searchResults[0]);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <input
          ref={searchRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 2 && setIsOpen(true)}
          placeholder="Search cities... (e.g., London, Paris, Tokyo)"
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {searchStatus === 'loading' ? (
            <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          ) : (
            <span className="text-gray-400 text-xl">🔍</span>
          )}
        </div>
      </div>

      {isOpen && searchResults.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
        >
          {searchResults.map((city, index) => (
            <button
              key={`${city.name}-${city.country}-${index}`}
              onClick={() => handleCitySelect(city)}
              className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-150 flex items-center justify-between border-b last:border-b-0"
            >
              <div>
                <div className="font-medium text-gray-800">{city.name}</div>
                <div className="text-sm text-gray-500">{city.country}</div>
              </div>
              <div className="text-gray-400">
                <span className="text-sm">📍</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && query.length > 2 && searchResults.length === 0 && searchStatus !== 'loading' && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 text-center text-gray-500">
          No cities found. Try a different search term.
        </div>
      )}
    </div>
  );
};

export default SearchBar;
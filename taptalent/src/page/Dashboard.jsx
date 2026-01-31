import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../features/weather/weatherSlice';
import { addFavorite } from '../features/favoritesSlice';
import WeatherCard from '../components/WeatherCard';
import SearchBar from '../components/SearchBar';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);  
  const { current: weatherData, status, error } = useSelector(state => state.weather);
  const { cities: favoriteCities } = useSelector(state => state.favorites);
  const { temperatureUnit } = useSelector(state => state.settings);

  useEffect(() => {
    favoriteCities.forEach(city => {
      dispatch(fetchWeather({ city, unit: temperatureUnit }));
    });
  }, [dispatch, favoriteCities, temperatureUnit]);

  const handleCitySelect = (cityName) => {
    dispatch(addFavorite(cityName));
  };

  const nextCity = () => {
    setCurrentIndex((prev) => (prev + 1) % favoriteCities.length);
  };

  const prevCity = () => {
    setCurrentIndex((prev) => (prev - 1 + favoriteCities.length) % favoriteCities.length);
  };

  const getWeatherForCity = (city) => {
    return weatherData[city]?.data;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-md mx-auto pt-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Weather</h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const currentCity = favoriteCities[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Weather</h1>
          <SearchBar onCitySelect={handleCitySelect} />
        </div>

        {favoriteCities.length > 0 && currentCity ? (
          <div className="space-y-6">
            <WeatherCard
              city={currentCity}
              weatherData={getWeatherForCity(currentCity)}
              isFavorite={true}
            />
            
            {favoriteCities.length > 1 && (
              <div className="flex justify-between items-center">
                <button
                  onClick={prevCity}
                  className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  ←
                </button>
                <span className="text-sm text-gray-600">
                  {currentIndex + 1} of {favoriteCities.length}
                </span>
                <button
                  onClick={nextCity}
                  className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  →
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌤️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No cities added</h3>
            <p className="text-gray-600">Search and add cities to see weather</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
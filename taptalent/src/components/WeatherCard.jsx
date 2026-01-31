import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getWeatherIcon, formatTemperature } from '../features/weather/weatherAPI';
import { addFavorite, removeFavorite } from '../features/favoritesSlice';

const WeatherCard = ({ city, weatherData, isFavorite = false }) => {
  const dispatch = useDispatch();
  const { temperatureUnit } = useSelector(state => state.settings);

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      dispatch(removeFavorite(city));
    } else {
      dispatch(addFavorite(city));
    }
  };

  if (!weatherData) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  const { main, weather, wind } = weatherData;
  const weatherCondition = weather[0];

  return (
    <Link to={`/city/${encodeURIComponent(city)}`} className="block">
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{city}</h3>
              <p className="text-gray-500 text-sm capitalize">{weatherCondition.description}</p>
            </div>
            <button
              onClick={handleFavoriteToggle}
              className={`p-2 rounded-full transition-colors ${
                isFavorite 
                  ? 'text-red-500 hover:bg-red-50' 
                  : 'text-gray-400 hover:text-red-500 hover:bg-gray-50'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="text-4xl mr-3">
                {getWeatherIcon(weatherCondition.icon)}
              </span>
              <div>
                <span className="text-3xl font-bold text-gray-800">
                  {formatTemperature(main.temp, temperatureUnit)}°
                </span>
                <span className="text-lg text-gray-500">{temperatureUnit}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="mr-2">🌡️</span>
              <span>Feels like {formatTemperature(main.feels_like, temperatureUnit)}°</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">💧</span>
              <span>Humidity {main.humidity}%</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">💨</span>
              <span>Wind {wind.speed} m/s</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">⏰</span>
              <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-3">
          <p className="text-xs text-gray-600 text-center">
            Click for detailed forecast →
          </p>
        </div>
      </div>
    </Link>
  );
};

export default WeatherCard;
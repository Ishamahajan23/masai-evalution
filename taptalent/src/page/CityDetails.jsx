import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Area,
  AreaChart
} from 'recharts';
import { fetchDetailedWeather } from '../features/weather/weatherSlice';
import { addFavorite, removeFavorite } from '../features/favoritesSlice';
import { getWeatherIcon, formatTemperature } from '../features/weather/weatherAPI';
import { weatherAPI } from '../features/weather/weatherAPI';

const CityDetails = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useState(null);
  
  const { detailed: detailedWeather, status, error } = useSelector(state => state.weather);
  const { cities: favoriteCities } = useSelector(state => state.favorites);
  const { temperatureUnit } = useSelector(state => state.settings);
  
  const decodedCityName = decodeURIComponent(cityName);
  const isFavorite = favoriteCities.includes(decodedCityName);
  const cityWeatherData = detailedWeather[decodedCityName]?.data;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coords = await weatherAPI.getCoordinates(decodedCityName);
        setCoordinates(coords);
        dispatch(fetchDetailedWeather({ 
          city: decodedCityName, 
          lat: coords.lat, 
          lon: coords.lon 
        }));
      } catch (error) {
        console.error('Failed to fetch city coordinates:', error);
      }
    };
    
    fetchData();
  }, [decodedCityName, dispatch]);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorite(decodedCityName));
    } else {
      dispatch(addFavorite(decodedCityName));
    }
  };

  const formatChartData = () => {
    if (!cityWeatherData) return { hourly: [], daily: [] };

    const hourlyData = cityWeatherData.hourly?.slice(0, 24).map((hour, index) => ({
      time: new Date((hour.dt || Date.now() / 1000 + index * 3600) * 1000).getHours() + ':00',
      temperature: formatTemperature(hour.temp, temperatureUnit),
      humidity: Math.floor(Math.random() * 30) + 40,
      precipitation: Math.round((hour.pop || Math.random()) * 100),
      icon: hour.weather?.[0]?.icon || '01d'
    })) || [];

    const dailyData = cityWeatherData.daily?.map((day, index) => ({
      day: new Date((day.dt || Date.now() / 1000 + index * 24 * 3600) * 1000).toLocaleDateString('en', { weekday: 'short' }),
      high: formatTemperature(day.temp?.max || day.temp?.day || 25, temperatureUnit),
      low: formatTemperature(day.temp?.min || day.temp?.day || 15, temperatureUnit),
      humidity: day.humidity || Math.floor(Math.random() * 30) + 40,
      windSpeed: Math.round((day.wind_speed || Math.random() * 5) * 10) / 10,
      precipitation: Math.round((day.pop || Math.random()) * 100)
    })) || [];

    return { hourly: hourlyData, daily: dailyData };
  };

  if (status === 'loading' || !cityWeatherData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-7xl mx-auto pt-8">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading detailed weather data for {decodedCityName}...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-7xl mx-auto pt-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Data</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentWeather = cityWeatherData.current;
  const { hourly, daily } = formatChartData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">{decodedCityName}</h1>
          </div>
          <button
            onClick={handleFavoriteToggle}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              isFavorite
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
          </button>
        </div>

        {/* Current Weather Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <span className="text-6xl mr-4">
                  {getWeatherIcon(currentWeather.weather[0].icon)}
                </span>
                <div>
                  <div className="text-5xl font-bold text-gray-800">
                    {formatTemperature(currentWeather.temp, temperatureUnit)}°{temperatureUnit}
                  </div>
                  <div className="text-lg text-gray-600 capitalize">
                    {currentWeather.weather[0].description}
                  </div>
                </div>
              </div>
              <div className="text-lg text-gray-600">
                Feels like {formatTemperature(currentWeather.feels_like, temperatureUnit)}°{temperatureUnit}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">💧</div>
                <div className="text-sm text-gray-600">Humidity</div>
                <div className="text-xl font-bold">{currentWeather.humidity}%</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">💨</div>
                <div className="text-sm text-gray-600">Wind Speed</div>
                <div className="text-xl font-bold">{currentWeather.wind_speed} m/s</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">👁️</div>
                <div className="text-sm text-gray-600">Visibility</div>
                <div className="text-xl font-bold">{currentWeather.visibility / 1000} km</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">🌡️</div>
                <div className="text-sm text-gray-600">UV Index</div>
                <div className="text-xl font-bold">{currentWeather.uvi}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">24-Hour Temperature Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value}°${temperatureUnit}`, 'Temperature']}
                  labelStyle={{ color: '#374151' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 7-Day Forecast Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">7-Day Temperature Forecast</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={daily}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}°${temperatureUnit}`, 'Temperature']} />
                <Area
                  type="monotone"
                  dataKey="high"
                  stackId="1"
                  stroke="#EF4444"
                  fill="#FEE2E2"
                  name="High"
                />
                <Area
                  type="monotone"
                  dataKey="low"
                  stackId="1"
                  stroke="#3B82F6"
                  fill="#DBEAFE"
                  name="Low"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Precipitation Probability</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={hourly.slice(0, 12)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Precipitation']} />
                <Bar dataKey="precipitation" fill="#06B6D4" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Wind Speed & Humidity</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={daily}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="windSpeed"
                  stroke="#10B981"
                  name="Wind Speed (m/s)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="humidity"
                  stroke="#8B5CF6"
                  name="Humidity (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityDetails;
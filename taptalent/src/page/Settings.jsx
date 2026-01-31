import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  setTemperatureUnit,
  setTheme,
  setAutoRefresh,
  setRefreshInterval
} from '../features/settingsSlice';
import { removeFavorite, reorderFavorites } from '../features/favoritesSlice';

const Settings = () => {
  const dispatch = useDispatch();
  const settings = useSelector(state => state.settings);
  const { cities: favoriteCities } = useSelector(state => state.favorites);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleTemperatureUnitChange = (unit) => {
    dispatch(setTemperatureUnit(unit));
  };

  const handleThemeChange = (theme) => {
    dispatch(setTheme(theme));
  };

  const handleAutoRefreshToggle = () => {
    dispatch(setAutoRefresh(!settings.autoRefresh));
  };

  const handleRefreshIntervalChange = (interval) => {
    dispatch(setRefreshInterval(parseInt(interval)));
  };

  const handleRemoveFavorite = (city) => {
    dispatch(removeFavorite(city));
  };

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedItem === null) return;
    
    const newCities = [...favoriteCities];
    const draggedCity = newCities[draggedItem];
    
    newCities.splice(draggedItem, 1);
    newCities.splice(dropIndex, 0, draggedCity);
    
    dispatch(reorderFavorites(newCities));
    setDraggedItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* General Settings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-2">⚙️</span>
              General Settings
            </h2>

            {/* Temperature Unit */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Temperature Unit
              </label>
              <div className="flex space-x-4">
                {['C', 'F'].map((unit) => (
                  <button
                    key={unit}
                    onClick={() => handleTemperatureUnitChange(unit)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      settings.temperatureUnit === unit
                        ? 'bg-blue-600 text-white shadow-md transform scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    °{unit} {unit === 'C' ? 'Celsius' : 'Fahrenheit'}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Theme
              </label>
              <div className="flex space-x-4">
                {[
                  { value: 'light', label: '☀️ Light', desc: 'Light theme' },
                  { value: 'dark', label: '🌙 Dark', desc: 'Dark theme' }
                ].map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => handleThemeChange(theme.value)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      settings.theme === theme.value
                        ? 'bg-blue-600 text-white shadow-md transform scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {theme.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Auto Refresh */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Auto Refresh
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleAutoRefreshToggle}
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                    settings.autoRefresh ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.autoRefresh ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className="text-sm text-gray-600">
                  {settings.autoRefresh ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>

            {/* Refresh Interval */}
            {settings.autoRefresh && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Refresh Interval
                </label>
                <select
                  value={settings.refreshInterval}
                  onChange={(e) => handleRefreshIntervalChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={30}>30 seconds</option>
                  <option value={60}>1 minute</option>
                  <option value={120}>2 minutes</option>
                  <option value={300}>5 minutes</option>
                  <option value={600}>10 minutes</option>
                </select>
              </div>
            )}

            {/* Current Settings Summary */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-2">Current Settings</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>Temperature: °{settings.temperatureUnit}</li>
                <li>Theme: {settings.theme === 'light' ? 'Light' : 'Dark'}</li>
                <li>Auto-refresh: {settings.autoRefresh ? `Every ${settings.refreshInterval}s` : 'Off'}</li>
              </ul>
            </div>
          </div>

          {/* Favorite Cities Management */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-2">⭐</span>
              Favorite Cities ({favoriteCities.length})
            </h2>

            {favoriteCities.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 mb-4">
                  Drag and drop to reorder, or click ✖️ to remove
                </p>
                {favoriteCities.map((city, index) => (
                  <div
                    key={city}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-dashed border-transparent hover:border-blue-300 cursor-move transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-400">⋮⋮</span>
                      <span className="font-medium text-gray-800">{city}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveFavorite(city)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                      title="Remove from favorites"
                    >
                      ✖️
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🌍</div>
                <p className="text-gray-600">No favorite cities yet</p>
                <p className="text-sm text-gray-500 mt-2">
                  Add cities from the dashboard or search
                </p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-200">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span className="mr-2">+</span>
                Add More Cities
              </Link>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default Settings;
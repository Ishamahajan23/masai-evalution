import { createSlice } from '@reduxjs/toolkit';

// Load favorites from localStorage
const loadFavoritesFromStorage = () => {
  try {
    const storedFavorites = localStorage.getItem('weatherFavorites');
    return storedFavorites ? JSON.parse(storedFavorites) : ['india'];
  } catch (error) {
    return ['india'];
  }
};

const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Failed to save favorites to localStorage:', error);
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    cities: loadFavoritesFromStorage()
  },
  reducers: {
    addFavorite: (state, action) => {
      const city = action.payload;
      if (!state.cities.includes(city)) {
        state.cities.push(city);
        saveFavoritesToStorage(state.cities);
      }
    },
    removeFavorite: (state, action) => {
      const city = action.payload;
      state.cities = state.cities.filter(c => c !== city);
      saveFavoritesToStorage(state.cities);
    },
    reorderFavorites: (state, action) => {
      state.cities = action.payload;
      saveFavoritesToStorage(state.cities);
    }
  }
});

export const { addFavorite, removeFavorite, reorderFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
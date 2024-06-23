import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  }),
  actions: {
    toggleFavorite(currency) {
      if (this.favorites.includes(currency)) {
        this.favorites = this.favorites.filter(fav => fav !== currency);
      } else {
        this.favorites.push(currency);
      }
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
  },
});

import { defineStore } from 'pinia';
import axios from 'axios';

export const useRatesStore = defineStore('ratesStore', {
  state: () => ({
    rates: [],
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  }),
  actions: {
    async fetchRates() {
      try {
        const response = await axios.get('https://nationalbank.kz/rss/get_rates.cfm?fdate=30.03.2023');
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml');
        const items = xmlDoc.getElementsByTagName('item');
        this.rates = Array.from(items).map(item => ({
          fullname: item.getElementsByTagName('fullname')[0].textContent,
          title: item.getElementsByTagName('title')[0].textContent,
          description: item.getElementsByTagName('description')[0].textContent,
          quant: item.getElementsByTagName('quant')[0].textContent,
          index: item.getElementsByTagName('index')[0].textContent,
          change: item.getElementsByTagName('change')[0].textContent,
        }));
      } catch (error) {
        console.error('Failed to fetch rates:', error);
      }
    },
    toggleFavorite(rate) {
      const index = this.favorites.findIndex(fav => fav.title === rate.title);
      if (index > -1) {
        this.favorites.splice(index, 1);
      } else {
        this.favorites.push(rate);
      }
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
  }
});

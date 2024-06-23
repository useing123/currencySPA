import { defineStore } from 'pinia';
import axios from 'axios';

export const useRatesStore = defineStore('ratesStore', {
  state: () => ({
    rates: [],
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    searchQuery: '',
    selectedDate: localStorage.getItem('selectedDate') || new Date().toLocaleDateString('ru-RU').split('/').reverse().join('.'),
    currentPage: 1,
    itemsPerPage: 5,
    sortKey: '',
    sortOrder: 'asc'
  }),
  getters: {
    filteredRates(state) {
      let filtered = state.rates.filter(rate =>
        rate.fullname.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        rate.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );

      if (state.sortKey) {
        filtered.sort((a, b) => {
          let result = 0;
          if (a[state.sortKey] > b[state.sortKey]) {
            result = 1;
          } else if (a[state.sortKey] < b[state.sortKey]) {
            result = -1;
          }
          return state.sortOrder === 'asc' ? result : -result;
        });
      }

      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = state.currentPage * state.itemsPerPage;
      return filtered.slice(start, end);
    },
    totalPages(state) {
      return Math.ceil(state.rates.length / state.itemsPerPage);
    }
  },
  actions: {
    formatDate(date) {
      const [year, month, day] = date.split('-');
      return `${day}.${month}.${year}`;
    },
    async fetchRates() {
      try {
        const formattedDate = this.formatDate(this.selectedDate);
        const response = await axios.get(`https://nationalbank.kz/rss/get_rates.cfm?fdate=${formattedDate}`);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml');
        if (xmlDoc.getElementsByTagName('parsererror').length) {
          throw new Error('Error parsing XML');
        }
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
    updateDate(newDate) {
      this.selectedDate = newDate;
      localStorage.setItem('selectedDate', newDate); // Save selected date to localStorage
      this.fetchRates();
    },
    updateSearchQuery(query) {
      this.searchQuery = query;
    },
    updateSort(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
      }
    },
    changePage(page) {
      this.currentPage = page;
    },
    updateItemsPerPage(newItemsPerPage) {
      this.itemsPerPage = newItemsPerPage;
      this.currentPage = 1; // Reset to first page when items per page changes
    },
    toggleFavorite(rate) {
      const index = this.favorites.findIndex((fav) => fav.title === rate.title);
      if (index === -1) {
        this.favorites.push(rate);
      } else {
        this.favorites.splice(index, 1);
      }
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
  }
});

<template>
    <div class="flex items-center space-x-4 mb-4">
      <label for="itemsPerPage">Элементов на странице:</label>
      <select id="itemsPerPage" v-model="itemsPerPage" @change="updateItemsPerPage" class="border rounded p-2">
        <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>
  </template>
  
  <script>
  import { ref, watch } from 'vue';
  import { useRatesStore } from '@/stores/ratesStore';
  
  export default {
    setup() {
      const ratesStore = useRatesStore();
      const itemsPerPage = ref(ratesStore.itemsPerPage);
      const options = [5, 10, 15, 20];
  
      const updateItemsPerPage = () => {
        ratesStore.updateItemsPerPage(itemsPerPage.value);
      };
  
      watch(() => ratesStore.itemsPerPage, (newItemsPerPage) => {
        itemsPerPage.value = newItemsPerPage;
      });
  
      return { itemsPerPage, options, updateItemsPerPage };
    }
  };
  </script>
  
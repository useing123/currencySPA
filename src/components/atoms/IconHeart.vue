<template>
    <button @click="toggleFavorite">
      <span :class="isFavorite ? 'text-red-500' : 'text-gray-500'">
        <font-awesome-icon :icon="['far', 'heart']" />
      </span>
    </button>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useRatesStore } from '../../stores/ratesStore';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

  
  export default {
    components: {
      FontAwesomeIcon
    },
    props: {
      rate: Object
    },
    setup(props) {
      const ratesStore = useRatesStore();
      const isFavorite = computed(() => ratesStore.favorites.some(fav => fav.title === props.rate.title));
  
      const toggleFavorite = () => {
        ratesStore.toggleFavorite(props.rate);
      };
  
      return { isFavorite, toggleFavorite };
    }
  };
  </script>
  
  <style scoped>
  button {
    background: none;
    border: none;
    cursor: pointer;
  }
  </style>
  
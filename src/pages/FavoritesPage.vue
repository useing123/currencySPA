<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Избранные</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <CurrencyCard
        v-for="rate in ratesStore.favorites"
        :key="rate.title"
        :rate="rate"
        @toggle-favorite="ratesStore.toggleFavorite(rate)"
      />
    </div>
  </div>
</template>

<script>
import { useRatesStore } from '@/stores/ratesStore';
import CurrencyCard from '@/components/molecules/CurrencyCard.vue';

export default {
  components: {
    CurrencyCard,
  },
  setup() {
    const ratesStore = useRatesStore();
    return { ratesStore };
  }
};
</script>

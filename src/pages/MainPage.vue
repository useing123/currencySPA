<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Главная</h1>
    <DatePicker class="mb-4" />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <CurrencyCard
        v-for="rate in ratesStore.filteredRates"
        :key="rate.title"
        :rate="rate"
        @toggle-favorite="toggleFavorite(rate)"
        class="hover:shadow-lg transition duration-300"
      />
    </div>
    <div class="flex justify-between items-center mt-4">
      <Pagination />
      <ItemsPerPageSelector />
    </div>
  </div>
</template>

<script>
import { useRatesStore } from '@/stores/ratesStore'
import CurrencyCard from '@/components/molecules/CurrencyCard.vue'
import DatePicker from '@/components/molecules/DatePicker.vue'
import Pagination from '@/components/molecules/Pagination.vue'
import ItemsPerPageSelector from '@/components/molecules/ItemsPerPageSelector.vue'

export default {
  components: {
    CurrencyCard,
    DatePicker,
    Pagination,
    ItemsPerPageSelector
  },
  setup() {
    const ratesStore = useRatesStore()

    // Fetch rates if not already fetched and set today's date
    if (ratesStore.rates.length === 0) {
      const today = new Date().toLocaleDateString('ru-RU').split('/').reverse().join('.')
      ratesStore.updateDate(today)
    }

    return { ratesStore }
  }
}
</script>

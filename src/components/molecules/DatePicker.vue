<template>
  <div class="flex items-center space-x-4">
    <input type="date" v-model="selectedDate" @change="updateDate" class="border rounded p-2" />
    <input
      type="text"
      v-model="searchQuery"
      @input="updateSearchQuery"
      class="border rounded p-2"
      placeholder="Search rates..."
    />
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useRatesStore } from '@/stores/ratesStore'

export default {
  setup() {
    const ratesStore = useRatesStore()
    const selectedDate = ref(ratesStore.selectedDate)
    const searchQuery = ref(ratesStore.searchQuery)

    const updateDate = () => {
      ratesStore.updateDate(selectedDate.value)
    }

    const updateSearchQuery = () => {
      ratesStore.updateSearchQuery(searchQuery.value)
    }

    watch(
      () => ratesStore.selectedDate,
      (newDate) => {
        selectedDate.value = newDate
      }
    )

    watch(
      () => ratesStore.searchQuery,
      (newQuery) => {
        searchQuery.value = newQuery
      }
    )

    return { selectedDate, searchQuery, updateDate, updateSearchQuery }
  }
}
</script>

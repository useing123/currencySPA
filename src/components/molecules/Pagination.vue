<template>
  <div class="flex justify-center mt-4">
    <button
      @click="changePage(ratesStore.currentPage - 1)"
      :disabled="ratesStore.currentPage === 1"
      class="border rounded p-2 mx-1 disabled:opacity-50"
    >
      Назад
    </button>
    <button
      v-for="page in ratesStore.totalPages"
      :key="page"
      @click="changePage(page)"
      :class="pageClass(page)"
    >
      {{ page }}
    </button>
    <button
      @click="changePage(ratesStore.currentPage + 1)"
      :disabled="ratesStore.currentPage === ratesStore.totalPages"
      class="border rounded p-2 mx-1 disabled:opacity-50"
    >
      Вперед
    </button>
  </div>
</template>

<script>
import { useRatesStore } from '@/stores/ratesStore'

export default {
  setup() {
    const ratesStore = useRatesStore()

    const changePage = (page) => {
      if (page >= 1 && page <= ratesStore.totalPages) {
        ratesStore.changePage(page)
      }
    }

    const pageClass = (page) => {
      return {
        'bg-blue-500 text-white': page === ratesStore.currentPage,
        'bg-white text-blue-500': page !== ratesStore.currentPage,
        'border rounded p-2 mx-1 cursor-pointer': true
      }
    }

    return { ratesStore, changePage, pageClass }
  }
}
</script>

<style scoped>
.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

<template>
  <div class="p-4 border rounded shadow-sm">
    <div class="flex justify-between items-center mb-2">
      <div class="flex items-center">
        <img :src="getFlagUrl(rate.title)" alt="" class="w-8 h-8 mr-2">
        <h2 class="text-xl font-semibold">{{ rate.fullname }}</h2>
      </div>
      <IconHeart :rate="rate" />
    </div>
    <p>{{ rate.title }} - {{ rate.description }}</p>
    <p>Quantity: {{ rate.quant }}</p>
    <p>Change: {{ rate.change }} ({{ rate.index }})</p>
  </div>
</template>

<script>
import IconHeart from '@/components/atoms/IconHeart.vue';
import { currencyFlags } from '@/assets/currencyFlags';

export default {
  components: {
    IconHeart
  },
  props: {
    rate: Object
  },
  data() {
    return {
      currencyFlags
    };
  },
  methods: {
    getFlagUrl(currencyCode) {
      const flagFileName = this.currencyFlags[currencyCode];
      return flagFileName ? new URL(`/src/assets/flags/${flagFileName}`, import.meta.url).href : '';
    }
  }
};
</script>

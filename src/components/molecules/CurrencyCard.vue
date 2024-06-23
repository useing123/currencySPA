<!-- Ваш текущий компонент -->
<template>
    <div class="p-4 border rounded shadow-sm">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-xl font-semibold">{{ rate.fullname }}</h2>
        <IconHeart :rate="rate" />
      </div>
      <p>{{ rate.title }} - {{ rate.description }}</p>
      <p>Quantity: {{ rate.quant }}</p>
      <p>Change: {{ rate.change }} ({{ rate.index }})</p>
    </div>
  </template>
  
  <script>
  import IconHeart from '@/components/atoms/IconHeart.vue';
  
  export default {
    components: {
      IconHeart
    },
    props: {
      rate: Object
    }
  };
  </script>
  
<template>
  <button class="btn" @click="onClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
.btn {
  /* стили кнопки */
}
</style>

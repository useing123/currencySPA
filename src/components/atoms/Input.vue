<template>
  <input class="input" type="text" v-model="value" @input="onInput" />
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped>
.input {
  /* стили поля ввода */
}
</style>

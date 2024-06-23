<template>
  <div id="app">
    <header class="bg-blue-600 p-4 text-white">
      <nav class="container mx-auto flex justify-between">
        <div>
          <router-link to="/" class="text-2xl font-bold">Currency Rates</router-link>
        </div>
        <div>
          <router-link to="/" class="mr-4">Home</router-link>
          <router-link to="/favorites">Favorites</router-link>
        </div>
      </nav>
    </header>
    <main class="container mx-auto p-4">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Add any global styles here */
</style>

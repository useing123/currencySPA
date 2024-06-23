import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../pages/MainPage.vue';
import FavoritesPage from '../pages/FavoritesPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainPage,
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: FavoritesPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

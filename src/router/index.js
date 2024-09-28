import { createRouter, createWebHistory } from 'vue-router';
import Home from '../interfaces/Home.vue';
import Login from '../interfaces/Login.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  // Otras rutas...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
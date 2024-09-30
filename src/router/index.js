import { createRouter, createWebHistory } from 'vue-router';
import Home from '../interfaces/Home.vue';
import Login from '../interfaces/Login.vue';
import DetallePelicula from '../interfaces/DetallePelicula.vue';
import DetalleArtista from '@/interfaces/DetalleArtista.vue';

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
  //Ruta para obtener los detalles de una pelicula
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: DetallePelicula,
  },
  {
    path: '/artista/:id',
    name: 'DetalleArtista',
    component: DetalleArtista,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
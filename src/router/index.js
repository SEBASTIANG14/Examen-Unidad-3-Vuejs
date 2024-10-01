import { createRouter, createWebHistory } from 'vue-router';
import Home from '../interfaces/Home.vue';
import Login from '../interfaces/Login.vue';
import DetallePelicula from '../interfaces/DetallePelicula.vue';
import DetalleArtista from '@/interfaces/DetalleArtista.vue';
import DetalleSerie from '@/interfaces/DetalleSerie.vue';
import DetalleCategoria from '@/interfaces/DetalleCategoria.vue'; 
import DetallePalabraClave from '@/interfaces/DetallePalabraClave.vue';
import DetalleTemporada from '@/interfaces/DetalleTemporada.vue';

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
  },

  //rutas para obtener los detalles de una serie
  {
    path: '/serie/:id',
    name: 'DetalleSerie',
    component: DetalleSerie,
  },

  //Ruta para obtener las peliculas de cada categoria
  {
    path: '/categoria/:category_id',
    name: 'DetalleCategoria',
    component: DetalleCategoria
  },

  {
    path: '/detallepalabraclave/:id',
    name: 'DetallePalabraClave',
    component: DetallePalabraClave
  },
  {
    path: '/serie/:seriesId/temporada/:seasonNumber',
    name: 'SeasonDetail',
    component: DetalleTemporada
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
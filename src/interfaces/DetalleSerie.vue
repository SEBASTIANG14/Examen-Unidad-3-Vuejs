<template lang="">
    <Navbar />
    <div v-if="series" :style="{ backgroundImage: 'url(https://image.tmdb.org/t/p/original' + series.backdrop_path + ')' }" class="series-detail">
      <div class="overlay">
        <div class="poster">
          <img :src="'https://image.tmdb.org/t/p/w500' + series.poster_path" alt="series poster" />
        </div>
        <div class="info">
          <h1>{{ series.name }} <span>({{ series.first_air_date.split('-')[0] }})</span></h1>
          <p class="genres">
            <router-link v-for="(genre, index) in series.genres" :key="genre.id" class="genre-link">
              {{ genre.name }}<span v-if="index < series.genres.length - 1">, </span>
            </router-link>
          </p>
          <p class="release-info">
            {{ series.first_air_date }} ({{ series.production_countries[0]?.iso_3166_1 || 'N/A' }}) • {{ series.episode_run_time[0] || 'N/A' }}m
          </p>
          <div class="user-score">
            <span>{{ series.vote_average * 10 }}%</span> Puntuación de usuario
          </div>
          <p class="overview">{{ series.overview }}</p>
  
          <!-- Información de la temporada actual -->
          <div v-if="currentSeason" class="current-season">
            <h2>Temporada Actual: {{ currentSeason.name }}</h2>
            <p>{{ currentSeason.air_date }} - {{ currentSeason.episode_count }} episodios</p>
            <img :src="'https://image.tmdb.org/t/p/w300' + currentSeason.poster_path" alt="Poster de la temporada" v-if="currentSeason.poster_path" />
          </div>
          
          <!-- Validar la existencia de 'credits' -->
          <div class="crew" v-if="series.credits?.crew && series.credits.crew.length">
            <p v-if="series.credits.crew[0]">
              <strong>{{ series.credits.crew[0]?.name }}</strong> - {{ series.credits.crew[0]?.job }}
            </p>
            <p v-if="series.credits.crew[1]">
              <strong>{{ series.credits.crew[1]?.name }}</strong> - {{ series.credits.crew[1]?.job }}
            </p>
          </div>
        </div>
      </div>
  
      <!-- Lista de actores principales -->
      <div v-if="series.credits?.cast && series.credits.cast.length" class="cast-section">
        <h2>Actores Principales</h2>
        <div class="cast-list">
          <div v-for="actor in series.credits.cast.slice(0, 6)" :key="actor.id" class="cast-card">
            <router-link class="artist-class" :to="'/artista/' + actor.id">
              <img :src="'https://image.tmdb.org/t/p/w185' + actor.profile_path" :alt="actor.name" v-if="actor.profile_path" />
              <p><strong>{{ actor.name }}</strong></p>
              <p>{{ actor.character }} ({{ actor.known_for_department }})</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  
    <div v-else>
      <p>Cargando detalles...</p>
    </div>
  
    <Footer :userName="userName" />
  </template>
  
  <script>
  import axios from 'axios'; 
  import Navbar from '../components/Navbar.vue';
  import Footer from '../components/Footer.vue';
  import '@fortawesome/fontawesome-free/css/all.css';
  
  export default {
    data() {
      return {
        series: null,
        currentSeason: null,
        userName: 'SEBASTIAN14'
      };
    },
    mounted() {
      this.fetchSeriesDetails();
    },
    methods: {
      async fetchSeriesDetails() {
        const seriesId = this.$route.params.id;
        console.log('Series ID:', seriesId);
        const apiKey = '7dbf2be7efbc38c8a5ba78d99ae9f933';  
        try {
          const response = await axios.get(`https://api.themoviedb.org/3/tv/${seriesId}?api_key=${apiKey}&append_to_response=credits`);
          this.series = response.data;
          console.log(this.series);
  
          // Obtener la temporada actual (última temporada en la lista)
          this.currentSeason = this.series.seasons[this.series.seasons.length - 1];
          console.log(this.currentSeason);
        } catch (error) {
          console.error('Error al obtener los detalles de la serie:', error);
        }
      }
    },
    components: {
      Navbar,
      Footer
    }
  };
  </script>
  
  <style>
  
  .current-season {
    margin-top: 2rem;
    text-align: left;
  }
  
  .current-season img {
    border-radius: 8px;
    max-width: 200px;
    margin-top: 1rem;
  }
  </style>
  
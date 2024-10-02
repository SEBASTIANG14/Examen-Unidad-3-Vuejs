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
  
          <!-- Información de todas las temporadas -->
          <div class="seasons-section">
            <h2>Temporadas</h2>
            <div class="seasons-wrapper">
              <div v-for="(season, index) in series.seasons" :key="season.id" class="season-card">
                <router-link :to="'/serie/' + series.id + '/temporada/' + season.season_number">
                  <img :src="'https://image.tmdb.org/t/p/w185' + season.poster_path" alt="Poster de la temporada" v-if="season.poster_path" />
                  <p>{{ season.name }} ({{ season.air_date ? season.air_date.split('-')[0] : 'N/A' }})</p>
                  <p>{{ season.episode_count }} episodios</p>
                </router-link>
              </div>
            </div>
          </div>
  
          <!-- Validar la existencia de credits -->
          <div class="crew" v-if="series.credits?.crew && series.credits.crew.length">
            <p v-if="series.credits.crew[0]">
              {{ series.credits.crew[0]?.name }} - {{ series.credits.crew[0]?.job }}
            </p>
            <p v-if="series.credits.crew[1]">
              {{ series.credits.crew[1]?.name }} - {{ series.credits.crew[1]?.job }}
            </p>
          </div>
        </div>
      </div>
  
      <!-- Lista de palabras clave -->
      <div v-if="keywords.length">
        <h2>Palabras clave</h2>
        <div class="keywords-list">
          <router-link
            v-for="keyword in keywords"
            :key="keyword.id"
            :to="'/detallepalabraclave/' + keyword.id"
            class="keyword"
          >
            {{ keyword.name }}
          </router-link>
        </div>
      </div>
  
      <!-- Lista de actores principales -->
      <div v-if="series.credits?.cast && series.credits.cast.length" class="cast-section">
        <h2>Actores Principales</h2>
        <div class="cast-list">
          <div v-for="actor in series.credits.cast.slice(0, 6)" :key="actor.id" class="cast-card">
            <router-link class="artist-class" :to="'/artista/' + actor.id">
              <img :src="'https://image.tmdb.org/t/p/w185' + actor.profile_path" :alt="actor.name" v-if="actor.profile_path" />
              <p >{{ actor.name }}</p>
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
        keywords: [],
        userName: 'SEBASTIAN14',
      };
    },
    mounted() {
      this.fetchSeriesDetails();
      this.fetchSeriesKeywords();
    },
    methods: {
      async fetchSeriesDetails() {
        const seriesId = this.$route.params.id;
        const apiKey = '7dbf2be7efbc38c8a5ba78d99ae9f933';  
        try {
          const response = await axios.get(`https://api.themoviedb.org/3/tv/${seriesId}?api_key=${apiKey}&append_to_response=credits`);
          this.series = response.data;
          this.currentSeason = this.series.seasons[this.series.seasons.length - 1];
        } catch (error) {
          console.error('Error al obtener los detalles de la serie:', error);
        }
      },
      async fetchSeriesKeywords() {
        const seriesId = this.$route.params.id;
        const apiKey = '7dbf2be7efbc38c8a5ba78d99ae9f933';  
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/tv/${seriesId}/keywords?api_key=${apiKey}`);
            console.log('Series keywords response:', response.data);
            this.keywords = response.data.results || [];
        } catch (error) {
            console.error('Error al obtener las palabras clave de la serie:', error);
        }
      },
    },
    components: {
      Navbar,
      Footer
    }
  };
  </script>
  
  <style scoped>
    body{
        color: white;
    }
    p{
        color: white;
    }


  .seasons-section {
    margin-top: 20px;
  }
  
  .seasons-wrapper {
    display: flex;
    flex-wrap: nowrap; /* Asegura que las tarjetas no se envuelvan */
    overflow-x: auto; /* Permite desplazamiento horizontal si es necesario */
  }
  
  .season-card {
    min-width: 200px; /* Ancho mínimo de cada tarjeta */
    margin: 10px;
    text-align: center;
  }
  
  .keywords-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 1rem;
  }
  
  .keyword {
    background-color: #f0f0f0;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.9rem;
    cursor: pointer;
  }
  </style>
  
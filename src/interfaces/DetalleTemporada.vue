<template>
    <Navbar />
    <div v-if="season" class="season-detail">
      <div class="season-header">
        <div class="poster">
          <img :src="'https://image.tmdb.org/t/p/w500' + season.poster_path" alt="Poster de la temporada" />
        </div>
        <div class="info" style=" color: black">
          <h1>{{ season.name }} ({{ season.air_date.split('-')[0] }})</h1>
          <p>{{ season.overview }}</p>
          <p><strong>Episodios: </strong>{{ season.episodes.length }}</p>
          <p><strong>Fecha de estreno: </strong>{{ season.air_date }}</p>
        </div>
      </div>
  
      <div v-if="season.episodes.length" class="episodes-section">
        <h2>Episodios</h2>
        <div class="grid-container">
          <div v-for="episode in season.episodes" :key="episode.id" class="episode-card">
            <div class="episode-image">
              <img
                :src="getImageUrl(episode.still_path)"
                alt="Imagen del episodio"
              />
            </div>
            <div class="episode-info">
              <h3>{{ episode.episode_number }}. {{ episode.name }}</h3>
              <p><strong>Fecha de emisión:</strong> {{ episode.air_date }}</p>
              <p><strong>Duración:</strong> {{ episode.runtime || 'N/A' }} min</p>
              <p>{{ episode.overview || 'No hay descripción disponible' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div v-else>
      <p>Cargando detalles de la temporada...</p>
    </div>
  
    <Footer :userName="userName" />
  </template>
  
  <script>
  import axios from 'axios';
  import Navbar from '../components/Navbar.vue';
  import Footer from '../components/Footer.vue';
  
  export default {
    data() {
      return {
        season: null,
        userName: 'SEBASTIAN14'
      };
    },
    mounted() {
      this.fetchSeasonDetails();
    },
    methods: {
      async fetchSeasonDetails() {
        const seriesId = this.$route.params.seriesId; // Id de la serie
        const seasonNumber = this.$route.params.seasonNumber; // Número de la temporada
        const apiKey = '7dbf2be7efbc38c8a5ba78d99ae9f933';
        
        try {
          const response = await axios.get(`https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}?api_key=${apiKey}`);
          this.season = response.data;
          console.log('Detalles de la temporada:', this.season);
        } catch (error) {
          console.error('Error al obtener los detalles de la temporada:', error);
        }
      },
      getImageUrl(path) {
        return path ? `https://image.tmdb.org/t/p/w500${path}` : 'default_image.jpg'; // Cambia 'default_image.jpg' a una imagen por defecto si no hay imagen.
      }
    },
    components: {
      Navbar,
      Footer
    }
  };
  </script>
  
  <style>
  
  .season-detail {
    padding: 2rem;
    color: white;
  }
  
  .season-header {
    display: flex;
    gap: 2rem;
  }
  
  .poster img {
    border-radius: 8px;
    max-width: 300px;
  }
  
  .info {
    max-width: 600px;
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .episodes-section {
    margin-top: 2rem;
  }
  
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .episode-card {
    background: #2a2a2a;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  .episode-image img {
    width: 100%;
    height: auto;
  }
  
  .episode-info {
    padding: 1rem;
  }
  
  .episode-card h3 {
    margin: 0 0 0.5rem 0;
  }
  
  .episode-card p {
    margin: 0.5rem 0;
  }
  </style>
  
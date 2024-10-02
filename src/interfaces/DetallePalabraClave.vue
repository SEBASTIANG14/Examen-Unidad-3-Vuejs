<template>
    <div v-if="keyword" class="keyword-detail">
      <h1>{{ keyword.name }}</h1>
      <p>{{ keyword.id }}</p>
  
      <div class="filter-buttons">
        <button @click="filterType('movie')" :class="{ active: currentType === 'movie' }">Películas</button>
        <button @click="filterType('tv')" :class="{ active: currentType === 'tv' }">Series</button>
      </div>
  
      <div v-if="filteredItems.length" class="media-grid">
        <h2>{{ currentType === 'movie' ? 'Películas' : 'Series' }} asociadas a esta palabra clave</h2>
        <div class="grid-container">
          <div v-for="item in filteredItems" :key="item.id" class="grid-item">
            <router-link :to="currentType === 'movie' ? '/movie/' + item.id : '/tv/' + item.id">
              <img :src="getImageUrl(item.poster_path)" :alt="item.title" class="poster-image" />
              <span class="media-title">{{ item.title }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Cargando detalles...</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        keyword: null,
        movies: [],
        series: [],
        currentType: 'movie', // Default to movies
      };
    },
    computed: {
      filteredItems() {
        return this.currentType === 'movie' ? this.movies : this.series;
      }
    },
    mounted() {
      this.fetchKeywordDetails();
    },
    methods: {
      async fetchKeywordDetails() {
        const keywordId = this.$route.params.id;  
        const apiKey = '7dbf2be7efbc38c8a5ba78d99ae9f933';
        try {
          const keywordResponse = await axios.get(`https://api.themoviedb.org/3/keyword/${keywordId}?api_key=${apiKey}`);
          this.keyword = keywordResponse.data;
  
          const moviesResponse = await axios.get(`https://api.themoviedb.org/3/keyword/${keywordId}/movies?api_key=${apiKey}`);
          this.movies = moviesResponse.data.results;
  
          const seriesResponse = await axios.get(`https://api.themoviedb.org/3/keyword/${keywordId}/tv?api_key=${apiKey}`);
          this.series = seriesResponse.data.results;
        } catch (error) {
          console.error('Error al obtener los detalles de la palabra clave:', error);
        }
      },
      filterType(type) {
        this.currentType = type;
      },
      getImageUrl(path) {
        return path ? `https://image.tmdb.org/t/p/w500${path}` : 'default_image.jpg'; // Cambia 'default_image.jpg' a una imagen por defecto si no hay imagen.
      }
    }
  };
  </script>
  
  <style>
  .keyword-detail {
    padding: 2rem;
  }
  
  .filter-buttons {
    margin-bottom: 2rem;
  }
  
  .filter-buttons button {
    margin-right: 10px;
    padding: 10px 20px;
    background-color: #f0f0f0;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .filter-buttons button.active {
    background-color: #007BFF;
    color: white;
  }
  
  .media-grid {
    margin-top: 20px;
  }
  
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Controla el tamaño de las columnas */
    grid-gap: 20px;
  }
  
  .grid-item {
    text-align: center;
  }
  
  .poster-image {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
  
  .media-title {
    display: block;
    margin-top: 10px;
    font-weight: bold;
  }
  </style>
  
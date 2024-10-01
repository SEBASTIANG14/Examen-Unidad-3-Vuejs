<template>
    <div v-if="keyword" class="keyword-detail">
      <h1>{{ keyword.name }}</h1>
      <p>{{ keyword.id }}</p>
      <div v-if="movies.length">
        <h2>Películas asociadas a esta palabra clave</h2>
        <ul>
          <li v-for="movie in movies" :key="movie.id">
            <router-link :to="'/movie/' + movie.id">{{ movie.title }}</router-link>
          </li>
        </ul>
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
        movies: []
      };
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
        } catch (error) {
          console.error('Error al obtener los detalles de la palabra clave:', error);
        }
      }
    }
  };
  </script>
  
  <style>
  .keyword-detail {
    padding: 2rem;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  </style>
  
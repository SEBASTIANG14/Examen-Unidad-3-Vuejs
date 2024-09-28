<template lang="">
    <div v-if="movie">
        <h1>{{ movie.title }}</h1>
        <p>{{ movie.overview }}</p>
        <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="Movie poster" />
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
      movie: null
    };
  },
  mounted() {
    this.fetchMovieDetails();
  },
  methods: {
    async fetchMovieDetails() {
      const movieId = this.$route.params.id;
      const apiKey = 'TU_API_KEY_DE_TMDB';
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
        this.movie = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
<style lang="">
    
</style>
<template lang="">
  <div v-if="movie" :style="{ backgroundImage: 'url(https://image.tmdb.org/t/p/original' + movie.backdrop_path + ')' }" class="movie-detail">
    <div class="overlay">
      <div class="poster">
        <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="Movie poster" />
      </div>
      <div class="info">
        <h1>{{ movie.title }} <span>({{ movie.release_date.split('-')[0] }})</span></h1>
        <p class="genres">
          <span v-for="(genre, index) in movie.genres" :key="genre.id">{{ genre.name }}<span v-if="index < movie.genres.length - 1">, </span></span>
        </p>
        <p class="release-info">
          {{ movie.release_date }} ({{ movie.production_countries[0]?.iso_3166_1 || 'N/A' }}) • {{ movie.runtime }}m
        </p>
        <div class="user-score">
          <span>{{ movie.vote_average * 10 }}%</span> Puntuación de usuario
        </div>
        <p class="overview">{{ movie.overview }}</p>
        <div class="crew" v-if="movie.credits && movie.credits.crew.length">
          <p v-if="movie.credits.crew[0]"><strong>{{ movie.credits.crew[0]?.name }}</strong> - {{ movie.credits.crew[0]?.job }}</p>
          <p v-if="movie.credits.crew[1]"><strong>{{ movie.credits.crew[1]?.name }}</strong> - {{ movie.credits.crew[1]?.job }}</p>
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
      movie: null
    };
  },
  mounted() {
    this.fetchMovieDetails();
  },
  methods: {
    async fetchMovieDetails() {
      const movieId = this.$route.params.id;
      console.log('Movie ID:', movieId);
      const apiKey = '7dbf2be7efbc38c8a5ba78d99ae9f933';
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
        this.movie = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    getDirectors() {
      return this.movie.credits.crew.filter(member => member.job === 'Director');
    },
    getWriters() {
      return this.movie.credits.crew.filter(member => member.job === 'Screenplay' || member.job === 'Writer');
    }
  }
};
</script>
<style>
.movie-detail {
  position: relative;
  background-size: cover;
  background-position: center;
  color: white;
  padding: 2rem;
}

.overlay {
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  padding: 2rem;
}

.poster img {
  border-radius: 8px;
  max-width: 300px;
}

.info {
  margin-left: 2rem;
  max-width: 700px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.genres {
  font-size: 1.2rem;
  color: #ddd;
}

.release-info, .user-score {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.user-score span {
  font-weight: bold;
  color: #73c700;
}

.overview {
  margin: 1.5rem 0;
  font-size: 1.2rem;
  line-height: 1.5;
}

.crew p {
  margin: 0.5rem 0;
}
</style>
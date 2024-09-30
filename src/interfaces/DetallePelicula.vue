<template lang="">
  <Navbar/>
    <div v-if="movie" :style="{ backgroundImage: 'url(https://image.tmdb.org/t/p/original' + movie.backdrop_path + ')' }" class="movie-detail">
    <div class="overlay">
      <div class="poster">
        <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="Movie poster" />
      </div>
      <div class="info">
        <h1>{{ movie.title }} <span>({{ movie.release_date.split('-')[0] }})</span></h1>
        <p class="genres">
          <router-link v-for="(genre, index) in movie.genres" :key="genre.id" class="genre-link">{{ genre.name }}<span v-if="index < movie.genres.length - 1">, </span></router-link>
        </p>
        <p class="release-info">
          {{ movie.release_date }} ({{ movie.production_countries[0]?.iso_3166_1 || 'N/A' }}) • {{ movie.runtime }}m
        </p>
        <div class="user-score">
          <span>{{ movie.vote_average * 10 }}%</span> Puntuación de usuario
        </div>
        <p class="overview">{{ movie.overview }}</p>
        
        <!-- Validar la existencia de 'credits' -->
        <div class="crew" v-if="movie.credits?.crew && movie.credits.crew.length">
          <p v-if="movie.credits.crew[0]"><strong>{{ movie.credits.crew[0]?.name }}</strong> - {{ movie.credits.crew[0]?.job }}</p>
          <p v-if="movie.credits.crew[1]"><strong>{{ movie.credits.crew[1]?.name }}</strong> - {{ movie.credits.crew[1]?.job }}</p>
        </div>
      </div>
    </div>
    <div v-if="movie.credits?.cast && movie.credits.cast.length" class="cast-section">
      <h2>Actores Principales</h2>
      <div class="cast-list">
        <div v-for="actor in movie.credits.cast.slice(0, 6)" :key="actor.id" class="cast-card">
          <router-link class="artist-class" :to="'/artista/' + actor.id">
            <img :src="'https://image.tmdb.org/t/p/w185' + actor.profile_path" :alt="actor.name" v-if="actor.profile_path" />
            <p><strong>{{ actor.name }}</strong></p>
            <p>{{ actor.character }} ({{ actor.known_for_department }})</p>
          </router-link >
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
import Footer from '../components/Footer.vue'
import '@fortawesome/fontawesome-free/css/all.css';


export default {
  data() {
    return {
      movie: null,
      userName: 'SEBASTIAN14' 
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
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits`);
        this.movie = response.data;
        console.log(this.movie);  
      } catch (error) {
        console.error('Error al obtener los detalles de la película:', error);
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

.artist-class {
  text-decoration: none;
  color: rgb(255, 255, 255); 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
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

.cast-section {
  margin-top: 2rem;
}

.cast-list {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.cast-card {
  width: 150px;
  text-align: center;
}

.cast-card img {
  border-radius: 8px;
  width: 100%;
  height: auto;
}

.cast-card p {
  margin: 0.5rem 0;
}

.genre-link {
  text-decoration: none;
  color: #ffffff;
  font-weight: bold;
}

</style>
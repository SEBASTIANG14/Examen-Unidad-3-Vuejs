<template lang="">
  <div class="nav">
    <router-link :to="'/'">
      <h1>Peliculas algo mal <i class="bi bi-fire"></i></h1>
    </router-link>
      <div class="auth-section">
        <router-link v-if="!isLoggedIn" class="button is-primary" to="/login">Iniciar Sesión</router-link>
        <div v-else class="user-info">
          <span class="user-name" @click="toggleMenu">
            <i class="bi bi-person-fill"></i> {{ userName }}
            <i class="bi bi-caret-down-fill"></i> <!-- Icono para el menú desplegable -->
          </span>
          <div v-if="showMenu" class="dropdown-menu">
            <ul>
              <li @click="logout">Cerrar Sesión</li>
            </ul>
          </div>
        </div>
      </div>
    </div>    
    <div v-if="movie" :style="{ backgroundImage: 'url(https://image.tmdb.org/t/p/original' + movie.backdrop_path + ')' }" class="movie-detail">
    <div class="overlay">
      <div class="poster">
        <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="Movie poster" />
      </div>
      <div class="info">
        <h1>{{ movie.title }} <span>({{ movie.release_date.split('-')[0] }})</span></h1>
        <p class="genres">
          <router-link v-for="(genre, index) in movie.genres" :key="genre.id" :to="'/categoria/' + genre.id" class="genre-link">{{ genre.name }}<span v-if="index < movie.genres.length - 1">, </span></router-link>
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


    <div v-if="trailer" class="trailer">
      <h2>Tráiler</h2>
      <iframe :src="trailer" width="560" height="315" frameborder="0" allowfullscreen></iframe>
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
      userName: 'SEBASTIAN14',
      keywords: [],
      trailer: null
    };
  },
  mounted() {
    this.fetchMovieDetails();
    this.fetchMovieKeywords();
    this.fetchMovieTrailer();
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
    },
    async fetchMovieKeywords() {
      const movieId = this.$route.params.id;
      const apiKey = '7dbf2be7efbc38c8a5ba78d99ae9f933';
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/keywords?api_key=${apiKey}`);
        this.keywords = response.data.keywords;
      } catch (error) {
        console.error('Error al obtener las palabras clave:', error);
      }
    },
    async fetchMovieTrailer() {
      const movieId = this.$route.params.id;
      const apiKey = '7dbf2be7efbc38c8a5ba78d99ae9f933';
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`);
        const videos = response.data.results;
        const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');
        if (trailer) {
          this.trailer = `https://www.youtube.com/embed/${trailer.key}`;
        }
      } catch (error) {
        console.error('Error al obtener el tráiler:', error);
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
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f4;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
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
  color: #3498db;
  margin: 0;
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
.keywords-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.keyword {
  background-color: #f0f0f0;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9rem;
}

.trailer {
  margin-top: 20px;
}


</style>
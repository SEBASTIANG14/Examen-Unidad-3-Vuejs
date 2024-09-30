<template lang="">
    <Navbar />
    <div class="artist-detail" v-if="artist">
      <div class="artist-header">
        <div class="artist-image">
          <img :src="'https://image.tmdb.org/t/p/w500' + artist.profile_path" alt="Artist photo" v-if="artist.profile_path" />
        </div>
        <div class="artist-info">
          <h1>{{ artist.name }}</h1>
          <h2>Biografía</h2>
          <p>{{ artist.biography || 'Biografía no disponible' }}</p>
        </div>
      </div>
  
      <div class="artist-details">
        <h3>Información personal</h3>
        <p><strong>Conocido por:</strong> {{ artist.known_for_department }}</p>
        <p><strong>Cumpleaños:</strong> {{ artist.birthday || 'No disponible' }}</p>
        <p><strong>Lugar de nacimiento:</strong> {{ artist.place_of_birth || 'No disponible' }}</p>
      </div>
  
      <div class="artist-movies" v-if="knownForMovies.length">
        <h2>Conocido por</h2>
        <div class="movies-grid">
          <div v-for="movie in knownForMovies" :key="movie.id" class="movie-item">
            <img :src="'https://image.tmdb.org/t/p/w154' + movie.poster_path" :alt="movie.title" v-if="movie.poster_path" />
            <p>{{ movie.title }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Cargando detalles del artista...</p>
    </div>
    <Footer />
  </template>
  
<script>
import axios from 'axios'
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
    data() {
    return {
      artist: null,
      knownForMovies: []
    };
  },
  mounted() {
    this.fetchArtistDetails();
    this.fetchArtistMovies();
  },
  methods: {
    async fetchArtistDetails() {
      const artistId = this.$route.params.id;
      const apiKey = '7dbf2be7efbc38c8a5ba78d99ae9f933';
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/person/${artistId}?api_key=${apiKey}`);
        this.artist = response.data;
      } catch (error) {
        console.error('Error al obtener los detalles del artista:', error);
      }
    },
    async fetchArtistMovies() {
      const artistId = this.$route.params.id;
      const apiKey = '7dbf2be7efbc38c8a5ba78d99ae9f933';
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/person/${artistId}/movie_credits?api_key=${apiKey}`);
        this.knownForMovies = response.data.cast.slice(0, 10); 
      } catch (error) {
        console.error('Error al obtener las películas del artista:', error);
      }
    }
  },
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
.artist-detail {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

.artist-header {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.artist-image img {
  width: 300px;
  border-radius: 10px;
  height: auto;
}

.artist-info {
  flex-grow: 1;
}

.artist-info h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #6b8fcf;
}

.artist-info h2 {
  font-size: 1.5rem;
  margin: 10px 0;
}

.artist-info p {
  font-size: 1rem;
  line-height: 1.5;
  text-align: justify;
}

.artist-details {
  margin-top: 20px;
  padding-left: 320px; 
}

.artist-details h3 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.artist-details p {
  margin: 5px 0;
}

.artist-movies {
  margin-top: 40px;
}

.artist-movies h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.movies-grid {
  display: flex;
  gap: 10px;
  overflow-x: auto;
}

.movie-item {
  text-align: center;
}

.movie-item img {
  border-radius: 10px;
  width: 150px;
}

.movie-item p {
  margin-top: 10px;
  font-size: 0.9rem;
  font-weight: bold;
}
</style>
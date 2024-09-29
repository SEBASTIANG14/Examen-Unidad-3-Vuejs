<template>
  <div>
    <div class="nav">
      <h1>Peliculas algo mal <i class="bi bi-fire"></i></h1>
      <router-link class="login-link" to="/login">Iniciar Sesión</router-link>
    </div>
    
    <div class="image-slider" @mouseover="pauseSlider" @mouseleave="resumeSlider">
      <img v-if="images.length" :src="images[currentImage]" alt="Imagen Deslizante" />
      <p v-else>Cargando imágenes...</p>
      <div class="input-container">
        <i class="bi bi-search"></i>
        <input type="text" class="overlay-input" placeholder="Buscar, Serie, Pelicula o persona...">
      </div>
    </div>

    <!-- Seccion 1 -->
    <div class="now-playing-section">
      <h2>Tendecias</h2>
      <div class="now-playing-slider">
        <button @click="prevMovie" class="nav-button left">❮</button>
        <div class="movie-container">
          <div class="movies-wrapper" :style="{ transform: `translateX(-${currentNowPlayingIndex * movieWidth}px)` }">
            <router-link
              v-for="(movie, index) in nowPlayingImages"
              :key="index"
              :to="`/movie/${movie.id}`"
              class="custom-link"
            >
              <img
                :src="movie.poster_path"
                alt="Now Playing Movie"
                class="movie-image"
              />
              <p>{{ movie.title }}</p>
            </router-link>
          </div>
        </div>
        <button @click="nextMovie" class="nav-button right">❯</button>
      </div>
    </div>

    <!-- Sección 2 -->
    <div class="popular-movies-section">
      <h2>Populares</h2>
      <div class="now-playing-slider">
        <button @click="prevPopularMovie" class="nav-button left">❮</button>
        <div class="movie-container">
          <div class="movies-wrapper" :style="{ transform: `translateX(-${currentPopularIndex * movieWidth}px)` }">
            <router-link
              v-for="(movie, index) in popularImages"
              :key="index"
              :to="`/movie/${movie.id}`"
              class="custom-link"
            >
              <img
                :src="movie.poster_path"
                alt="Película Popular"
                class="movie-image"
              />
              <p>{{ movie.title }}</p>
            </router-link>
          </div>
        </div>
        <button @click="nextPopularMovie" class="nav-button right">❯</button>
      </div>
    </div>

    <div class="top-rated-movies-section">
      <h2>Películas Mejor Valoradas</h2>
      <div class="now-playing-slider">
        <button @click="prevTopRatedMovie" class="nav-button left">❮</button>
        <div class="movie-container">
          <div class="movies-wrapper" :style="{ transform: `translateX(-${currentTopRatedIndex * movieWidth}px)` }">
            <router-link
              v-for="(movie, index) in topRatedImages"
              :key="index"
              :to="`/movie/${movie.id}`"
              class="custom-link"
            >
              <img
                :src="movie.poster_path"
                alt="Película Mejor Valorada"
                class="movie-image"
              />
              <p>{{ movie.title }}</p>
            </router-link>
          </div>
        </div>
        <button @click="nextTopRatedMovie" class="nav-button right">❯</button>
      </div>
    </div>

    <!-- Sección 4: Próximamente -->
    <div class="upcoming-movies-section">
      <h2>Series o tv</h2>
      <div class="now-playing-slider">
        <button @click="prevUpcomingMovie" class="nav-button left">❮</button>
        <div class="movie-container">
          <div class="movies-wrapper" :style="{ transform: `translateX(-${currentUpcomingIndex * movieWidth}px)` }">
            <router-link
              v-for="(movie, index) in upcomingImages"
              :key="index"
              :to="`/movie/${movie.id}`"
              class="custom-link"
            >
              <img
                :src="movie.poster_path"
                alt="Próximamente en Cines"
                class="movie-image"
              />
              <p>{{ movie.title }}</p>
            </router-link>
          </div>
        </div>
        <button @click="nextUpcomingMovie" class="nav-button right">❯</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      images: [],  
      currentImage: 0,
      interval: null,
      nowPlayingImages: [],
      currentNowPlayingIndex: 0,
      movieWidth: 300,

      popularImages: [],
      currentPopularIndex: 0,

      topRatedImages: [],
      currentTopRatedIndex: 0,

      upcomingImages: [],
      currentUpcomingIndex: 0,
    };
  },
  mounted() {
    this.fetchImages(); 
    this.fetchNowPlayingImages();
    this.fetchPopularImages();
    this.fetchTopRatedImages();
    this.fetchUpcomingImages();
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    async fetchImages() {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Mzg4NTEzMjQ2ZDlhMGU0MmM0N2M1M2NkOGNlOTlkZiIsIm5iZiI6MTcyNzUxNTY4MC4zMDc3NjYsInN1YiI6IjY2ZjJmNjk3ZmMwMDk4MzkxNDhkOTA3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b0xQ3D8ep0nGLUUZuUXA_SS4Kmb4ZVcIl-YWqPkJZz4'
        }
      };

      try {
        const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        this.images = data.results.map(movie => `https://image.tmdb.org/t/p/original${movie.poster_path}`);
        this.startImageSlider();
      } catch (err) {
        console.error('Error fetching images:', err);
      }
    },
    async fetchNowPlayingImages() {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Mzg4NTEzMjQ2ZDlhMGU0MmM0N2M1M2NkOGNlOTlkZiIsIm5iZiI6MTcyNzUxNTY4MC4zMDc3NjYsInN1YiI6IjY2ZjJmNjk3ZmMwMDk4MzkxNDhkOTA3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b0xQ3D8ep0nGLUUZuUXA_SS4Kmb4ZVcIl-YWqPkJZz4'
        }
      };

      try {
        const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        this.nowPlayingImages = data.results.map(movie => ({
          id: movie.id,
          poster_path: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
          title: movie.title
        }));
      } catch (err) {
        console.error('Error fetching now playing images:', err);
      }
    },
    nextMovie() {
      if (this.currentNowPlayingIndex < this.nowPlayingImages.length - 1) {
        this.currentNowPlayingIndex++;
      }
    },
    prevMovie() {
      if (this.currentNowPlayingIndex > 0) {
        this.currentNowPlayingIndex--;
      }
    },
    async fetchPopularImages() {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Mzg4NTEzMjQ2ZDlhMGU0MmM0N2M1M2NkOGNlOTlkZiIsIm5iZiI6MTcyNzUxNTY4MC4zMDc3NjYsInN1YiI6IjY2ZjJmNjk3ZmMwMDk4MzkxNDhkOTA3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b0xQ3D8ep0nGLUUZuUXA_SS4Kmb4ZVcIl-YWqPkJZz4'
        }
      };

      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        this.popularImages = data.results.map(movie => ({
          id: movie.id,
          poster_path: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
          title: movie.title
        }));
      } catch (err) {
        console.error('Error fetching popular images:', err);
      }
    },
    nextPopularMovie() {
      if (this.currentPopularIndex < this.popularImages.length - 1) {
        this.currentPopularIndex++;
      }
    },
    prevPopularMovie() {
      if (this.currentPopularIndex > 0) {
        this.currentPopularIndex--;
      }
    },
    async fetchTopRatedImages() {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Mzg4NTEzMjQ2ZDlhMGU0MmM0N2M1M2NkOGNlOTlkZiIsIm5iZiI6MTcyNzUxNTY4MC4zMDc3NjYsInN1YiI6IjY2ZjJmNjk3ZmMwMDk4MzkxNDhkOTA3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b0xQ3D8ep0nGLUUZuUXA_SS4Kmb4ZVcIl-YWqPkJZz4'
        }
      };

      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        this.topRatedImages = data.results.map(movie => ({
          id: movie.id,
          poster_path: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
          title: movie.title
        }));
      } catch (err) {
        console.error('Error fetching top rated images:', err);
      }
    },
    nextTopRatedMovie() {
      if (this.currentTopRatedIndex < this.topRatedImages.length - 1) {
        this.currentTopRatedIndex++;
      }
    },
    prevTopRatedMovie() {
      if (this.currentTopRatedIndex > 0) {
        this.currentTopRatedIndex--;
      }
    },
    async fetchUpcomingImages() {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Mzg4NTEzMjQ2ZDlhMGU0MmM0N2M1M2NkOGNlOTlkZiIsIm5iZiI6MTcyNzUxNTY4MC4zMDc3NjYsInN1YiI6IjY2ZjJmNjk3ZmMwMDk4MzkxNDhkOTA3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b0xQ3D8ep0nGLUUZuUXA_SS4Kmb4ZVcIl-YWqPkJZz4'
        }
      };

      try {
        const response = await fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', options);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        this.upcomingImages = data.results.map(movie => ({
          id: movie.id,
          poster_path: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
          title: movie.title
        }));
      } catch (err) {
        console.error('Error fetching upcoming images:', err);
      }
    },

    nextUpcomingMovie() {
      if (this.currentUpcomingIndex < this.upcomingImages.length - 1) {
        this.currentUpcomingIndex++;
      }
    },
    prevUpcomingMovie() {
      if (this.currentUpcomingIndex > 0) {
        this.currentUpcomingIndex--;
      }
    },
    startImageSlider() {
      this.interval = setInterval(() => {
        this.currentImage = (this.currentImage + 1) % this.images.length;
      }, 3000);
    },
    pauseSlider() {
      clearInterval(this.interval);
    },
    resumeSlider() {
      this.startImageSlider();
    },
  },
};
</script>

  
  <style scoped>
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #f4f4f4;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    color: #3498db;
    margin: 0;
  }
  
  .login-link {
    text-decoration: none;
    color: #ffffff;
    background-color: #3498db;
    padding: 5px;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .login-link:hover {
    background-color: #f4f4f4;
    border: 1px solid rgb(255, 166, 88);
    color: rgb(255, 166, 88);
  }
  
  .image-slider {
    height: 500px;
    width: 100%; 
    display: flex;
    justify-content: center;
    align-items: center; 
    overflow: hidden; 
    background-color: rgb(76, 0, 255);
  }
  
  .image-slider img {
    width: 100%;
    height: 100%; 
    object-fit: cover; 
    border-radius: 10px;
    opacity: 0.7;
  }
  
  .input-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    z-index: 10;
  }
  
  .input-container i {
    font-size: 20px;
    margin-right: 8px;
    margin-top: 2px;
    color: #000000;
  }
  
  .overlay-input {
    display: block;
    border: none;
    outline: none;
    background: none;
    padding: 5px;
    font-size: 16px;
    margin-left: 30px;
    width: 400px;
  }
  
  .now-playing-section .popular-movies-section{
    margin-top: 20px;
    text-align: center;
  }
  
  .now-playing-slider {
    display: flex;
    align-items: center;
    overflow: hidden; 
  }
  
  .movie-container {
    width: 100%;
    overflow: hidden;
  }
  
  .movies-wrapper {
    display: flex;
    transition: transform 0.3s ease;
  }
  
  .movie-image {
    width: 200px; 
    margin: 0 5px;
    border-radius: 10px;
    
  }
  
  .nav-button {
    background-color: rgba(0, 0, 0, 0.8);
    border: none;
    cursor: pointer;
    padding: 10px;
    font-size: 24px;
    margin: 0 10px;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .nav-button:hover {
    background-color: rgba(255, 255, 255, 1);
  }

  p{
    text-align: center;
    color: #000000;
  }

  .custom-link {
    text-decoration: none;
    color: #3498db;
    font-weight: bold;
  }

  .custom-link:hover {
    color: #ff9900;
    text-decoration: underline;
  }
</style>
  
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
      };
    },
    mounted() {
      this.fetchImages(); 
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
          console.log(data);
  
          
          this.images = data.results.map(movie => `https://image.tmdb.org/t/p/original${movie.poster_path}`);
          
          this.startImageSlider();
        } catch (err) {
          console.error('Error fetching images:', err);
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
  border: none;
  outline: none;
  background: none;
  padding: 5px;
  font-size: 16px;
  margin-left: 30px;
  width: 400px;
}
  </style>
  
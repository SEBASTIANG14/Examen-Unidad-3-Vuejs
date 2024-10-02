<template>
  <div class="contenedorInicial">
    <div class="box Login" v-if="!acceso">
      <h1 class="title">Login</h1>
      <hr>
      <form @submit.prevent="onsubmit">
        <fieldset>
          <div>
            <input
              type="text"
              v-model="username"
              placeholder="Escribe tu Usuario"
              required
              name="username"
              id="username"
              class="input"
            />
          </div>
        </fieldset>
        <fieldset>
          <div class="input-container">
            <input
              type="password"
              v-model="password"
              placeholder="Escribe tu contraseña"
              required
              name="password"
              id="password"
              class="input"
            />
          </div>
        </fieldset>
        <button type="submit" :disabled="loading" class="button is-dark">
          <span v-if="loading">Cargando...</span>
          <span v-else>Acceder</span>
        </button>
      </form>
      <p v-if="errorAcceso" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Login',
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const acceso = ref(false);
    const errorAcceso = ref(false);
    const loading = ref(false);
    const errorMessage = ref('');
    const images = ref([]);
    let imageInterval = null;

    async function fetchImages() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Mzg4NTEzMjQ2ZDlhMGU0MmM0N2M1M2NkOGNlOTlkZiIsIm5iZiI6MTcyNzc0MjMwMS40MzIzMTIsInN1YiI6IjY2ZjJmNjk3ZmMwMDk4MzkxNDhkOTA3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e3FHFu1Kg9ZpniMoe7vDgwQNDgf6E-3azA8C9BFozgI'
    }
  };

  try {
    const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    console.log('Imágenes obtenidas de la API:', data.results);
    
    images.value = data.results.map(movie => {
      const imageUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
      console.log('URL de la imagen:', imageUrl);
      return imageUrl;
    });

    if (images.value.length > 0) {
      startImageSlider();
    } else {
      console.error('No se obtuvieron imágenes.');
    }

  } catch (err) {
    console.error('Error fetching images:', err);
  }
}

function startImageSlider() {
  let currentImageIndex = 0;

  // Verifica que haya imágenes disponibles
  if (images.value.length > 0) {
    console.log('Aplicando primera imagen:', images.value[0]);
    document.body.style.backgroundImage = `url(${images.value[0]})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.transition = 'background-image 1s ease-in-out';
  } else {
    console.error('No hay imágenes para mostrar en el slider.');
    return;
  }

  // Inicia el intervalo para cambiar las imágenes
  imageInterval = setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % images.value.length;
    console.log('Cambiando a la imagen:', images.value[currentImageIndex]);
    document.body.style.backgroundImage = `url(${images.value[currentImageIndex]})`;
  }, 5000); 
}


   
    onUnmounted(() => {
      clearInterval(imageInterval); 
      document.body.style.backgroundImage = '';
    });

    async function onsubmit() {
      loading.value = true; 
      try {
        const tokenResponse = await fetch('https://api.themoviedb.org/3/authentication/token/new?api_key=5388513246d9a0e42c47c53cd8ce99df');
        if (!tokenResponse.ok) throw new Error('Error al obtener el token');

        const dataToken = await tokenResponse.json();
        const token = dataToken.request_token;

        const loginResponse = await fetch('https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=5388513246d9a0e42c47c53cd8ce99df', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: username.value,
            password: password.value,
            request_token: token
          })
        });

        if (!loginResponse.ok) {
          errorMessage.value = 'Usuario o contraseña incorrectos';
          errorAcceso.value = true;
          loading.value = false; 
          return;
        }

        const loginData = await loginResponse.json();

        const sessionResponse = await fetch('https://api.themoviedb.org/3/authentication/session/new?api_key=5388513246d9a0e42c47c53cd8ce99df', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ request_token: loginData.request_token })
        });

        if (!sessionResponse.ok) throw new Error('Error al crear la sesión');

        const sessionData = await sessionResponse.json();

        if (sessionData.success) {
          acceso.value = true;
          errorAcceso.value = false;
          
          localStorage.setItem('user', JSON.stringify({ name: username.value, session_id: sessionData.session_id }));
          username.value = ''; 
          password.value = ''; 
          router.push({ name: 'Home' });
        } else {
          throw new Error('Error al crear la sesión');
        }
      } catch (error) {
        console.error('Error:', error);
        errorAcceso.value = true;
        errorMessage.value = error.message || 'Error inesperado';
      } finally {
        loading.value = false;
      }
    }

    onMounted(() => {
      // Establece una imagen de fondo predeterminada al cargar el componente
      document.body.style.backgroundImage = 'url("https://via.placeholder.com/1920x1080")';
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundAttachment = 'fixed';

      fetchImages();
    });

    return {
      username,
      password,
      acceso,
      errorAcceso,
      loading,
      errorMessage,
      onsubmit,
    };
  },
};
</script>

<style scoped>
body {
  position: relative;
  transition: background-image 1s ease-in-out;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1;
  pointer-events: none; 
}

.contenedorInicial {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  z-index: 2; 
}

.Login {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 16px;
  width: calc(100% - 30px);
  max-width: 400px;
  text-align: center;
  position: relative;
  z-index: 3; 
}

fieldset {
  margin-bottom: 1px;
  padding: 0;
  border: none;
}

.input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.button:disabled {
  background-color: #ccc;
}

.error-message {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}


</style>

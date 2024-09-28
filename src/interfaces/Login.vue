<!-- Login.vue -->
<template>
    <div>
        <div class="Login">
            <h1>Login</h1>
            <form @submit.prevent="onsubmit" v-if="!acceso">
                <fieldset>
                    <div class="input-container">
                        <i class="bi bi-person-fill"></i>
                        <input type="text" v-model="username" placeholder="Escribe tu Usuario" required name="username">
                    </div>
                </fieldset>
                <fieldset>
                    <div class="input-container">
                        <i class="bi bi-lock-fill"></i>
                        <input type="password" v-model="password" placeholder="Escribe tu contraseña" required name="password">
                    </div>
                </fieldset>
                <button type="submit">Acceder</button>
            </form>
        </div>
      <p v-if="errorAcceso" style="color: red;">Error al iniciar sesión. Inténtalo de nuevo.</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const username = ref('');
  const password = ref('');
  const acceso = ref(false);
  const errorAcceso = ref(false);
  const sessionId = ref('');
  const usuarioSesion = ref(null);
  
  const obtenerPeliculas = async () => {
    // Implementar lógica para obtener películas aquí
  };
  
  async function onsubmit() {
    try {
      const tokenResponse = await fetch('https://api.themoviedb.org/3/authentication/token/new?api_key=5388513246d9a0e42c47c53cd8ce99df');
      
      if (!tokenResponse.ok) {
        throw new Error('Error al obtener el token');
      }
      
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
        throw new Error('Error al validar el token');
      }
      
      const loginData = await loginResponse.json();
      
      const sessionResponse = await fetch('https://api.themoviedb.org/3/authentication/session/new?api_key=5388513246d9a0e42c47c53cd8ce99df', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request_token: loginData.request_token })
      });
      
      if (!sessionResponse.ok) {
        throw new Error('Error al crear la sesión');
      }
      
      const sessionData = await sessionResponse.json();
      
      if (sessionData.success) {
        acceso.value = true;
        errorAcceso.value = false;
        usuarioSesion.value = { name: username.value, session_id: sessionData.session_id };
        
        sessionStorage.setItem('usuarioSesion', JSON.stringify(usuarioSesion.value));
        sessionId.value = sessionData.session_id;
        
        await obtenerPeliculas(); // Llama a la función para obtener películas
      } else {
        throw new Error('Error al crear la sesión');
      }
    } catch (error) {
      console.error('Error:', error);
      errorAcceso.value = true;
    }
  }
  </script>
  
  <style scoped>
  
  .Login{
    background-color: #ffffff;
    margin: 10% auto;
    padding: 10px;
    border: 2px solid #000000;
    border-radius: 20px;
    width: calc(100% - 30px);
    max-width: 400px;
    height: auto;
    text-align: center;
  }

  fieldset {
    margin-bottom: 20px;
    padding: 0 10px;
    border: none;
    
  }
  
  button {
    padding: 0.5em 1em;
    background-color: #3498db;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #00930f;
    color: rgb(255, 255, 255);
    border: 1px solid #000000;
  }
  
  h1 {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 2.5rem;
    color: #75afff;
    padding: 10px 20px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.5);
    text-transform: uppercase;
    letter-spacing: 5px;
  }
  
  p {
    font-family: Arial, sans-serif;
  }

  input {
        outline: none;
        display: block;
        width: 100%;
        border:none;
        border-bottom: 2px solid rgb(173, 173, 173,0.5); /* darken(white, 15%) en CSS */
        margin: 10 0px;
        padding: 10px 15px;
        box-sizing: border-box;
        font-weight: 400;
        transition: border 0.7s ease, color 0.7s ease; /* Reemplazo del @include transition */
    }

    input:focus {
        border:none;
        border-bottom: 1px solid rgb(0, 0, 0); /* Reemplaza accent por el color deseado */
        color: darkgray; 
    }

    .input-container {
        position: relative;
    }

    .input-container i {
        position: absolute;
        left: 10px; /* Ajusta según sea necesario */
        top: 50%; /* Centra verticalmente */
        transform: translateY(-50%);
        color: gray; /* Cambia el color del ícono si es necesario */
    }

    .input-container input {
        padding-left: 30px; /* Asegúrate de que no se superponga con el ícono */
    }
</style>
  
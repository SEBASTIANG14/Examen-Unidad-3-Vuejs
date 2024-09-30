<template>
    <footer class="footer">
      <div class="footer-content">
        <!-- Logo de TMDB -->
        <div class="logo">
          <img src="https://www.themoviedb.org/assets/2/v4/logos/293x302-powered-by-square-green-c64bdbd49738e84ae19d82ab7b2dbb30bf896f02d91e26bc54b50a654320ef4f.png" alt="TMDB Logo" />
        </div>
        <!-- Mensaje de bienvenida -->
        <p class="welcome-message">¡Hola {{ userName }}!</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "Footer",
    props: {
      userName: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: #032541;
    color: white;
    padding: 20px 0;
    text-align: center;
  }
  
  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .logo img {
    height: 40px;
    margin-bottom: 10px;
  }
  
  .welcome-message {
    font-size: 16px;
    color: #01b4e4;
  }
  </style>
  
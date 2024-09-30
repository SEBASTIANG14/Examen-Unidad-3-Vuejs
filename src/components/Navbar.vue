<template>
    <nav class="navbar">
      <div class="navbar-left">
        <!-- Logo de TMDB -->
        <div class="logo">
          <img src="https://www.themoviedb.org/assets/2/v4/logos/293x302-powered-by-square-green-c64bdbd49738e84ae19d82ab7b2dbb30bf896f02d91e26bc54b50a654320ef4f.png" alt="TMDB Logo" />
        </div>
  
        <!-- Enlaces de navegación -->
        <ul class="nav-links">
          <li><router-link to="/movies">Películas</router-link></li>
          <li><router-link to="/tv-shows">Series de TV</router-link></li>
          <li><router-link to="/people">Personas</router-link></li>
          <li><router-link to="/more">Más</router-link></li>
        </ul>
      </div>
  
      <!-- Iconos en la parte derecha -->
      <div class="navbar-right">
        <!-- Agregar contenido -->
        <div class="icon">
          <i class="fas fa-plus"></i>
        </div>
  
        <!-- Selector de idioma -->
        <div class="icon">
          <button>ES</button>
        </div>
  
        <!-- Notificaciones -->
        <div class="icon">
          <i class="fas fa-bell"></i>
        </div>
  
        <!-- Perfil de usuario -->
        <div class="icon profile-icon">
          <span>S</span>
        </div>
  
        <!-- Buscar -->
        <div class="icon">
          <i class="fas fa-search"></i>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: "Navbar",
  };
  </script>
  
  <style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #032541;
    padding: 10px 20px;
    color: white;
  }
  
  .navbar-left {
    display: flex;
    align-items: center;
  }
  
  .logo img {
    height: 40px;
    margin-right: 20px;
  }
  
  .nav-links {
    display: flex;
    list-style: none;
    gap: 20px;
  }
  
  .nav-links li {
    font-size: 16px;
  }
  
  .nav-links li a {
    color: white;
    text-decoration: none;
  }
  
  .navbar-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .icon {
    font-size: 20px;
    cursor: pointer;
  }
  
  .icon button {
    background-color: transparent;
    border: 1px solid white;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
  }
  
  .profile-icon {
    background-color: #01b4e4;
    border-radius: 50%;
    padding: 10px;
    font-weight: bold;
    font-size: 16px;
  }
  
  </style>
  
<template>
    <div>
        <div class="nav">
            <h1>Bienvenido a la Página Principal</h1>
            <router-link to="/login">Iniciar Sesión</router-link>
        </div>
    </div>
  </template>
  
  <script>

  export default {
    name: 'Home',
  };
  </script>
  
  <style scoped>
  h1 {
    color: #3498db;
  }
  </style>
  
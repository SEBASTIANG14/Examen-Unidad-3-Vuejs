<template>
    <div class="detalle-categoria">
    <h1>Películas o Series de la categoría: {{ genreName }}</h1>

    <div class="filters">
      <label for="type">Filtrar por tipo:</label>
      <select v-model="selectedType" @change="fetchItems">
        <option value="movie">Películas</option>
        <option value="tv">Series</option>
      </select>

      <label for="order">Ordenar por popularidad:</label>
      <select v-model="selectedOrder" @change="fetchItems">
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
    </div>

    <p v-if="items.length === 0">No hay películas o series en esta categoría.</p>

    <div class="movies-grid" v-if="items.length > 0">
      <div v-for="item in items" :key="item.id" class="movie-card">
        <img :src="'https://image.tmdb.org/t/p/w185' + item.poster_path" :alt="item.title || item.name" />
        <div class="movie-info">
          <h2>{{ item.title || item.name }}</h2>
          <p>{{ item.release_date || item.first_air_date }}</p>
          <p>{{ item.overview }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
    return {
      items: [], // Películas o series obtenidas de la API
      selectedType: 'movie', 
      selectedOrder: 'desc', 
      genreName: '' 
    };
  },
  methods: {
    fetchItems() {
      const apiKey = '7dbf2be7efbc38c8a5ba78d99ae9f933'; 
      const categoryId = this.$route.params.category_id;

      this.genreName = this.getGenreName(categoryId); 

      // Verificamos si el tipo es 'movie' o 'serie' para ajustar la URL
      const baseUrl = this.selectedType === 'movie' 
        ? `https://api.themoviedb.org/3/discover/movie` 
        : `https://api.themoviedb.org/3/discover/tv`;

      const url = `${baseUrl}?api_key=${apiKey}&with_genres=${categoryId}&sort_by=popularity.${this.selectedOrder}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.items = data.results;
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    },
    getGenreName(genreId) {
      const genres = {
        28: 'Acción',
        12: 'Aventura',
        16: 'Animación',
        35: 'Comedia',
        80: 'Crimen',
        99: 'Documental',
        18: 'Drama',
        27: 'Terror',
        10402: 'Música',
        9648: 'Misterio',
        10749: 'Romance',
        878: 'Ciencia Ficción',
        10770: 'Película de TV',
        53: 'Suspenso',
        10752: 'Guerra',
        37: 'Western',
        10759: 'Drama de Acción',
        10762: 'Infantil',
        10765: 'Fantástico',
        10768: 'Guerra',
        10764: 'Reality',
      };

      return genres[genreId] || 'Desconocido';
    }
  },
  watch: {
    selectedType() {
      this.fetchItems();
    },
    selectedOrder() {
      this.fetchItems();
    }
  },
  mounted() {
    this.fetchItems(); 
  }
}
</script>
<style>
.detalle-categoria {
  padding: 20px;
}

.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.movie-card {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
}

.movie-card img {
  width: 100%;
  border-radius: 8px;
}

.movie-info h2 {
  font-size: 1.2em;
  margin: 10px 0;
}

.movie-info p {
  color: #666;
}
</style>
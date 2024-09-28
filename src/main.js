
import { createApp } from 'vue'
import App from './App.vue'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import router from './router';



createApp(App)
.use(router)
.mount('#app');

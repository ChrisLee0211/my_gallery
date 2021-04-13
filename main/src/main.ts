import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import 'animate.css/animate.min.css'
import router from './router';
import vuexStore from './store';

createApp(App).use(vuexStore).use(router).mount('#app')

import { createApp } from 'vue'
import vuetify from 'vuetify';
import App from './App.vue'
import './index.css'
import router from './router';
import vuexStore from './store';

createApp(App).use(vuetify).use(vuexStore).use(router).mount('#app')

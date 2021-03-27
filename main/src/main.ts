import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router';
import vuexStore,{key} from './store';

createApp(App).use(vuexStore, key).use(router).mount('#app')

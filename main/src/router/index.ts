import {RouteRecordRaw,createRouter,createWebHashHistory} from 'vue-router';
import Home from '../page/Home/index.vue';
import Login from '../page/Login/index.vue';

const routes:RouteRecordRaw[] = [
    {path:'/',component:Home},
    {path:'/login',component:Login} 
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
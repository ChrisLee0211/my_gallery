import {RouteRecordRaw,createRouter,createWebHashHistory} from 'vue-router';
import Home from '../page/Home/index.vue';
const routes:RouteRecordRaw[] = [
    {path:'/',component:Home}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
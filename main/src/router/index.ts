import {RouteRecordRaw,createRouter,createWebHashHistory} from 'vue-router';
import Home from '../page/Home/index.vue';
import Login from '../page/Login/index.vue';
import store from '../store'
const routes:RouteRecordRaw[] = [
    {path:'/',component:Home,name:'Home'},
    {path:'/login',component:Login,name:'Login'} 
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to,from)=>{
    if(to.name!=='Login' && store.getters.isLogin===false){
        return {name:'Login'}
    }
    return true
})

export default router
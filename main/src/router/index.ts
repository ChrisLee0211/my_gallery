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
        // router.push({name:'Login'})
        console.log(to.name)
        console.log(store.getters.isLogin)
        return {name:'Login'}
    }
    return true
    // router.push('/login')
})

export default router
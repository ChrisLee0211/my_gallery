import {RouteRecordRaw,createRouter,createWebHashHistory} from 'vue-router';
import Home from '../page/Home/index.vue';
import Gallery from '../page/Gallery/index.vue';
import Blog from '../page/Blog/index.vue';
import Util from '../page/Blog/index.vue';
import Layout from '../page/Layout/index.vue';
import Login from '../page/Login/index.vue';
import store from '../store'
export const routes:RouteRecordRaw[] = [
    {
        path:'/',
        component:Layout,
        name:'',
        redirect(){return{name:'home'}},
        children:[
            {path:'/home',component:Home,name:'home',meta:{title:'首页'}},
            {path:'/gallery',component:Gallery,name:'gallery',meta:{title:'画廊'}},
            {path:'/blog',component:Blog,name:'blog',meta:{title:'lee`s blog'}},
            {path:'/utils',component:Util,name:'utils',meta:{title:'工具'}},
    ]},
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
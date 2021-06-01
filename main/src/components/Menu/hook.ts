import { computed, ComputedRef } from 'vue';
import {useRoute,useRouter} from 'vue-router';
import {routes} from '../../router/index'

interface MenuItem {
    text:string,
    active:boolean,
    pathName:string,
}

export const useMenu = () => {
    const route = useRoute();
    const router = useRouter()
    const currentRouteName = route.name;
    const menuList: ComputedRef<MenuItem[]>= computed(() => {
        const entryRoute = routes.find(item => item.name === '');
        if(entryRoute && entryRoute.children) {
            return entryRoute?.children.map((routeConfig) => {
                return {
                    text:routeConfig.meta?.title as string??'',
                    pathName:routeConfig.name as string,
                    active:routeConfig.name === currentRouteName
                }
            })
        }
        return []
    });

    const handleClick = (routeName:string) => {
        if (routeName === currentRouteName) return
        router.push({ name: routeName })
    };
    return {
        list:menuList,
        clickMenu:handleClick
    }
}


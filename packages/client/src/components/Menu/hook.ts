import { computed, ComputedRef, watch } from 'vue';
import {useRouter} from 'vue-router';
import {routes} from '../../router/index'

interface MenuItem {
    text:string,
    active:boolean,
    pathName:string,
}

export const useMenu = () => {
    const router = useRouter();
    const menuList: ComputedRef<MenuItem[]>= computed(() => {
        const entryRoute = routes.find(item => item.name === '');
        if(entryRoute && entryRoute.children) {
            return entryRoute?.children.map((routeConfig) => {
                return {
                    text:routeConfig.meta?.title as string??'',
                    pathName:routeConfig.name as string,
                    active:routeConfig.name === router.currentRoute.value.name
                }
            })
        }
        return []
    });

    const handleClick = (routeName:string) => {
        if (routeName === router.currentRoute.value.name) return
        router.push({ name: routeName })
    };
    return {
        list:menuList,
        clickMenu:handleClick
    }
}


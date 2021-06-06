import {ref, onMounted, onUnmounted, Ref} from 'vue';

export const useScrollTop = (target?:Ref<HTMLElement>) => {
    const eventTarget = target?.value || window
    const scrollTop = ref(0);
    const scrollListener = (e:Event) => {
        if (target) {
            scrollTop.value = (e.target as HTMLElement).scrollTop;
        }else {
            scrollTop.value = (e.target as Document).documentElement.scrollTop;
        }
    }
    onMounted(() => {
        try{
            eventTarget.addEventListener('scroll',scrollListener)
        }catch(e){
            console.error(e)
        }
    })
    onUnmounted(() => {
        try{
            eventTarget.removeEventListener('scroll',scrollListener)
        }catch(e){
            console.error(e)
        }
    })

    return scrollTop
}
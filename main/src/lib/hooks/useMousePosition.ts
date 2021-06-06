import {ref,onMounted,onUnmounted} from 'vue';

export const useMousePostion = () => {
    const mousePosition = ref({
        x:0,
        y:0
    })
    const mouseListener = (e:MouseEvent) => {
        mousePosition.value = {
            x:e.clientX,
            y:e.clientY
        }
    }
    onMounted(() => {
        try{
            window.addEventListener('mousemove',mouseListener)
        }catch(e){
            console.error(e)
        }
    });
    onUnmounted(() => {
        try{
            window.removeEventListener('mousemove',mouseListener)
        }catch(e){
            console.error(e)
        }
    });
    return mousePosition
}
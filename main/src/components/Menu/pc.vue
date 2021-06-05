<template>
    <div class="w-full fixed top-0 flex bg-black justify-center transition" :style="`transform:translateY(${topOffset}px)`">
        <ul 
            :class="`font-mono list-none flex w-7/12 h-full`"
            >
            <li
            v-for="item in list" 
            :key="item.text"
            @click="clickMenu(item.pathName)"
            :class="`flex justify-center items-center p-4 transform transition-transform hover:bg-white hover:text-black hover:scale-110 hover:shadow-xl cursor-pointer ${item.active?activeClass:normalClass}`"
            >{{item.text}}</li>
        </ul>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, onMounted, onUnmounted, computed } from 'vue'
import {useMenu} from './hook';
import {useDebounceValue} from '../../lib/hooks/useDebounceValue';


export default defineComponent({
    setup() {
        const {list,clickMenu} = useMenu();
        const activeClass = `text-white shadow-2xl border-b-4 border-white`;
        const normalClass = `text-base text-white`;

        const topOffset = ref(0); // 0 ~ -60
        const isScrollOverMenuHeight = useDebounceValue(false,300);
        const scrollListener = (e:Event) => {
            const target = e.target as Document;
            const scrollTop = target.documentElement.scrollTop;
            if(scrollTop > 120) {
                const curValue = topOffset.value - scrollTop/2
                topOffset.value = Math.max(curValue,-60);
            }else {
                const curValue = topOffset.value + scrollTop/2
                topOffset.value = Math.min(curValue,0);
                // scroll溢出校正
                if (scrollTop <= 0) {
                    topOffset.value = 0
                }
            }
                isScrollOverMenuHeight.value = topOffset.value <= -60
            
        }
        const mouseListener = (e:MouseEvent) => {
            const mouseY = e.clientY;
            if (mouseY>0 && mouseY <=60) {
                if (isScrollOverMenuHeight.value){
                    topOffset.value = 0
                }
            }else {
                console.log('isScrollOverMenuHeight', isScrollOverMenuHeight.value);
                if (isScrollOverMenuHeight.value && topOffset.value === 0){
                    topOffset.value = -60
                }
            }
        }
        onMounted(() => {
            window.addEventListener('scroll',scrollListener)
            window.addEventListener('mousemove',mouseListener)
        })
        onUnmounted(() => {
            window.removeEventListener('scroll',scrollListener)
            window.removeEventListener('mousemove',mouseListener)
        })

        return {
            list, activeClass,normalClass, clickMenu, topOffset
        }
    },
})
</script>


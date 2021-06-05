<template>
    <!-- 横向 -->
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
    <!-- 纵向 -->
    <div class="">

    </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, onMounted, onUnmounted } from 'vue'
import {useMenu} from './hook';


export default defineComponent({
    setup() {
        const {list,clickMenu} = useMenu();
        const activeClass = `text-white shadow-2xl border-b-4 border-white`;
        const normalClass = `text-base text-white`;

        const topOffset = ref(0); // 0 ~ -60
        const rightOffset = ref(0);
        const scrollListener = (e:Event) => {
            const target = e.target as Document;
            const scrollTop = target.documentElement.scrollTop;
            if(scrollTop > 120) {
                const curValue = topOffset.value - scrollTop/2
                topOffset.value = Math.max(curValue,-60);
            }else {
                const curValue = topOffset.value + scrollTop/2
                topOffset.value = Math.min(curValue,0);
            }
            console.log(topOffset.value)
        }
        onMounted(() => {
            window.addEventListener('scroll',scrollListener)
        })
        onUnmounted(() => {
            window.removeEventListener('scroll',scrollListener)
        })
        return {
            list, activeClass,normalClass, clickMenu, topOffset
        }
    },
})
</script>


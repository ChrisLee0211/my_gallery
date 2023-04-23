<template>
    <div 
        :class="`rounded-full w-12 h-12 z-50 bg-black shadow-md flex items-center justify-center cursor-pointer `" 
        @mouseenter="enter"
        @mouseleave="leave"
        @click="clickToTop">
        <Icon :name="`topArrow`" :customClass="animateClass"/>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import Icon from '../Icon/index.vue';

export default defineComponent({
    components:{
        Icon:Icon
    },
    setup() {
        const animateClass = ref('')
        const clickToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
        const enter = () => {
            animateClass.value = 'animate-bounce';
        }
        const leave = () => {
            animateClass.value = '';
        }
        return {
            clickToTop,
            enter,
            leave,
            animateClass,
        }
    },
})
</script>

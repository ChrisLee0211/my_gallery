<template>
    <div 
        class="rounded-full w-12 h-12 bg-black shadow-md flex items-center justify-center cursor-pointer" 
        @click="clickToTop">
        <Icon :name="`topArrow`" :customClass="`text-white`"/>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '../Icon/index.vue';

export default defineComponent({
    components:{
        Icon:Icon
    },
    setup() {
        const clickToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
        return {
            clickToTop
        }
    },
})
</script>

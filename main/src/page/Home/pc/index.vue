<template>
    <div class=" w-full h-full">
        <menu-pc />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Menu from './component/Menu.vue';
export default defineComponent({
    components:{
        'menu-pc':Menu
    },
    setup() {
        
    },
})
</script>

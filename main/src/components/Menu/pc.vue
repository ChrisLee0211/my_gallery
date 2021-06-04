<template>
    <div class="w-full sticky top-0 flex bg-black justify-center">
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
import { defineComponent, ref, Ref } from 'vue'
import {useMenu} from './hook';


export default defineComponent({
    setup() {
        console.log('menu')
        const {list,clickMenu} = useMenu();
        const activeClass = `text-white shadow-2xl border-b-4 border-white`
        const normalClass = `text-base text-white`    
        return {
            list, activeClass,normalClass, clickMenu
        }
    },
})
</script>


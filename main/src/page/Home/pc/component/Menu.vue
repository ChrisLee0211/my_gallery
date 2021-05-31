<template>
    <div class="w-full sticky top-0 flex bg-black justify-center">
        <ul 
            :class="`font-mono list-none flex w-7/12 h-full`"
            >
            <li
            v-for="item in list" 
            :key="item.text"
            :class="`flex justify-center items-center p-4 transform transition-transform hover:bg-white hover:text-black hover:scale-110 hover:shadow-xl cursor-pointer ${item.active?activeClass:normalClass}`"
            >{{item.text}}</li>
        </ul>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'

interface MenuItem {
    text:string,
    active:boolean,
    pathName:string,
}

export default defineComponent({
    setup() {
        console.log('menu')
        const list:Ref<MenuItem[]> = ref([
            {
                text:'首页',
                pathName:'Home',
                active:true
            },
            {
                text:'我的画廊',
                pathName:'Gallery',
                active:false
            },
            {
                text:'Lee`s Blog',
                pathName:'Blog',
                active:false
            },
            {
                text:'工具',
                pathName:'Util',
                active:false
            },
        ])
        const activeClass = `bg-white text-black shadow-2xl`
        const normalClass = `text-base text-white`    
        return {
            list, activeClass,normalClass
        }
    },
})
</script>


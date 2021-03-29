<template>
    <div class="fixed inset-0 w-screen h-screen flex justify-center items-center bgAnimate" >
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name:'MobileLogin',
    setup() {
        
    },
})
</script>
<style>
.bgAnimate {
    overflow: hidden;
    background-size: 400%;
    background-image: linear-gradient(125deg,#F44336,#E91E63,#9C27B0,#3F51B5,#2196F3);
    font-family: "montserrat";
    animation: bganimation 5s infinite;
}

@keyframes bganimation{
    0%{
        background-position: 0% 50%;
    }
    50%{
        background-position: 100% 50%;
    }
    100%{
        background-position: 0% 50%;
    }
}
</style>
<template>
    <div :class="className">
        <div style="width:130px;height:30px"></div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
    name:'login-button',
    props: {
        loading:{
            type:Boolean,
            default:false
        }
    },
    setup(props,ctx) {
        const className = computed(()=>{
            if(props.loading) return 'login-btn-active'
            return 'login-btn'
        });
        return {className}
    },
})
</script>
<style>

.login-btn-active {
    display: inline-block;
    padding: 10px;
    position: relative;
}
.login-btn-active::before {
    content: '';
    position: absolute;
    left: 0; top: 0; right: 0; bottom: 0;
    border: 2px solid #cd0000;
    animation: borderAround 4s infinite linear;    
}
@keyframes borderAround {

   0% {
       clip-path: inset(0% 75% 25% 0%);
    }
   15% {
       clip-path: inset(0% 25% 75% 0%);
    }
   30% {
       clip-path: inset(0% 0% 75% 25%);
    }
   45% {
       clip-path: inset(0% 0% 25% 75%);
       }
   60% {
       clip-path: inset(25% 0% 0% 75%);
       }
   75% {
       clip-path: inset(75% 0% 0% 25%);
       }
   90% {
       clip-path: inset(75% 25% 0% 0%);
       }
   100% {
       clip-path: inset(25% 75% 0% 0%);
       }
   /* 100% {
       clip-path: inset(0% 75% 25% 0%);
       } */
   /* 100% {
       clip-path: inset(0% 75% 75% 0%);
       } */
}
</style>

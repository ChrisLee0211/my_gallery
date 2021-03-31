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
    animation: borderAround 1.5s infinite linear;    
}
@keyframes borderAround {
   0% {clip-path: polygon(0% 50%,0% 0%, 0% 50%);};
   25% {clip-path: polygon(50% 0%, 100% 0%, 100% 50%,);}
   50% {clip-path: polygon(100% 50%, 100% 100%, 50% 100%,);}
   75% {clip-path: polygon(50% 100%, 0 100%, 0% 50,);}
   100% {clip-path: polygon(0% 50%, 0% 0%, 50% 0%);};
}
</style>

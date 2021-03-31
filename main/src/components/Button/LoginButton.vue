<template>
    <div :class="className">

    </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
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
<style lang="less" scoped>
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
    0%, 100% { clip: rect(0 148px 2px 0); }
    25% { clip: rect(0 148px 116px 146px); }
    50% { clip: rect(114px 148px 116px 0); }
    75% { clip: rect(0 2px 116px 0); }
}
</style>

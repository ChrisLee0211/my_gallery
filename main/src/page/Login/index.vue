<template>
    <transition
      enter-active-class="animated bounceInLeft"
      leave-active-class="animated bounceOutLeft"
    >
    <login-pc v-if="isPC" />
    </transition>
    <login-mobile v-if="!isPC" />
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import {useStore} from '../../store/index'
import LoginPc from './pc/index.vue';
import LoginMobile from './mobile/index.vue';
export default defineComponent({
    name: 'Login',
    components: {
       'login-pc': LoginPc,
       'login-mobile':LoginMobile
    
    },
    setup() {
        const store = useStore();
        const isPC = computed(()=>{
            return store.state.deviceType === 'pc'
        })
        return {isPC}
    },
})
</script>

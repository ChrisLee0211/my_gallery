<template>
    <pc-menu v-if="isPC" />
    <mobile-menu v-else />
    <div 
    v-if="isPC" 
    :class="`fixed right-8 bottom-12 rounded-full shadow-lg`"
    >
        <BackToTop  />
    </div>
    <router-view />
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '../../store/index'
import PcMenu from '../../components/Menu/pc.vue'
import MobileMenu from '../../components/Menu/mobile.vue'
import BackToTop from '../../components/BackToTop/index.vue';

export default defineComponent({
    components:{
        'pc-menu':PcMenu,
        'mobile-menu':MobileMenu,
        'BackToTop':BackToTop
    },
    setup() {
        const store = useStore();
        const isPC = computed(() => {
            return store.state.deviceType === 'pc'
        })
        return { isPC }
    },
})
</script>

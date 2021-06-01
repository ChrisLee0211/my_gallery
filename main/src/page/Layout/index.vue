<template>
    <pc-menu v-if="isPC" />
    <mobile-menu v-else />
    <router-view />
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '../../store/index'
import PcMenu from '../../components/Menu/pc.vue'
import MobileMenu from '../../components/Menu/mobile.vue'
export default defineComponent({
    components:{
        'pc-menu':PcMenu,
        'mobile-menu':MobileMenu
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

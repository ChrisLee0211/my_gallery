<template>
    <pc-menu v-if="isPC" />
    <mobile-menu v-else />
    <!-- 回到顶部按钮 -->
    <div 
    v-if="isPC" 
    :class="`fixed ${backToTopPositionX} bottom-12 rounded-full shadow-lg transition-all`"
    >
    <BackToTop  />
    </div>
    <router-view />
</template>
<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '../../store/index'
import PcMenu from '../../components/Menu/pc.vue'
import MobileMenu from '../../components/Menu/mobile.vue'
import BackToTop from '../../components/BackToTop/index.vue';
import {useScrollTop} from '../../lib/hooks/index';

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
        });
        const backToTopPositionX = ref('-right-12')
        const scrollTop = useScrollTop();
        watch(scrollTop,() => {
            if (scrollTop.value <= 0) {
                backToTopPositionX.value = '-right-12'
            }else{
                backToTopPositionX.value = 'right-8'
            }
        })
        return { isPC, backToTopPositionX }
    },
})
</script>

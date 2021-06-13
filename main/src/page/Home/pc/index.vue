<template>
    <div class=" w-full h-full">
        <section class="scroll-3d-wrapper">
            <div class="item-1">
                <img src="../../../assets/zIndex1.png" alt="">
            </div>
            <div class="item-2">
                <img src="../../../assets/zIndex2.png" alt="">
            </div>
            <div class="item-3">
                <img src="../../../assets/zIndex3.png" alt="">
            </div>
            <div class="item-4">
                <img src="../../../assets/zIndex4.png" alt="">
            </div>
            <div class="item-5">
                <img src="../../../assets/zIndex5.png" alt="">
            </div>
            <div class="item-6">
                <img src="../../../assets/zIndex6.png" alt="">
            </div>
            <div class="item-7">
                <img src="../../../assets/zIndex7.png" alt="">
            </div>
        </section>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '../../../store/index';
import mountain1 from '../../../assets/zIndex1.png'
import mountain2 from '../../../assets/zIndex2.png'
import mountain3 from '../../../assets/zIndex3.png'
import mountain4 from '../../../assets/zIndex4.png'
import mountain5 from '../../../assets/zIndex5.png'
import mountain6 from '../../../assets/zIndex6.png'
import mountain7 from '../../../assets/zIndex7.png'

import 'vant/es/button/style';


export default defineComponent({
    components:{
    },
    setup() {
        const store = useStore();
        const day = store.state.days;
        return {day}
    },
})
</script>
<style lang="scss" scoped>
.scroll-3d-wrapper {
    perspective: 1px;
    transform-style: preserve-3d;
    width:100vw;
    height: auto;
    .item-1 {
        transform: translateZ(0px);
    }
    .item-2 {
        transform: translateZ(0px);
    }
    .item-3 {
        transform: translateZ(0px);
    }
    .item-4 {
        transform: translateZ(0px);
    }
    .item-5 {
        transform: translateZ(0px);
    }
    .item-6 {
        transform: translateZ(0px);
    }
}
</style>

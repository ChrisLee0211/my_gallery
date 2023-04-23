<template>
  <div class="w-full h-full scroll-3d-wrapper">
    <section class="h-screen overflow-hidden" style="background: #b7cce0">
      <img
        v-for="item in wrapperSources"
        :key="item.className"
        :class="`${item.className}`"
        :src="item.src"
        alt=""
      />
    </section>
    <section class="flex justify-center items-center py-10">
      <div class="w-5/12 mr-5">
        <n-space vertical>
          <n-card hoverable size="small">卡片一</n-card>
          <n-card hoverable size="small">卡片二</n-card>
        </n-space>
      </div>
      <div class="w-5/12">
        <n-card hoverable size="huge">卡片三</n-card>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '../../../store/index'
import mountain1 from '../../../assets/zIndex1.png'
import mountain2 from '../../../assets/zIndex2.png'
import mountain3 from '../../../assets/zIndex3.png'
import mountain4 from '../../../assets/zIndex4.png'
import mountain5 from '../../../assets/zIndex5.png'
import mountain6 from '../../../assets/zIndex6.png'
import { NCard, NSpace } from 'naive-ui'

export default defineComponent({
  components: {
    'n-card': NCard,
    'n-space': NSpace
  },
  setup() {
    const store = useStore()
    const day = store.state.days
    const imgSources = [mountain1, mountain2, mountain3, mountain4, mountain5, mountain6]
    const wrapperSources = imgSources.map((src, idx) => {
      const className = `item-${idx + 1}`
      return { src, className }
    })
    return { day, wrapperSources }
  }
})
</script>
<style lang="scss" scoped>
.scroll-3d-wrapper {
  perspective: 1px;
  transform-style: preserve-3d;
  width: 100vw;
  overflow-y: scroll;
  margin-top: 57px;
  .item-1 {
    transform: translate3d(0, -850px, -6px) scale(7);
  }
  .item-2 {
    transform: translate3d(0, 0, -5px) scale(6);
  }
  .item-3 {
    transform: translate3d(0, 0, -4px) scale(5.05);
  }
  .item-4 {
    transform: translate3d(0, 0, -3px) scale(4.05);
  }
  .item-5 {
    transform: translate3d(0, -200px, -2px) scale(3);
  }
  .item-6 {
    transform: translate3d(0, -400px, -1px) scale(3);
  }
}
</style>

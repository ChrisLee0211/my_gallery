<template>
  <div class="w-screen h-screen">
    <home-pc v-if="isPC" />
    <home-mobile v-else />
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '../../store/index'
import HomePc from './pc/index.vue';
import HomeMobile from './mobile/index.vue';

export default defineComponent({
  components: {
    'home-pc':HomePc,
    'home-mobile':HomeMobile
  },
  setup() {
    const store = useStore();
        const isPC = computed(() => {
            return store.state.deviceType === 'pc'
        })
        return { isPC }
  }
})
</script>

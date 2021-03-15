<template>
  <div>
      <HelloWorld :msg="msg" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from '../../components/HelloWorld.vue'
export default defineComponent({
  components: {
    HelloWorld
  },
  setup() {
    const msg = 'home'
    return { msg }
  }
})
</script>

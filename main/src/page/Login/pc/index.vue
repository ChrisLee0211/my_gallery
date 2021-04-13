<template>
  <div class="w-screen h-screen flex justify-center items-center flex-col bgAnimate">
    
      <section
        class="rounded w-96 h-1/3 shadow-xl bg-filter flex items-center justify-center flex-col"
      >
        <section class="my-2 font-mono text-lg antialiased font-extrabold text-white">
          <p>Hi~ Chris!</p>
          <p>Long time no see!</p>
        </section>
        <div class="w-3/5 my-2">
          <cl-input>
            <template v-slot:prefix> 账号 </template>
          </cl-input>
        </div>
        <div class="w-3/5 my-2">
          <cl-input :type="'password'">
            <template v-slot:prefix> 密码 </template>
          </cl-input>
        </div>
        <div class="w-3/5 my-2 flex items-center justify-center">
          <cl-button @click="handleClick" :loading="loading" :size="'large'"> 登陆 </cl-button>
        </div>
      </section>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import clInput from '../../../components/Input/pc.vue'
import clButton from '../../../components/Button/index.vue'

export default defineComponent({
  name: 'PcLogin',
  components: {
    'cl-input': clInput,
    'cl-button': clButton
  },
  setup() {
    const loading = ref(false)
    const handleClick = () => {
      loading.value = true
      setTimeout(() => {
        loading.value = false
      }, 3000)
    }
    return { loading, handleClick }
  }
})
</script>

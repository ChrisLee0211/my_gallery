<template>
      <section
        :class="`rounded w-96 h-1/3 shadow-xl bg-filter flex items-center justify-center flex-col`"
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
          <cl-button @click="handleClick" :loading="loading" :size="'large'"> {{num}} </cl-button>
        </div>
      </section>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import clInput from '../../../components/Input/pc.vue'
import clButton from '../../../components/Button/index.vue'
import WorkerCreator from '../../../lib/utils/worker';
export default defineComponent({
  name: 'PcLogin',
  components: {
    'cl-input': clInput,
    'cl-button': clButton
  },
  setup() {
    const loading = ref(false)
    const num = ref(0);
    const handleClick = () => {
      loading.value = true;
      const worker = new WorkerCreator();
      worker.run<{val:number}>((data) => {
        console.log('data',data);
        const val = data.val;
        return val + 10
      },{val:num.value}).then((res) => {console.log('res');num.value += res})
      setTimeout(() => {
        loading.value = false
      }, 3000)
    }
    return { loading, handleClick,num }
  }
})
</script>

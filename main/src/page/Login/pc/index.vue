<template>
      <section
        :class="`rounded w-96 h-1/3 shadow-xl bg-filter flex items-center justify-center flex-col`"
      >
        <section class="my-2 font-mono text-lg antialiased font-extrabold text-white">
          <p>Hi~ Chris!</p>
          <p>Long time no see!</p>
        </section>
        <div class="w-3/5 my-2 flex justify-center">
          <cl-input v-model:value="username">
            <template v-slot:prefix> 账号 </template>
          </cl-input>
        </div>
        <div class="w-3/5 my-2 flex justify-center">
          <cl-input :type="'password'"  v-model:value="password" >
            <template v-slot:prefix> 密码 </template>
          </cl-input>
        </div>
        <div class="w-3/5 my-2 flex items-center justify-center">
          <cl-button @click="handleClick" :loading="loading" :size="'large'"> 进入 </cl-button>
        </div>
      </section>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, watch } from 'vue'
import clInput from '../../../components/Input/pc.vue'
import clButton from '../../../components/Button/index.vue'
import {useNetworkWatcher} from '../../../lib/hooks/useNetworkWatcher';

export default defineComponent({
  name: 'PcLogin',
  props:{
    loading:{
      default:false,
      type:Boolean,
    },
  },
  components: {
    'cl-input': clInput,
    'cl-button': clButton
  },
  setup(props,ctx) {
    const username = ref('')
    const password = ref('')
    const handleClick = () => {
      ctx.emit('loginMethod',{username:username.value, password:password.value})
    }
    const {online,speed} = useNetworkWatcher();
    watch(online,(cur) =>{
      console.log('当前网络状态',cur)
    })
    watch(speed,(cur) =>{
      console.log('当前网络速度',cur)
    })
    return {handleClick,username, password }
  }
})
</script>

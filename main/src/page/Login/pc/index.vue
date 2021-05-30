<template>
      <section
        :class="`rounded w-96 h-1/3 shadow-xl bg-filter flex items-center justify-center flex-col transform ${animationName}`"
      >
        <section class="my-2 font-mono text-lg antialiased font-extrabold text-white">
          <p>Hi~ Chris!</p>
          <p>Long time no see!</p>
        </section>
        <div class="w-3/5 my-2 flex justify-center">
          <cl-input v-model:value="username" @keyup.enter="handleClick">
            <template v-slot:prefix> 账号 </template>
          </cl-input>
        </div>
        <div class="w-3/5 my-2 flex justify-center">
          <cl-input :type="'password'"  v-model:value="password" @keyup.enter="handleClick">
            <template v-slot:prefix> 密码 </template>
          </cl-input>
        </div>
        <div class="w-3/5 my-2 flex items-center justify-center">
          <cl-button @click="handleClick" :loading="loading" :size="'large'"> 进入 </cl-button>
        </div>
      </section>
</template>
<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import clInput from '../../../components/Input/pc.vue'
import clButton from '../../../components/Button/index.vue'

export default defineComponent({
  name: 'PcLogin',
  props:{
    loading:{
      default:false,
      type:Boolean,
    },
    loginStatus:{
      default:'fail',
      type:String
    }
  },
  components: {
    'cl-input': clInput,
    'cl-button': clButton
  },
  setup(props,ctx) {
    const username = ref('')
    const password = ref('')
    const router = useRouter()
    const animationName = ref('out-of-screen-y')
    onMounted(() => {
      animationName.value = 'drop-in'
    })
    watch(props,()=>{
      if(props.loginStatus === 'success') {
        animationName.value = 'drop-out'
        setTimeout(() => {
          router.push({ name: 'Home' })
        },1000)
      }
    })
    const handleClick = () => {
      ctx.emit('loginMethod',{username:username.value, password:password.value})
    }
    return {handleClick,username, password, animationName }
  }
})
</script>

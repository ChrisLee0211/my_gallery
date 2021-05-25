<template>
  <section class="flex flex-col justify-between items-center space-y-6 transform -translate-y-48">
    <section class="my-2 font-mono text-lg antialiased font-extrabold text-white">
      <p>Hi~ Chris!</p>
      <p>Long time no see!</p>
    </section>
    <cl-input v-model:value="userInfo.username">
      <template v-slot:prefix>
        <div>账号</div>
      </template>
    </cl-input>
    <cl-input v-model:value="userInfo.password" type="password">
      <template v-slot:prefix>
        <div>密码</div>
      </template>
    </cl-input>
    <cl-button :loading="loading" @click="handleClick"> 进入 </cl-button>
  </section>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import CLInput from '../../../components/Input/mobile.vue'
import CLButton from '../../../components/Button/LoginButton.vue'

export default defineComponent({
  name: 'MobileLogin',
  components: {
    'cl-input': CLInput,
    'cl-button': CLButton
  },
  props: {
    loading: {
      default: false,
      type: Boolean
    },
    loginStatus: {
      default: 'fail',
      type: String
    }
  },
  setup(props, ctx) {
    const userInfo = reactive({
      username: '',
      password: ''
    })
    const router = useRouter()
    const handleClick = () => {
      ctx.emit('loginMethod', userInfo)
    }
    watch(props,()=>{
      if(props.loginStatus === 'success') {
          router.push({ name: 'Home' })
      }
    })
    return { userInfo, handleClick }
  }
})
</script>

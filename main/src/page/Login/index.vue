<template>
  <div class="w-screen h-screen flex justify-center items-center bgAnimate">
    <login-pc
     :loading="loginLoading" 
     :loginStatus="loginStatus"
     @loginMethod="handleLogin"
      v-if="isPC" />
    <login-mobile 
    :loading="loginLoading" 
    @loginMethod="handleLogin" 
    :loginStatus="loginStatus"
    v-else />
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../../store/index'
import LoginPc from './pc/index.vue'
import LoginMobile from './mobile/index.vue'

export default defineComponent({
  name: 'Login',
  components: {
    'login-pc': LoginPc,
    'login-mobile': LoginMobile
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const isPC = computed(() => {
      return store.state.deviceType === 'pc'
    })
    const loginLoading = ref(false)
    const loginStatus = ref<'success'|'fail'>('fail')
    const handleLogin = (useInfo: { username: string; password: string }) => {
      loginLoading.value = true
      store.dispatch('login/loginRequest', useInfo).then((res: number) => {
        if (res === 200) {
          setTimeout(() => {
            loginLoading.value = false
            // router.push({ name: 'Home' })
            loginStatus.value = 'success'
          }, 2000)
        }
      })
    }
    return { isPC, handleLogin, loginLoading, loginStatus }
  }
})
</script>
<style>
.bgAnimate {
  overflow: hidden;
  background-size: 400%;
  background-image: linear-gradient(125deg, #0099c9, #00b3a2, #3a7aa2, #3a57a2, #2196f3);
  font-family: 'montserrat';
  animation: bganimation 5s transform infinite;
}

@keyframes bganimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.drop-in {
  animation: dropIn 0.8s ease-in-out;
}

@keyframes dropIn {
  0% {
    transform:translateY(-200%)
  }
  80% {
    transform:translateY(10%)
  }
  100% {
    transform:translateY(0%)
  }
}

.drop-out {
    animation: dropOut 0.8s ease-in-out forwards;
}

@keyframes dropOut {
  0% {
    transform:translateY(0%)
  }
  80% {
    transform:translateY(10%)
  }
  100% {
    transform:translateY(-200%)
  }
}
</style>

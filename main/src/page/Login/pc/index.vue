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
          <cl-input :type="'password'" :value="password" >
            <template v-slot:prefix> 密码 </template>
          </cl-input>
        </div>
        <div class="w-3/5 my-2 flex items-center justify-center">
          <cl-button @click="handleClick" :loading="loading" :size="'large'"> 进入 </cl-button>
        </div>
      </section>
</template>
<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import clInput from '../../../components/Input/pc.vue'
import clButton from '../../../components/Button/index.vue'

// interface propsType {
//   loading:boolean
//   loginMethod:(usename:string,password:string)=>void
// }

// interface setupType {
//   handleClick:()=>void,
//   username:Ref<string>,
//   password:Ref<string>,
// }

export default defineComponent({
  name: 'PcLogin',
  props:{
    loading:{
      default:false,
      type:Boolean,
    },
    loginMethod: {
      default:()=>{},
      type:Function,
    }
  },
  components: {
    'cl-input': clInput,
    'cl-button': clButton
  },
  setup(props,ctx) {
    
    const username = ref('user')
    const password = ref('')
    const handleClick = () => {
      console.log('username.value', username.value)
      props.loginMethod(username.value,password.value)
    }
    return {handleClick,username, password }
  }
})
</script>

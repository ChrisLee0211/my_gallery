<template>
    <div class="w-screen h-screen flex justify-center items-center bgAnimate">
        <login-pc 
        :loading="loginLoading" 
        title="set"
        @loginMethod="handleLogin" 
        v-if="isPC" />
        <login-mobile 
        :loading="loginLoading" 
        @loginMethod="handleLogin" 
        v-else />
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../../store/index';
import LoginPc from './pc/index.vue';
import LoginMobile from './mobile/index.vue';

export default defineComponent({
    name: 'Login',
    components: {
        'login-pc': LoginPc,
        'login-mobile': LoginMobile

    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const isPC = computed(() => {
            return store.state.deviceType === 'pc'
        })
        const loginLoading = ref(false)
        const handleLogin = (useInfo:{username:string, password:string}) => {
            loginLoading.value = true;
            store.dispatch('login/loginRequest',useInfo).then((res:number) => {
                console.log('res',res);
                if (res === 200){
                    setTimeout(() => {
                        loginLoading.value = false;
                        router.push({name:'Home'})
                    },2000)
                }
            });
        }
        return { isPC, handleLogin, loginLoading }
    },
})
</script>

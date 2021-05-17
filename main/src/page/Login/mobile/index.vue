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
            <cl-button :loading="loading" @click="handleClick">
                进入
            </cl-button>
        </section>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import CLInput from '../../../components/Input/mobile.vue'
import CLButton from '../../../components/Button/LoginButton.vue'

export default defineComponent({
    name:'MobileLogin',
    components:{
        "cl-input":CLInput,
        "cl-button":CLButton,
    },
    props:{
        loading:{
        default:false,
        type:Boolean,
        },
  },
    setup(props,ctx) {
        const userInfo = reactive({
            username:'',
            password:''
        });
        const handleClick = () => {
            ctx.emit('loginMethod',userInfo)
        }
        return {userInfo,handleClick}
    },
})
</script>
<style>
.bgAnimate {
    overflow: hidden;
    background-size: 400%;
    background-image: linear-gradient(125deg,#0099c9,#00b3a2,#3a7aa2,#3a57a2,#2196F3);
    font-family: "montserrat";
    animation: bganimation 5s infinite;
}

@keyframes bganimation{
    0%{
        background-position: 0% 50%;
    }
    50%{
        background-position: 100% 50%;
    }
    100%{
        background-position: 0% 50%;
    }
}
</style>
<template>
    <div class="fixed inset-0 w-screen h-screen flex justify-center items-center bgAnimate" >
        <section class="flex flex-col justify-between items-center space-y-6 transform -translate-y-48">
            <cl-input :value="userInfo.username" :label="'账号'"/>
            <cl-input :value="userInfo.password" :label="'密码'"/>
            <cl-button :loading="true" />
        </section>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import CLInput from '../../../components/Input/mobile.vue'
import CLButton from '../../../components/Button/LoginButton.vue'

export default defineComponent({
    name:'MobileLogin',
    components:{
        "cl-input":CLInput,
        "cl-button":CLButton,
    },
    setup() {
        const userInfo = reactive({
            username:'',
            password:''
        });
        return {userInfo}
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
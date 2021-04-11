<template>
    <div class="w-screen h-screen flex justify-center items-center bgAnimate">
        <section class=" rounded w-96 h-1/3 shadow-xl bg-filter flex items-center justify-center flex-col">
            <div class=" w-3/5 my-2">
                <cl-input >
                    <template v-slot:prefix>
                        账号
                    </template>
                </cl-input>
            </div>
            <div class=" w-3/5 my-2">
                <cl-input :type="'password'" >
                    <template v-slot:prefix>
                        密码
                    </template>
                </cl-input>
            </div>
            <div class=" w-3/5 my-2 flex items-center justify-center">
               按钮
            </div>
        </section>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import clInput from '../../../components/Input/pc.vue'

export default defineComponent({
    name:'PcLogin',
    components:{
        'cl-input': clInput,
    },
    setup() {
        
    },
})
</script>

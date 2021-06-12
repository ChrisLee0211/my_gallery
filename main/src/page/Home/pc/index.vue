<template>
    <div class=" w-full h-full">
        <p style="height:200px">测试1121212</p>
        <p style="height:200px">测试1121212</p>
        <p style="height:200px">测试1121212</p>
        <p style="height:200px">{{day}}</p>
        <p style="height:200px">测试1121212</p>
        <p style="height:200px">测试1121212</p>
        <p style="height:200px">测试1121212</p>
        <p style="height:200px">测试1121212</p>
        <p style="height:200px">测试1121212</p>
        <p style="height:200px">测试1121212</p>
        <p style="height:200px">测试1121212</p>
        <p style="height:200px">测试1121212</p>
        <p style="height:200px">测试1121212</p>
        <p style="height:200px">测试1121212</p>
        <p style="height:200px">测试1121212</p>
        <p style="height:200px">测试1121212</p>
        <p style="height:200px">测试1121212</p>
        <p style="height:200px">测试1121212</p>
        <p style="height:200px">测试1121212</p>
        <n-button>按钮</n-button>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '../../../store/index';
import {NButton} from 'naive-ui';
import {Button} from 'vant';
import 'vant/es/button/style';


export default defineComponent({
    components:{
        'n-button':Button
    },
    setup() {
        const store = useStore();
        const day = store.state.days;
        return {day}
    },
})
</script>

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
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '../../../store/index';

export default defineComponent({
    components:{
 
    },
    setup() {
        const store = useStore();
        const day = store.state.days;
        return {day}
    },
})
</script>

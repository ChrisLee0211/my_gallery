<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
</router-view>
</template>

<script lang='ts'>
import {watch, computed, onMounted} from 'vue';
import {useDeviceWatcher} from './lib/hooks/useDeviceWatcher'
import {useStore} from '../src/store/index'
import dayjs from 'dayjs';


export default {
  name: 'App',
  setup(){
    const store = useStore();
    const deviceTypeRef = useDeviceWatcher();
    const curDeviceType = computed(()=>store.state.deviceType);
    onMounted(() => {
      if(curDeviceType.value !== deviceTypeRef.value){
        store.commit("SET_DEVICE_TYPE", deviceTypeRef.value)
      }
      store.commit("COUNT_DAYS", days);
    })
    watch(deviceTypeRef,() => {
      if(curDeviceType.value !== deviceTypeRef.value){
        store.commit("SET_DEVICE_TYPE", deviceTypeRef.value)
      }
    })

    const startDate = dayjs('2021-03-07');
    const currentDate = dayjs();
    const days = currentDate.diff(startDate,'days');
  }
}
</script>
<style>
input:focus{   
	border:none;
}
</style>

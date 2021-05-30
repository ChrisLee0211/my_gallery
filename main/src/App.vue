<template>
  <router-view v-slot="{ Component }">
  <transition name="fade">
    <component :is="Component" />
  </transition>
</router-view>
</template>

<script lang='ts'>
import {watch, computed, onMounted} from 'vue';
import {useDeviceWatcher} from './lib/hooks/useDeviceWatcher'
import {useStore} from '../src/store/index'


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
    })
    watch(deviceTypeRef,() => {
      if(curDeviceType.value !== deviceTypeRef.value){
        store.commit("SET_DEVICE_TYPE", deviceTypeRef.value)
      }
    })
  }
}
</script>
<style>
input:focus{   
	border:none;
}
</style>

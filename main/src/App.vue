<template>
  <router-view />
</template>

<script lang='ts'>
import {watch} from 'vue';
import {useDeviceWatcher} from './lib/hooks/useDeviceWatcher'
import {useStore} from '../src/store/index'


export default {
  name: 'App',
  setup(){
    const store = useStore();
    const deviceTypeRef = useDeviceWatcher();
    const curDeviceType = store.state.deviceType;
    watch(deviceTypeRef,() => {
      if(curDeviceType !== deviceTypeRef.value){
        store.commit("SET_DEVICE_TYPE", deviceTypeRef.value)
      }
    })
  }
}
</script>

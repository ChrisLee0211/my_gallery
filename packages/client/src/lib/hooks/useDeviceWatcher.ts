import {ref, watch, Ref} from 'vue';
import {useDebounceValue} from './useDebounceValue';

/**
 * 获取当前设备类型
 * @returns
 * @author chris lee
 * @Time 2021/03/26
 */
export const useDeviceWatcher = ():Ref<'pc'|'mobile'> => {
    let deviceWidth = useDebounceValue(document.body.offsetWidth,200);
    const deviceType = ref<'pc'|'mobile'>(deviceWidth.value>=756?'pc':'mobile');
    const resizeHandler = (e:Event) => {
      deviceWidth.value = (e.currentTarget as Window).innerWidth
    }
    window.addEventListener("resize",resizeHandler);
    watch(deviceWidth,()=>{
      if(deviceWidth.value>=756){
        deviceType.value = 'pc'
      }else{
        deviceType.value = 'mobile'
      }
      return ()=>{
        window.removeEventListener("resize",resizeHandler)
      }
    },)
    return deviceType
}
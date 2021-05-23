import {computed, onMounted, onUnmounted, Ref, ref,watch, watchEffect} from 'vue';

type EffectiveType = 'slow-2g' |'2g'|'3g' | '4g'

interface NavConnection {
    /** 网络状态切换回调，若网络状态发生改变则不为null */
    onchange?: null | Event,
    /** 当前网络类型 */
    effectiveType?: EffectiveType,
    /** 预估请求往返时间，单位ms，值越小网速越快 */
    rtt?: number,
    /** 带宽下载速度，单位Mbit/s，值越大网速越快 */
    downlink?: number,
    /** 用户代理是否设置了减少数据使用量 */
    saveData?: boolean
}

type NavigatorConObject = Navigator & {connection:NavConnection,mozConnection:NavConnection,webkitConnection:NavConnection}
interface hookConfig {
    /** 网络状态检查间隔 */
    time?:number
    /** 网络波动阈值，即两次下载速度偏差多少时触发更新返回值 */
    offset?:number,
}

interface hookReturnType {
    online: Ref<boolean>,
    speed:Ref<number>,
}
const useNetworkWatcher = (config?:hookConfig):hookReturnType => {
    const curNavigator = navigator as NavigatorConObject;
    const connection:NavConnection | null = curNavigator.connection || curNavigator.mozConnection || curNavigator.webkitConnection;
    if (connection === null) {
        console.error('Current browser do not support this hook, please use chrome or other browser!')
    }
    let time = 500;
    let offset = 5;
    if (config) {
        time = config.time || time
        offset = config.offset || time
    }
    const online = ref(curNavigator.onLine);
    const speed = ref(connection?.downlink||0);
    const isSupport = (con:NavConnection,val:any):val is number  => {
        const keys = Object.keys(con);
        if (keys.includes('downlink')){
            return true
        }
        return false
    }
    const intervalTimer = ref<number>();
    const onlineHandler = () => {
        online.value = true;
        if (!intervalTimer.value){
            intervalTimer.value = window.setInterval(()=>{
                const curDownLinkSpeed = connection.downlink;
                if (isSupport(connection,curDownLinkSpeed)){
                    if (Math.abs(Number(curDownLinkSpeed) - Number(speed.value)) >= offset){
                        speed.value = curDownLinkSpeed
                    }
                }
            },time)
        }
    }
    const offlineHandler = () => {
        online.value = false;
        speed.value = 0;
        if (intervalTimer.value){
            clearInterval(intervalTimer.value);
        }
    }
    onMounted(() => {
        window.addEventListener('online',onlineHandler)
        window.addEventListener('offline',offlineHandler)
    })
    onUnmounted(() => {
        window.removeEventListener('online',onlineHandler)
        window.removeEventListener('offline',offlineHandler)
    })

     return {
         online:online,
         speed:speed
     }
}

export {useNetworkWatcher}
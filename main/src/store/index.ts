import { createStore, Store, useStore as useVuexStore } from 'vuex';
import {InjectionKey} from 'vue';
import {loginState} from './modules/login';

export interface rootState {
  deviceType: 'mobile' | 'pc'
}

export interface moduleState {
  login: typeof loginState.state
}
export const key:InjectionKey<Store<rootState>> = Symbol()
// Create a new store instance.
const store = createStore<rootState>({
  state: {
    deviceType: 'pc'
  },
  getters: {
    deviceTypeGetter(state){
      return state.deviceType
    }
  },
  mutations: {
    SET_DEVICE_TYPE: (state, type:rootState['deviceType']) => {
      state.deviceType = type
    }
  },
  modules:{
    login:loginState
  }
})

export function useStore(){
  return useVuexStore<rootState & moduleState>()
}


export default store;
import { createStore, Store, useStore as useVuexStore } from 'vuex';
import {loginState,LoginType} from './modules/login';

export interface rootState {
  deviceType: 'mobile' | 'pc'
}

export interface moduleState {
  login:LoginType
}

// Create a new store instance.
const store = createStore<rootState>({
  state: {
    deviceType: 'pc'
  },
  getters: {
 
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
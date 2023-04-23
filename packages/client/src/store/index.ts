import { createStore, Store, useStore as useVuexStore } from 'vuex';
import {loginState,LoginType} from './modules/login';

export interface rootState {
  deviceType: 'mobile' | 'pc',
  days:number
}

export interface moduleState {
  login:LoginType
}

// Create a new store instance.
const store = createStore<rootState>({
  state: {
    deviceType: 'pc',
    days:0
  },
  getters: {
    isLogin:(state) => (state as any).login.isLogin
  },
  mutations: {
    SET_DEVICE_TYPE: (state, type:rootState['deviceType']) => {
      state.deviceType = type
    },
    COUNT_DAYS: (state, num:number) => {
      state.days = num
    },
  },
  modules:{
    login:loginState
  }
})

export function useStore(){
  return useVuexStore<rootState & moduleState>()
}


export default store;
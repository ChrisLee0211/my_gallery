import {Module} from 'vuex';
import {rootState} from '../index';
export interface LoginType {
    isLogin:boolean
}

const loginState:Module<LoginType,rootState> = {
    state: () => ({
        isLogin: false,
    }),
    mutations: {
        SET_LOGIN_STATUS(state, val:boolean){
            state.isLogin = val
        }
    },
    actions: {
      
    },
    getters: { 
        
    }
  }

export {loginState}
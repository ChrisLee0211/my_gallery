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
      loginRequest({commit}, loginInfo:{username:string,password:string}){
        commit("SET_LOGIN_STATUS", true)
      }
    },
    getters: { 
        
    }
  }

export {loginState}
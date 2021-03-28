import {Module} from 'vuex';
import {rootState} from '../index';
export interface LoginType {
    max:number
}

const loginState:Module<LoginType,rootState> = {
    state: () => ({
        max: 0,
    }),
    mutations: {

    },
    actions: {
      
    },
    getters: { 
        
    }
  }

export {loginState}
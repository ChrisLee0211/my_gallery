import {Module} from 'vuex';
import {rootState} from '../index';
interface LoginType {
    
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
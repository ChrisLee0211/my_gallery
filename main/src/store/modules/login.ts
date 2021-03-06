import {Module} from 'vuex';
import {rootState} from '../index';
import Crypto from 'crypto-js';
export interface LoginType {
    isLogin:boolean
}

const fakeUser = {
  lee:'071716',
  tan:'941223'
}

const secretKey = 'litai'

const loginState:Module<LoginType,rootState> = {
    namespaced:true,
    state: () => ({
        isLogin: true,
    }),
    mutations: {
        SET_LOGIN_STATUS(state, val:boolean){
            state.isLogin = val
        }
    },
    actions: {
      loginRequest({commit}, loginInfo:{username:string,password:string}):Promise<number>{
        return new Promise((resolve,reject) => {
          const {username,password} = loginInfo;
          const validUser = Object.keys(fakeUser);
          if(validUser.includes(username)){
            const userPwd = fakeUser[(username as keyof typeof fakeUser)];
            const userPwdAES = Crypto.AES.encrypt(userPwd,secretKey)
            const secretPwdAES = Crypto.AES.encrypt(password,secretKey);
            if (Crypto.AES.decrypt(secretPwdAES,secretKey).toString === Crypto.AES.decrypt(userPwdAES,secretKey).toString){
              commit("SET_LOGIN_STATUS", true)
              resolve(200)
            }else{
              resolve(400)
            }
          }else{
            resolve(401)
          }
        })
      }
    },
    getters: { 
        
    }
  }

export {loginState}
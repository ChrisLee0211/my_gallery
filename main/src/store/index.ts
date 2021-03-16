import { createApp } from 'vue'
import { createStore } from 'vuex'

interface InitState {
    count: number
}

// Create a new store instance.
const store = createStore<InitState>({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

export default store;
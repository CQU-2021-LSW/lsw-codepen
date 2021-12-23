import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isAuth: 0,
    userId: null,
    noteId: null,
    ifEditor: false,
  },
  mutations: {
    auth (state) {
      state.isAuth = 1
    },
    unAuth(state) {
      state.isAuth = 0
    }
  }
})

export default store
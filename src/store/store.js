import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isAuth: 0,
    userId: null,
    noteId: null,
    isEditor: false,
  },
  mutations: {
    auth (state, uid, token) {
      state.isAuth = 1
      console.log('isauth状态已变化')
      localStorage.setItem('Token', token)
      state.userId = uid
      console.log('已完成登录')
      // console.log(this.$store.state.userId)
    },
    unAuth(state) {
      state.isAuth = 0
      state.userId = null
      localStorage.setItem("Token","NONE");
      console.log(localStorage.getItem('Token'));
      // console.log(this.$store.state.isAuth);
      console.log('isauth状态已变化')
    }
  }
})

export default store
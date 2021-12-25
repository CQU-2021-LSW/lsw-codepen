import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isAuth: 0,
    userId: null,
    userName: null,
    noteId: null,
    isEditor: false,
  },
  mutations: {
    // 把参数作为args对象提交  详情见官方文档：提交载荷
    auth (state, args) {
      state.isAuth = 1
      localStorage.setItem('Token', args.token)
      state.userId = args.uid
      state.userName = args.name
      console.log('已完成登录')
    },
    unAuth(state) {
      state.isAuth = 0
      state.userId = null
      state.userName = null
      localStorage.setItem("Token","NONE")
      console.log(localStorage.getItem('Token'))
      // console.log(this.$store.state.isAuth)
      console.log('已完成登出')
    }
  }
})

export default store
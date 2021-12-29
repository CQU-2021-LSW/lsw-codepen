import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isAuth: 0,
    userId: null,
    userName: null,
    userData: null,
    userImg: null, // 图方便就是说
    noteId: null,
    isEditor: false, // 控制header显示
    isCache: false, // 代码本地缓存
    isVerify: false, // 滑动验证
  },
  mutations: {
    // 把参数作为args对象提交  详情见官方文档：提交载荷
    auth (state, args) {
      state.isAuth = 1
      localStorage.setItem('Token', args.token)
      state.userData = args.data
      state.userImg = args.data.userPhoto
      state.userId = args.data.userId
      state.userName = args.data.userName
      console.log('已完成登录')
    },
    unAuth(state) {
      state.isAuth = 0
      state.userId = null
      state.userName = null
      state.noteId = null
      localStorage.setItem("Token","NONE")
      console.log(localStorage.getItem('Token'))
      // console.log(this.$store.state.isAuth)
      console.log('已完成登出')
    },
  }
})

export default store
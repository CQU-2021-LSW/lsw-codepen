<template>
  <div id="app">

    <el-button v-if="this.$store.state.isAuth == 0" @click="toLogin">
      Login
    </el-button>
    <el-button v-else @click="toUserInfo">UserInfo</el-button>
    <el-button @click="toEditor">
      Editor
    </el-button>
    <el-button @click="toNoteList">
      Notes
    </el-button>
    <el-button @click="toComment">
      Comment
    </el-button>
    <router-view></router-view>
  </div>
</template>
<script>


export default {
  name: 'App',
  components: {
  },
  data() {
    return{
    }
  },
  methods:{
    toLogin() {
      //this.$router.push("/xx")
      //传递的参数用{{ $route.query.xxx }}获取
      this.$router.push({path: '/login'})
      //后退两步
      //this.$router.go(-2)
    },
    toEditor() {
      this.$router.push({path: '/editor'})
    },
    toUserInfo() {
      this.$router.push({path:'/userInfo'})
    },
    toNoteList() {
      if(this.$store.state.isAuth === 0){
        this.$message('先登录哟(＾Ｕ＾)ノ~ＹＯ');
      } else {
        this.$router.push({path:'/noteList'})
      }
    },
    toComment() {
      this.$router.push({path:'/comments'})
    }
  }
}
</script>
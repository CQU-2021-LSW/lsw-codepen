<template>
  <div id="app">
    <!-- <el-menu v-if="!ifEditor" class="header" mode="horizontal" router>
      <el-menu-item index="/welcome"
        ><img src="~@/assets/pic.jpg" />&emsp;codepen</el-menu-item
      >
      <el-menu-item index="/comments">评论区</el-menu-item>
      <el-menu-item v-if="ifLogin" id="r0" index="/login"
        ><img src="~@/assets/pic.jpg" />&emsp;请登录</el-menu-item
      >
      <el-menu-item v-else id="r1" index="/user-hub"
        ><img src="~@/assets/pic.jpg" />&emsp;已经登录啦</el-menu-item
      >
    </el-menu> -->
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/header.vue";
export default {
  name: "App",
  components: { Header },
  data() {
    return {
      // b: true,
    };
  },
  methods: {
    loginState() {
      if (this.$cookies.isKey("userId")) {
        this.$store.state.isAuth = 1;
        this.$store.state.userId = this.$cookies.get("userId");
      } else {
        this.$store.state.isAuth = 0;
        this.$store.state.userId = null;
      }
    },
  },
  created() {
    this.loginState();
  },
  beforeUpdate() {
    this.loginState();
  },
  computed: {
    // ifLogin() {
    //   return this.$store.state.isAuth === 0;
    // },
  },
  watch: {
    $route: function (r) {
      if (r.path.indexOf("editor") != -1) {
        this.$store.state.ifEditor = true;
      } else {
        this.$store.state.ifEditor = false;
      }
    },
  },
};
</script>

<style >
#app {
  /*display:flex;
  flex-direction:column;*/
  height: 100%;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
#r0,
#r1 {
  position: absolute;
  right: 0;
}
img {
  width: auto;
  height: auto;
  max-width: 90%;
  max-height: 90%;
}
</style>
<template>
  <div id="h">
    <el-menu class="header" mode="horizontal" router>
      <el-menu-item index="/welcome"
        ><img src="../assets/pic.jpg" />&emsp;codepen</el-menu-item
      >
      <el-menu-item index="/comments">评论区</el-menu-item>
      <el-menu-item v-if="ifLogin" id="r0" index="/login"
        ><img src="../assets/pic.jpg" />&emsp;请登录</el-menu-item
      >
      <el-submenu v-else id="r1" index="null">
        <template slot="title"
          ><img src="../assets/pic.jpg" />&emsp;已经登录啦</template
        >
        <el-menu-item index="/user-hub">个人主页</el-menu-item>
        <el-menu-item index="/welcome" @click="logout">登出</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$cookies.remove("userId");
      this.$store.commit("unAuth");
    },
  },
  computed: {
    ifLogin() {
      return this.$store.state.isAuth === 0;
    },
  },
};
</script>

<style>
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
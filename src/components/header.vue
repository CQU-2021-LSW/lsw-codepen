<template>
  <div id="h">
    <el-menu class="header" mode="horizontal" router>
      <el-menu-item index="/welcome">
        <img src="../assets/pic.jpg" />&emsp;codepen
      </el-menu-item>
      <el-menu-item index="/comments">评论区</el-menu-item>
      <el-menu-item v-if="ifLogin" id="r0" index="/login">
        <img src="../assets/pic.jpg" />&emsp;请登录
      </el-menu-item>
      <el-submenu v-else id="r1" index="null">
        <template slot="title">
          <img :src="userImg" />&emsp;{{ userName }}
        </template>
        <el-menu-item index="/user-hub">个人主页</el-menu-item>
        <el-menu-item index="/welcome" @click="logout">登出</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userImgUrl: "",
    };
  },
  created() {
    this.userImgUrl = this.$store.state.userImg;
    // console.log(this.userImg);
  },
  methods: {
    logout() {
      this.$cookies.remove("userId");
      // this.$cookies.remove("userName");
      this.$store.commit("unAuth");
    },
  },
  computed: {
    ifLogin() {
      return this.$store.state.isAuth === 0;
    },
    userName() {
      return this.$store.state.userName;
    },
    userImg() {
      if (this.$store.state.userImg == null) {
        console.log(1111);
        return "http://1.15.53.152:9999/img/photo/524.jpg";
      } else {
        // console.log(2222);
        if (this.$store.state.userImg.indexOf("http") != -1) {
          // console.log(2222);
          console.log(this.$store.state.userImg);
          return this.$store.state.userImg;
        } else {
          // console.log(3333);
          return "http://" + this.$store.state.userImg;
        }
        // console.log(this.$store.state.userImg);
      }
    },
  },
};
</script>

<style scoped>
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
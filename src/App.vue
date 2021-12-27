<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
  data() {
    return {
      // ifLogin: this.$store.state.isAuth
    };
  },
  methods: {
    loginState() {
      if (this.$cookies.isKey("userId")) {
        this.$store.state.isAuth = 1;
        this.$store.state.userId = this.$cookies.get("userId");
      }
    },
  },
  created() {
    this.loginState();
  },
  computed: {},
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
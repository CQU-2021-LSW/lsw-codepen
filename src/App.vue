<template>
  <div id="app">
    <Header v-if="!this.$store.state.ifEditor"></Header>
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
  computed: {},
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
html,
body,
#app {
  /*display:flex;
  flex-direction:column;*/
  display: flex;
  height: 100%;
  flex-direction: column;
}
/* .header {
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
} */
</style>
<template>
  <div id="app">
    <Header v-show="!ifEditor"></Header>
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
    return {};
  },
  methods: {
    loginState() {
      if (this.$cookies.isKey('userId')) {
        this.$http
        .get("user/userInfo", {
          params: {
            userId: this.$cookies.get('userId'),
          },
        })
        .then(({ data }) => {
          console.log(data.data);
          if (data.code === 0) {
            let token = localStorage.getItem('Token')
            let args = {
              data: data.data,
              token: token,
            }
            this.$store.commit('auth', args)
          } else {
            console.log('自动登陆失败')
          }
        })
        .catch(({ error }) => {
          console.log("err")
          console.log(error)
        });
      }
    },
  },
  created() {
    this.loginState();
  },
  computed: {
    ifEditor() {
      return this.$store.state.isEditor;
    },
  },
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
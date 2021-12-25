<template>
  <div id="app">
    <Header v-show="!ifEditor"></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/header.vue'

export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    return {
    }
  },
  methods: {
    loginState() {
      if (this.$cookies.isKey('userId')) {
        this.$store.state.isAuth = 1
        this.$store.state.userId = this.$cookies.get('userId')
        this.$store.state.userName = this.$cookies.get('userName')
      }
    },
  },
  created() {
    this.loginState();
  },
  computed: {
    ifEditor() {
      return this.$store.state.isEditor
    }
  }
}
</script>

<style>
html,body,
#app{
  height:100%;
  display: flex;
  flex-direction: column;
}
</style>
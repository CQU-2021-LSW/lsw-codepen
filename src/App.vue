<template>
  <div id="app">
    <Header></Header>
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
      // ifLogin: this.$store.state.isAuth
    }
  },
  methods:{
    
  },
  computed:{
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
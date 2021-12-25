<template>
  <div>
    <div>简陋的欢迎界面</div>
    <div>CSS布局待完善，记得把这两个div</div>
    <img src="~@/assets/logo.png" />
    <div>
      <el-button @click="toEditor">Editor</el-button>
    </div>
  </div>
</template>

<script>
export default {
  // name: 'App',
  components: {},
  data() {
    return {};
  },
  methods: {
    toEditor() {
      this.$router.push({ path: "/editor" });
    },
  },
};
</script>

<style>
</style>
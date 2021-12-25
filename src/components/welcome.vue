<template>
  <div class="content">
    <button @click="toEditor">Editor</button>
    <candle></candle>
  </div>
</template>

<script>
// import cartoonText from "./cartoon-text.vue";
import candle from "./candle.vue";
export default {
  // name: 'App',
  data() {
    return {};
  },
  methods: {
    toEditor() {
      this.$router.push({ path: "/editor" });
    },
  },
  components: { candle },
};
</script>

<style scoped>
.content {
  width: 100%;
  /* height: 100%; */
}
button {
  font-weight: bolder;
  position: absolute;
  top: 200px;
  right: 100px;
  width: 100px;
  height: 50px;
  border-radius: 5px;
  border: 5px solid rgb(245, 243, 245);
  background-color: rgba(216, 207, 216, 0.5);
  /* animation: btn-size 3s infinite linear; */
}
/* @keyframes btn-size {
  0%,
  59%,
  98%,
  100% {
    width: 120px;
    height: 60px;
  }
  61%,
  97% {
    width: 100px;
    height: 50px;
  }
} */
</style>
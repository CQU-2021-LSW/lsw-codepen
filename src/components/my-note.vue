<template>
  <div class="container" :note="note" :key="idx" @click="edit(note)">
    <div class="contentBox">123</div>
    <footer>{{ note.noteName }}{{ note.noteCreateTime }}</footer>
  </div>
</template>

<script>
export default {
  name: "my-note",
  props: ["idx", "note"],
  methods: {
    edit(note) {
      this.$router.push({ path: "/editor/" + note.noteId });
      console.log(note);
    },
  },
};
</script>

<style scoped>
.contentBox {
  /* display: block; */
  /* width: 200px; */
  height: 250px;
  background-color: chocolate;
}
</style>

<template>
  <div class="container" :note="note" :key="idx" @click="edit(note)">
    <!-- <div class="contentBox">123</div> -->
    <span class="del" @click.stop="wantDel"
      ><el-icon class="el-icon-delete"></el-icon
    ></span>
    <h4>{{ note.noteName }}</h4>

    <el-dialog :visible.sync="isShow" width="30%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false" class="cancel">Cancel</el-button>
        <el-button @click="confirmDel" class="confirm">Confirm</el-button>
      </span>
    </el-dialog>
    <footer>
      <!-- <h4>{{ note.noteName }}</h4> -->
      <div class="tag">
        <span v-if="note.htmlCode"><span class="htmlCircle"></span>HTML</span>
        <span v-if="note.cssCode"><span class="cssCircle"></span>CSS</span>
        <span v-if="note.jsCode"><span class="jsCircle"></span>JS</span>
        <span class="date">{{ note.noteCreateTime }}</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "my-note",
  props: ["idx", "note"],
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    edit(note) {
      this.$store.state.noteId = note.noteId;
      // this.$router.push({ path: "/editor/" + note.noteName });
      // console.log(note);
    },
    formatDate(date) {
      // console.log(date);
      // console.log(date);
      var time = date.split("T");
      // console.log(time);
      this.note.noteCreateTime = time[0] + "    " + time[1];
    },
    wantDel() {
      // console.log("?????");
      this.isShow = true;
    },
    confirmDel() {
      console.log(this.note.noteId);
      this.$http({
        method: "post",
        url: "/notes/deleteNote",
        data: { noteIds: [this.note.noteId] },
      }).then((res) => {
        console.log(res);
        this.$emit("deleted");
        this.isShow = false;
        // location.reload();
      });
      // console.log("？？？？");
    },
  },
  mounted() {
    this.formatDate(this.note.noteCreateTime);
  },
};
</script>

<style scoped>
h4 {
  font-size: 30px;
  padding: 20px 0;
  /* white-space: pre; */
}
.del {
  margin-right: 30px;
  margin-top: 30px;
  float: right;
}
.contentBox {
  /* display: block; */
  /* width: 200px; */
  height: 250px;
  background-color: rgb(224, 228, 238);
  border-radius: 5px;
}
.tag {
  /* display: inline-block; */

  font-size: 15px;
}
.tag > span {
  margin-right: 19px;
}

.tag .htmlCircle,
.cssCircle,
.jsCircle {
  display: inline-block;
  /* margin-top: 1px; */
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px;
}
.tag .htmlCircle {
  background-color: rgb(247, 247, 193);
}
.tag .cssCircle {
  background-color: lightsalmon;
}
.tag .jsCircle {
  background-color: lightsteelblue;
}
.tag .date {
  float: right;
  margin-right: 0;
  white-space: pre;
}
</style>
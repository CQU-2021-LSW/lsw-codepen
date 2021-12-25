<template>
  <div class="content">
    <div class="side">
      <button @click="addfile">新建项目</button>
      <!-- <button @click="loginOut">登出</button> -->
      <div class="info_box">
        <div class="head_box"></div>
        <div class="username">aisucbasiuc</div>
        <div class="edit_box">
          <button
            :class="['edit_btn', isWantEdit ? 'btn_hide' : '']"
            @click="edit"
          >
            edit profile
          </button>
          <user-info v-if="isWantEdit" @cancelUpdate="cancel"></user-info>
        </div>
      </div>
    </div>
    <div class="mainBox">
      <div class="note_box" v-for="(i, idx) in userNotes" :key="idx">
        <my-note :note="i" :idx="idx"></my-note>
      </div>
    </div>
  </div>
</template>
<script>
import userInfo from "./userInfo.vue";
import myNote from "./my-note.vue";
// import { mapState } from "vuex";
export default {
  name: "user-hub",
  data() {
    return {
      isWantEdit: false,
      userNotes: [],
      //   ...mapState(["isWantEdit"]),
    };
  },
  created() {
    this.getNoteList();
  },
  methods: {
    edit() {
      this.isWantEdit = true;
    },
    cancel() {
      this.isWantEdit = false;
    },
    getNoteList() {
      //   console.log(this.$store.state.userId);
      this.$http
        .get("notes/noteList", {
          params: {
            userId: this.$store.state.userId,
          },
        })
        .then(({ data }) => {
          this.userNotes = data.data;
          console.log(this.userNotes);
        });
    },
    addfile() {
      this.$router.push({ name: "editorWithoutParams" });
    },
    // loginOut() {
    //   this.$cookies.remove("userId");
    //   this.$router.push({ path: "/welcome" });
    // },
  },
  components: { userInfo, myNote },
};
</script>

<style scoped>
.content {
  display: flex;
  /* height: 100%; */
}
.side {
  padding: 5% 5%;
  width: 300px;
  /* height: 100%; */
  background-color: antiquewhite;
}
.mainBox {
  /* height: 100%; */
  flex: 1;
  background-color: aqua;
}
.info_box {
  padding: 10px 30px;
  background-color: cadetblue;
}
.head_box {
  /* width: 200px; */
  height: 200px;
  margin: auto;
  background-color: azure;
}
.username {
  /* width: 200px; */
  height: 50px;
  line-height: 50px;
}
.edit_btn {
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
}
.btn_hide {
  display: none;
}
.mainBox {
  display: flex;
  /* justify-content: start; */
  flex-wrap: wrap;
  padding: 20px;
  align-content: flex-start;
}
.note_box {
  width: 300px;
  /* height: 400px; */
  background-color: cadetblue;
  margin: 20px;
  padding: 10px;
}
</style>

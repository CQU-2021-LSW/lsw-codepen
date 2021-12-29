<template>
  <div class="content">
    <div class="left_side">
      <!-- <button @click="loginOut">登出</button> -->
      <div class="info_box">
        <div class="head_box" @click="headerShow = true">
          <img src="" />
        </div>
        <div class="username">{{ username }}</div>
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
    <button @click="addfile" class="add_btn">新建项目</button>
    <el-dialog
      title="viewHeaderImg"
      :visible.sync="headerShow"
      width="400px"
      :center="true"
    >
      <el-upload
        class="avatar-uploader"
        action="/upload/imgUpload"
        ref="upload"
        :show-file-list="false"
        method="post"
        :before-upload="beforeUpload"
        :on-change="handleChange"
        :auto-upload="false"
        name="image"
        type="file"
        style="
          border: 1px dotted lightgray;
          width: 300px;
          height: 300px;
          margin-left: 30px;
          margin-top: 20px;
        "
      >
        <img v-if="imgUrl" :src="imgUrl" class="avatar img_upload" />
        <i
          v-else
          class="el-icon-plus avatar-uploader-icon"
          style="margin: auto auto; size: 100px"
        ></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button>Cancel</el-button>
        <el-button type="primary" @click="concern">Confirm</el-button>
      </span>
    </el-dialog>
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
      username: "",
      headerShow: false,
      imgUrl: "",
      imgName: "",
      //   ...mapState(["isWantEdit"]),
    };
  },
  created() {
    this.getNoteList();
    this.username = this.$store.state.userName;
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
    handleChange(file) {
      this.imgUrl = URL.createObjectURL(file.raw);
      this.imgName = file.name;
    },
    beforeUpload() {
      return true;
    },
    concern() {
      this.$refs.upload.submit();
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
.left_side {
  margin: 20px 50px;
  padding: 10px 10px;
  width: 300px;
  flex-shrink: 0;
  /* height: 100%; */
  /* background-color: antiquewhite; */
  border: 3px dashed lightpink;
  border-radius: 5px;
}

.info_box {
  padding: 10px 20px;
  /* background-color: cadetblue; */
}
.head_box {
  /* width: 200px; */
  height: 250px;
  margin: auto;
  background-color: rgb(193, 236, 236);
  border-radius: 50%;
}
.username {
  /* width: 200px; */
  height: 50px;
  line-height: 50px;
  font-size: 25px;
}
.edit_btn {
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: rgb(221, 231, 248);
  border: 1px solid lightsteelblue;
  border-radius: 5px;
}
.btn_hide {
  display: none;
}
.mainBox {
  flex: 1;
  /* background-color: aqua; */
  border: 3px dashed lightpink;
  border-radius: 5px;
  display: flex;
  /* justify-content: start; */
  flex-wrap: wrap;
  padding: 20 0 0 20px;
  justify-content: center;
  align-content: flex-start;
  margin-right: 12%;
}
.note_box {
  width: 310px;
  /* height: 400px; */
  /* background-color: cadetblue; */
  border: 3px outset rgba(211, 211, 211, 0.5);
  border-radius: 10px;
  margin: 20px;
  padding: 10px;
}
.note_box:hover {
  box-shadow: 5px 5px lightgrey;
}
.add_btn {
  position: fixed;
  top: 100px;
  right: 5%;
  /* font-weight: bolder; */
  width: 100px;
  height: 50px;
  border-radius: 10px;
  border: 5px solid rgb(224, 221, 224);
  background-color: rgba(226, 177, 245, 0.5);
}
.add_btn:hover {
  background-color: rgb(250, 195, 173);
}
.avatar-uploader {
  text-align: center;
  line-height: 300px;
}
.img_upload {
  width: 300px;
  max-height: 300px;
}
</style>

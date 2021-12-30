<template>
  <div class="content">
    <div class="left_side">
      <!-- <button @click="loginOut">登出</button> -->
      <div class="info_box">
        <div class="head_box" @click="headerShow = true">
          <img v-if="headerImgUrl" :src="headerImgUrl" />
        </div>
        <div class="username">{{ userName }}</div>
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
        action=""
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
      FormData: null,
      userId: 0,
      headerImgUrl: "",
      //   ...mapState(["isWantEdit"]),
    };
  },
  created() {
    this.getNoteList();
    // this.username = this.$store.state.userData.userName;
    this.userId = this.$store.state.userId;

    if (this.$store.state.userImg == null) {
      this.imgUrl = "http://1.15.53.152:9999/img/photo/524.jpg";
      this.headerImgUrl = "http://1.15.53.152:9999/img/photo/524.jpg";
    } else {
      this.headerImgUrl = "http://" + this.$store.state.userImg;
      this.imgUrl = "http://" + this.$store.state.userImg;
    }

    // console.log(this.headerImgUrl);
  },
  computed: {
    userName() {
      return this.$store.state.userData.userName;
    },
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
      let fd = new FormData();
      // console.log(typeof file.raw);
      fd.append("file", file.raw);
      fd.append("userId", this.userId);
      // console.log(fd.get("file"));
      this.FormData = fd;
      console.log(this.FormData.get("file"));
      // this.fileList[0] = file;
    },
    beforeUpload() {
      return true;
    },
    concern() {
      // var userId = this.$store.state.userId;
      // this.$refs.upload.submit();
      // console.log(this.fileList);
      // let fd = new FormData();
      // fd.append("userId", userId);
      // fd.append("file", this.fileList[0]);
      // this.upDataFile(fd);
      // this.$refs.upload.submit();;

      this.$http({
        method: "post",
        url: "/upload/imgUpload",
        data: this.FormData,
        headers: { "Content-Type": "multipart/form-data" },
        // data: { userId: this.userId },
        // type: "form-data",
      })
        .then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            this.$message({ message: "头像上传成功" });
            this.headerShow = false;
            if (this.$store.state.userImg == null) {
              this.headerImgUrl =
                "http://1.15.53.152:9999/img/photo/" + this.userId + ".jpg";
            }
            this.headerImgUrl.replace("t=", "");
            this.headerImgUrl += "?t=" + Math.random();
            console.log(this.headerImgUrl);
            this.$store.commit("updateUserImg", this.headerImgUrl);
            // this.$router.push({ path: "/user-hub" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // upDataFile(fileData) {
    //   this.$http({
    //     method: "post",
    //     url: "/upload/imgUpload",
    //     data: fileData,
    //     headers: { "Content-Type": "multipart/form-data" },
    //   }).then((res) => {
    //     console.log(res);
    //   });
    // },
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
  align-items: flex-start;
  /* height: 100%; */
}
.left_side {
  margin: 20px 80px 0 150px;
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
.head_box img {
  height: 250px;
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
  margin-top: 20px;
}
.note_box {
  width: 80%;
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

<template>
  <div class="content">
    <div class="left_side">
      <!-- <button @click="loginOut">登出</button> -->
      <div class="info_box">
        <div class="head_box" @click="editAva">
          <img :src="storeImgUrl" />
        </div>
        <div class="username">{{ userName }}</div>
        <div v-show="!isWantEdit">
          <div v-show="showData[0]" class="line">
            <i class="el-icon-postcard"></i> &emsp;{{ userData.userMotto }}
          </div>
          <div v-show="showData[1]" class="line">
            <i class="el-icon-mobile-phone"></i> &emsp;{{ userData.userPhone }}
          </div>
          <div v-show="showData[2]" class="line">
            <i class="el-icon-message"></i> &emsp;{{ userData.userEmail }}
          </div>
          <div v-show="showData[3]" class="line">
            <i class="el-icon-place"></i> &emsp;{{ userData.userAddr }}
          </div>
        </div>
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
        <my-note :note="i" :idx="idx" @deleted="delNote"></my-note>
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
        <el-button @click="headerShow = false">Cancel</el-button>
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
      isEidtAva: false,
      isWantEdit: false,
      userNotes: [],
      headerShow: false,
      imgUrl: "",
      imgName: "",
      FormData: null,
      userId: 0,
      headerImgUrl: "",
      picType: "",

      //   ...mapState(["isWantEdit"]),
    };
  },
  created() {
    // if(this.$cookies.get(''))
    this.getNoteList();
    // this.userId = this.$store.state.userId;
    // if (this.$store.state.userImg !== null) {
    // this.imgUrl = "http://" + this.$store.state.userImg;
    // this.headerImgUrl = "http://" + this.$store.state.userImg;
    //  this.$store.commit("updateUserImg", this.headerImgUrl);
    // } else {
    // this.imgUrl = "http://1.15.53.152:9999/img/photo/0.jpg";
    // this.headerImgUrl = "http://1.15.53.152:9999/img/photo/0.jpg";
    //  this.$store.commit("updateUserImg", this.headerImgUrl);
    // }
    console.log("用户主页created");
  },
  computed: {
    userName() {
      return this.$store.state.userName;
    },
    // imgUrl() {
    //   let url = null;
    //   if (this.$store.state.userImg === null) {
    //     url = "http://1.15.53.152:9999/img/photo/0.jpg";
    //   } else {
    //     url = "http://" + this.$store.state.userImg;
    //   }
    //   return url;
    // },
    storeImgUrl() {
      let url = null;
      if (this.$store.state.userImg === null) {
        url = "http://1.15.53.152:9999/img/photo/0.jpg";
      } else {
        if (this.$store.state.userImg.indexOf("http") != -1) {
          url = this.$store.state.userImg.split("?")[0];
        } else {
          url = "http://" + this.$store.state.userImg.split("?")[0];
        }
      }
      return url + "?t=" + Math.random();
    },
    userData() {
      let userData = this.$store.state.userData;
      if (userData !== null) {
        return this.$store.state.userData;
      } else {
        return {
          userMotto: "",
          userPhone: "",
          userEmail: "",
          userAddr: "", // 解决异步报错问题
        };
      }
    },
    showData() {
      let data = this.$store.state.userData;
      if (data !== null) {
        let b0 =
          data.userMotto === null || data.userMotto === "" ? false : true;
        let b1 =
          data.userPhone === null || data.userPhone === "" ? false : true;
        let b2 =
          data.userEmail === null || data.userEmail === "" ? false : true;
        let b3 = data.userAddr === null || data.userAddr === "" ? false : true;
        let bArr = [b0, b1, b2, b3];
        return bArr;
      } else {
        return [false, false, false, false]; // 解决异步报错问题
      }
    },
  },
  methods: {
    editAva() {
      this.headerShow = true;
      this.isEidtAva = true;
      // this.imgUrl = this.$store.state.userImg;
      this.userId = this.$store.state.userId;
      if (this.$store.state.userImg !== null) {
        if (this.$store.state.userImg.indexOf("http") != -1) {
          this.imgUrl =
            this.$store.state.userImg.split("?")[0] + "?t=" + Math.random();
          this.headerImgUrl = this.$store.state.userImg;
        } else {
          this.imgUrl =
            "http://" +
            this.$store.state.userImg.split("?")[0] +
            "?t=" +
            Math.random();
          this.headerImgUrl = "http://" + this.$store.state.userImg;
        }
      } else {
        this.imgUrl = "http://1.15.53.152:9999/img/photo/0.jpg";
        this.headerImgUrl = "http://1.15.53.152:9999/img/photo/0.jpg";
      }
      // this.$store.commit("updateUserImg", this.headerImgUrl);
    },
    edit() {
      this.isWantEdit = true;
    },
    cancel() {
      this.isWantEdit = false;
    },
    getNoteList() {
      console.log(this.$cookies.get("userId"));
      if (this.$store.state.userId != null) {
        this.userId = this.$store.state.userId;
      } else if (this.$cookies.get("userId")) {
        this.userId = this.$cookies.get("userId");
      }
      //   console.log(this.$store.state.userId);
      this.$http
        .get("notes/noteList", {
          params: {
            userId: this.userId,
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
      this.picType = "." + file.name.split(".")[1];
      var str = "(.jpg|.png|.jpeg|.bmp)";
      var reg = new RegExp(str);
      if (reg.test(this.imgName)) {
        let fd = new FormData();
        console.log(this.picType);
        fd.append("file", file.raw);
        fd.append("userId", this.userId);
        // console.log(fd.get("file"));
        this.FormData = fd;
        console.log(this.FormData.get("file"));
        // this.fileList[0] = file;
      } else {
        this.$message({ message: "暂不支持该格式文件请重新选择文件" });
      }
    },
    beforeUpload() {
      return true;
    },
    concern() {
      this.isEidtAva = false;
      // var userId = this.$store.state.userId;
      // this.$refs.upload.submit();
      // console.log(this.fileList);
      // let fd = new FormData();
      // fd.append("userId", userId);
      // fd.append("file", this.fileList[0]);
      // this.upDataFile(fd);
      // this.$refs.upload.submit();;
      let _this = this;
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
            // let newImg=''
            // url = null;
            if (this.$store.state.userImg == null) {
              this.headerImgUrl =
                "http://1.15.53.152:9999/img/photo/" +
                this.userId +
                _this.picType;
            }
            console.log(this.headerImgUrl);

            this.headerImgUrl = this.headerImgUrl.split("?t=")[0];
            var index = this.headerImgUrl.lastIndexOf(".");
            this.headerImgUrl =
              this.headerImgUrl.slice(0, index) + _this.picType;
            console.log(this.headerImgUrl);
            // newImg.replace("t=")
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
    delNote() {
      console.log("已删除");
      this.getNoteList();
    },
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
  padding: 10px 10px;
  /* background-color: cadetblue; */
}
.info_box .head_box {
  width: 250px;
  height: 250px;
  margin: auto;
  background-color: rgb(193, 236, 236);
  border-radius: 50%;
}
.info_box .head_box img {
  width: 250px;
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
.line {
  margin: 5px 0px 15px 0px;
}
</style>

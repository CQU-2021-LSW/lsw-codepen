<template>
  <div class="content">
    <div class="container">
      <header>
        <span @click="addNew"><i class="el-icon-edit-outline"></i> </span>
      </header>
      <div class="box" v-for="(item, idx) in commentsData" :key="idx">
        <comment-card
          :comment="item"
          @wantAdd="beClicked"
          @wantDel="wantDelCom"
          @addedNew="addedOne"
        ></comment-card>
      </div>
    </div>
    <div id="dialog" v-if="isShow">
      <my-dialog :clickedId="beClickedId" @cancelAdd="cancel"></my-dialog>
    </div>
    <div id="delDialog" v-if="delIsShow">
      <del-dialog
        :clikedId="wantDelId"
        @cancelDel="cancel"
        :preId="preComId"
      ></del-dialog>
    </div>
    <!-- <el-dialog title="发表评论" :visible.sync="isShow" width="600px">
      <el-input type="textarea" :rows="15" v-model="textarea">{{
        textarea
      }}</el-input>
      <div class="file_box">
        <el-upload
          multiple
          action=""
          :auto-upload="false"
          :on-change="handleChange"
          :on-remove="handleRemove"
          :file-list="list"
          ><i class="el-icon-document-add"></i
        ></el-upload> -->
    <!-- <el-upload
          multiple
          list-type="picture"
          action=""
          id="pic"
          :auto-upload="false"
          ><i class="el-icon-picture-outline"></i
        ></el-upload> -->
    <!-- </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false" class="cancel">Cancel</el-button>
        <el-button @click="uploadComment" class="confirm">Confirm</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import commentCard from "./comment-card.vue";
import myDialog from "./myDialog.vue";
import delDialog from "./del-dialog.vue";
export default {
  data() {
    return {
      commentsData: [],
      // textarea: "",
      // rowKey: "",
      isShow: false,
      // row: 0,
      // textMap: new Map(),
      // list: [],
      beClickedId: 0,
      delIsShow: false,
      wantDelId: 0,
      preComId: 0,
    };
  },
  methods: {
    getCommentList() {
      // console.log(this.$store.state.userId);
      // console.log(1111);
      if (this.$cookies.get("userId") == null) {
        this.$http({
          method: "get",
          url: "/comments/getCommentList",
        }).then(({ data }) => {
          if (data.code === 0) {
            console.log(data);
            this.commentsData = data.data.reverse();
          } else {
            this.$message({
              message: "未知异常，请稍后再试~",
              type: "warning",
            });
          }
        });
      } else {
        // console.log(this.$store.state.userId);
        this.$http({
          method: "get",
          url: "/comments/getCommentList",
          params: { userId: this.$cookies.get("userId") },
        }).then(({ data }) => {
          if (data.code === 0) {
            console.log(data);
            this.commentsData = data.data.reverse();
          } else {
            this.$message({
              message: "未知异常，请稍后再试~",
              type: "warning",
            });
          }
        });
      }
    },
    addNew() {
      this.beClickedId = 0;
      this.isShow = true;
    },
    // uploadComment() {
    //   if (this.textarea.length == 0) {
    //     this.$message({ message: "没有内容Ψ(￣∀￣)Ψ" });
    //     return;
    //   }
    //   if (this.$store.state.userId != null) {
    //     this.$http({
    //       method: "post",
    //       url: "/comments/uploadComment",
    //       data: {
    //         userId: this.$store.state.userId,
    //         commentText: this.textarea,
    //         preCommentId: this.beClickedId,
    //       },
    //     }).then(({ data }) => {
    //       console.log(data);
    //       this.$message({ message: "发表成功" });
    //       this.getCommentList();
    //       location.reload();
    //       this.textarea = "";
    //       this.textMap.clear();
    //       this.list = [];
    //       this.isShow = false;
    //     });
    //   } else {
    //     this.$message({ message: "请先登录(∪.∪ )...zzz" });
    //   }
    // },
    showScope(data) {
      console.log(data);
    },
    isCurrentUser(data) {
      if (data.userId == this.$store.state.userId) {
        return true;
      } else {
        return false;
      }
    },
    // handlePreview() {},
    // handleChange(file) {
    //   console.log(file.name.split(".")[1]);
    //   var reader = new FileReader();
    //   var str = "(.txt|.html|.htm|.js|.css)";
    //   var reg = new RegExp(str);
    //   if (reg.test(file.name)) {
    //     console.log(1111);
    //     let _this = this;
    //     reader.onload = function () {
    //       // console.log(res);
    //       _this.textMap.set(file.name, this.result + "\r\n");
    //       // console.log(_this.textMap);
    //       console.log(_this.textMap);
    //       _this.textarea += this.result + "\r\n";
    //       // console.log(_this.row);
    //     };
    //     reader.readAsText(file.raw);
    //   }
    // },
    // handleRemove(file) {
    //   this.textMap.delete(file.name);
    //   // console.log(this.textMap);
    //   this.renderText();
    // },
    // renderText() {
    //   this.textarea = "";
    //   for (const text of this.textMap) {
    //     this.textarea += text + "\r\n";
    //   }
    // },
    beClicked(commentId) {
      this.beClickedId = commentId;
      this.isShow = true;
    },
    wantDelCom(commentId, preComId) {
      this.wantDelId = commentId;
      this.preComId = preComId;
      this.delIsShow = true;
    },
    cancel() {
      // console.log("取消");
      this.isShow = false;
      this.delIsShow = false;
    },
    addedOne() {
      this.getCommentList();
    },
  },
  mounted() {
    this.getCommentList();
  },
  created() {
    console.log(11111);
    // this.getCommentList();
  },
  components: { commentCard, myDialog, delDialog },
};
</script>

<style scoped>
span:hover {
  cursor: default;
}
#dialog {
  position: absolute;
  display: block;
}
#delDialog {
  position: absolute;
  display: block;
}
.container {
  border: 3px dashed lightpink;
  border-radius: 10px;
  /* background-color: lightpink; */
  width: 60%;
  margin: auto;
  margin-top: 5px;
}
.container header {
  margin: 0 auto;
  width: 70%;
  height: 60px;
  line-height: 60px;
  text-align: right;
}
.container header span {
  color: lightpink;
  margin: 0 20px;
  font-size: 30px;
}
.container .box {
  border: 3px outset rgba(211, 211, 211, 0.5);
  border-radius: 5px;
  background-color: rgb(225, 245, 240);
  width: 70%;
  margin: auto;
  margin-bottom: 30px;
}

.file_box {
  margin-top: 10px;
  /* display: flex; */
}
/* #pic {
  margin-left: 20px;
} */
.file_box i {
  font-size: 20px;
}
/* #pic /deep/ .el-upload-list {
  display: flex;
  flex-wrap: wrap;
}
#pic /deep/ .el-upload-list--picture .el-upload-list__item {
  width: 180px;
  display: inline-block;
} */
.el-button.confirm {
  background-color: rgb(216, 241, 245);
}
.el-button.confirm:hover,
.el-button.cancel:hover {
  color: black;
  background-color: rgb(245, 197, 178);
}
</style>
<template>
  <div class="myDialog">
    <el-dialog title="发表评论" width="600px" :visible.sync="visible">
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
        ></el-upload>
        <!-- <el-upload
          multiple
          list-type="picture"
          action=""
          id="pic"
          :auto-upload="false"
          ><i class="el-icon-picture-outline"></i
        ></el-upload> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false" class="cancel">Cancel</el-button>
        <el-button @click="uploadComment" class="confirm">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "myDialog",
  props: ["clickedId"],
  data() {
    return {
      list: [],
      textarea: "",
      visible: true,
      // beClickedId: 0,
      textMap: new Map(),
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
    uploadComment() {
      if (this.textarea.length == 0) {
        this.$message({ message: "没有内容Ψ(￣∀￣)Ψ" });
        return;
      }
      if (this.$store.state.userId != null) {
        this.$http({
          method: "post",
          url: "/comments/uploadComment",
          data: {
            userId: this.$store.state.userId,
            commentText: this.textarea,
            preCommentId: this.clickedId,
          },
        }).then(({ data }) => {
          console.log(data);
          this.$message({ message: "发表成功" });
          this.getCommentList();
          location.reload();
          this.textarea = "";
          this.textMap.clear();
          this.list = [];
          this.visible = false;
        });
      } else {
        this.$message({ message: "请先登录(∪.∪ )...zzz" });
      }
    },
    handleChange(file) {
      console.log(file.name.split(".")[1]);
      var reader = new FileReader();
      var str = "(.txt|.html|.htm|.js|.css)";
      var reg = new RegExp(str);
      if (reg.test(file.name)) {
        console.log(1111);
        let _this = this;
        reader.onload = function () {
          // console.log(res);
          _this.textMap.set(file.name, this.result + "\r\n");
          // console.log(_this.textMap);
          console.log(_this.textMap);
          _this.textarea += this.result + "\r\n";
          // console.log(_this.row);
        };
        reader.readAsText(file.raw);
      }
    },
    handleRemove(file) {
      this.textMap.delete(file.name);
      // console.log(this.textMap);
      this.renderText();
    },
    renderText() {
      this.textarea = "";
      for (const text of this.textMap) {
        this.textarea += text + "\r\n";
      }
    },
  },
};
</script>


<style scoped>
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
.el-button.confirm {
  background-color: rgb(216, 241, 245);
}
.el-button.confirm:hover,
.el-button.cancel:hover {
  color: black;
  background-color: rgb(245, 197, 178);
}
</style>

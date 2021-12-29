<template>
  <div class="content">
    <div class="container">
      <header>
        <span @click="isShow = true"
          ><i class="el-icon-edit-outline"></i>
        </span>
      </header>
      <div class="box" v-for="(item, idx) in commentsData" :key="idx">
        <comment-card :comment="item"></comment-card>
      </div>
    </div>
    <el-dialog title="发表评论" :visible.sync="isShow" width="500px">
      <el-input type="textarea" :rows="10"></el-input>
      <div class="file_box">
        <el-upload multiple action="" :auto-upload="false"
          ><i class="el-icon-document-add"></i
        ></el-upload>
        <el-upload
          multiple
          list-type="picture"
          action=""
          id="pic"
          :auto-upload="false"
          ><i class="el-icon-picture-outline"></i
        ></el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false" class="cancel">Cancel</el-button>
        <el-button @click="isShow = false" class="confirm">Confirm</el-button>
      </span>
    </el-dialog>
    <!-- <el-table :data="commentsData" border style="width: 100%">
      <el-table-column fixed prop="userName" label="用户" width="300">
      </el-table-column>
      <el-table-column prop="commentCreateTime" label="创建日期" width="200">
      </el-table-column>
      <el-table-column prop="commentText" label="内容" width="1000"> </el-table-column>
      <el-table-column prop="userId" fixed="right" width="500">
        <template slot-scope="scope">
          <el-button type = "primary">点赞</el-button>
          <el-button type="danger" v-if="isCurrentUser(scope.row)" @click="deleteComment()">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div id="bottom">
      <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 4 }"
        placeholder="这里评论"
        v-model="textarea"
      >
      </el-input>
      <el-button type="primary" @click="uploadComment()"> 提交 </el-button>
    </div> -->
  </div>
</template>

<script>
import commentCard from "./comment-card.vue";
export default {
  data() {
    return {
      commentsData: [],
      textarea: "",
      // rowKey: "",
      isShow: false,
    };
  },
  methods: {
    getCommentList() {
      this.$http({
        method: "get",
        url: "/comments/getCommentList",
      }).then(({ data }) => {
        if (data.code === 0) {
          console.log(data);
          this.commentsData = data.data.reverse();
        } else {
          this.$message({ message: "未知异常，请稍后再试~", type: "warning" });
        }
      });
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
            likes: 0,
            topicId: 0,
            preCommentId: 0,
          },
        }).then(({ data }) => {
          console.log(data);
          this.getCommentList();
          this.textarea = "";
        });
      } else {
        this.$message({ message: "请先登录(∪.∪ )...zzz" });
      }
    },
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
    handlePreview() {},
  },
  mounted() {
    this.getCommentList();
  },
  created() {
    // this.getCommentList();
  },
  components: { commentCard },
};
</script>

<style scoped>
.container {
  border: 1px dashed lightpink;
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
  margin-bottom: 10px;
}

.file_box {
  margin-top: 10px;
  display: flex;
}
#pic {
  margin-left: 20px;
}
.file_box i {
  font-size: 20px;
}
#pic /deep/ .el-upload-list {
  display: flex;
  flex-wrap: wrap;
}
#pic /deep/ .el-upload-list--picture .el-upload-list__item {
  width: 180px;
  display: inline-block;
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
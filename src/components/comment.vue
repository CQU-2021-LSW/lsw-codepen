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
    <el-dialog title="addComment" :visible.sync="isShow">
      <el-input type="textarea"></el-input>
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

      <!-- <el-form-item label="Promotion name" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="Zones" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="Please select a zone">
        <el-option label="Zone No.1" value="shanghai"></el-option>
        <el-option label="Zone No.2" value="beijing"></el-option>
      </el-select>
    </el-form-item> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">Cancel</el-button>
        <el-button type="primary" @click="isShow = false">Confirm</el-button>
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
        this.commentsData = data.data.reverse();
        console.log(this.commentsData);
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
    this.getCommentList();
  },
  components: { commentCard },
};
</script>

<style scoped>
.container {
  background-color: lightpink;
  width: 60%;
  margin: auto;
}
.container header {
  margin: 0 auto;
  width: 70%;
  height: 60px;
  line-height: 60px;
  text-align: right;
}
.container header span {
  margin: 0 20px;
  font-size: 30px;
}
.container .box {
  background-color: aqua;
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
</style>
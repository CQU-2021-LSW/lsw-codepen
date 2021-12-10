<template>
  <div>
    <el-table :data="commentsData" border style="width: 100%">
      <el-table-column fixed prop="userName" label="用户" width="300">
      </el-table-column>
      <el-table-column prop="commentCreateTime" label="创建日期" width="200">
      </el-table-column>
      <el-table-column prop="commentText" label="内容" width="1000"> </el-table-column>
      <el-table-column prop="userId" fixed="right" width="500">
        <template slot-scope="scope">
          <el-button type = "primary" @click="like()">
            点赞
          </el-button>
          <el-button type="danger" v-if="isCurrentUser(scope.row)" @click="deleteComment()">
            删除
          </el-button>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentsData: [],
      textarea: "",
      rowKey:""
    };
  },
  methods : {
        getCommentList(){
            this.$http({
                method: 'get',
                url: '/comments/getCommentList',
            })
            .then(({data}) => {
                this.commentsData = data.data;
                console.log(this.commentsData)
            })
        },
        uploadComment() {
        if(this.textarea.length == 0){
        this.$message({
            message: '没有内容Ψ(￣∀￣)Ψ',
        });
        return;
        }
        if(this.$store.state.userId != null){
            this.$http({
            method: 'post',
            url: '/comments/uploadComment',
            data: {
                userId : this.$store.state.userId,
                commentText : this.textarea,
                likes : 0,
                topicId : 0,
                preCommentId : 0,
            }
        })
        .then(({data}) => {
            console.log(data)
            this.getCommentList()
            this.textarea = ''
        })
        }
        else{
            this.$message({
                message: '请先登录(∪.∪ )...zzz',
            });
        }
        },
        showScope(data){
          console.log(data)

        },

        isCurrentUser(data){
            if(data.userId == this.$store.state.userId){
              return true
            } else{
              return false;
            }
        }

  },
  mounted() {
      this.getCommentList()
  },
  created() {
      this.getCommentList()
  }
};
</script>

<style>
#bottom {
  width: 80%;
  position: fixed;
  bottom: 100px;
}
</style>
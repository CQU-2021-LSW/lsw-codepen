<template>
  <div class="content">
    <div class="box" @click="toSpecifyComment">
      <header>
        <div class="img_box">
          <img :src="userImg" alt="" />
        </div>
        <div class="info_box">
          <span
            v-if="userId === comment.userId"
            class="del"
            @click.stop="delCom"
            ><el-icon class="el-icon-delete"></el-icon
          ></span>
          <span class="username">{{ comment.userName }}</span>

          <span>{{ comment.commentCreateTime }}</span>
        </div>
      </header>
      <main>{{ comment.commentText }}</main>
      <footer>
        <span @click.stop="give_a_subcomment"
          ><i class="el-icon-chat-dot-round"></i>&nbsp;{{
            comment.subCommentNum ? comment.subCommentNum : ""
          }}</span
        >
        <span @click.stop="give_a_like">
          <Icon type="ios-heart-outline" size="20" v-if="!isLike" />
          <Icon type="ios-heart" size="20" color="lightPink" v-if="isLike" />

          &nbsp;{{ comment.likeCount ? comment.likeCount : "" }}</span
        >
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  name: "comment-card",
  props: ["comment"],
  data() {
    return {
      flag: false,
      isLike: false,
      userImg: "",
      userId: 0,
    };
  },
  created() {
    if (this.comment.userPhoto == null) {
      this.userImg = "http://1.15.53.152:9999/img/photo/0.jpg";
    } else {
      this.userImg = "http://" + this.comment.userPhoto;
    }
    this.isLike = this.comment.liked;
    localStorage.setItem("commentInfo", this.comment);
    // localStorage.setItem("liked", this.comment.liked);
    // localStorage.setItem("likeCount", this.comment.likeCount);
  },
  mounted() {
    // console.log(this.comment);
    this.formatDate(this.comment.commentCreateTime);
    this.userId = this.$store.state.userId;
  },
  methods: {
    give_a_like() {
      if (!this.$store.state.userId) {
        this.$message({ message: "请先登录(∪.∪ )...zzz", type: "warning" });
      } else {
        if (!this.isLike) {
          this.$http({
            method: "post",
            url: "/comments/doLike",
            data: {
              likedPostId: this.$store.state.userId,
              likedCommentId: this.comment.commentId,
            },
          }).then((res) => {
            if (res.data.code === 0) {
              this.comment.likeCount++;
              this.comment.liked = 1;
              // localStorage.setItem("liked", 1);
              // localStorage.setItem("likeCount", this.comment.likeCount);
              localStorage.setItem("commentInfo", JSON.stringify(this.comment));
              this.$store.commit("getCommentId", this.comment);
              // this.flag = true;

              this.isLike = true;
            } else {
              this.$message({
                message: "网络出错啦，请稍后再试~",
                type: "warning",
              });
            }
          });
        } else {
          this.$http({
            method: "post",
            url: "/comments/cancelLike",
            data: {
              likedPostId: this.$store.state.userId,
              likedCommentId: this.comment.commentId,
            },
          }).then((res) => {
            if (res.data.code === 0) {
              this.comment.likeCount--;
              this.comment.liked = 0;
              // localStorage.setItem("liked", 0);
              // localStorage.setItem("likeCount", this.comment.likeCount);
              localStorage.setItem("commentInfo", JSON.stringify(this.comment));
              this.$store.commit("getCommentId", this.comment);
              // this.flag = false;

              this.isLike = false;
            } else {
              this.$message({
                message: "网络出错啦，请稍后再试~",
                type: "warning",
              });
            }
          });
        }
      }
    },
    give_a_subcomment() {
      let commentId = this.comment.commentId;
      this.$emit("wantAdd", commentId);
      // console.log(245121);
    },
    toSpecifyComment() {
      // console.log(this.comment);
      localStorage.setItem("commentInfo", JSON.stringify(this.comment));
      this.$store.commit("getCommentId", this.comment);
      this.$router.push({ path: "/specifyComment" });
      // console.log(656232);
    },
    formatDate(date) {
      // console.log(date);
      // var time = date.split("T");
      // console.log(time);
      // console.log(this.comment.commentCreateTime);
      if (this.comment.commentCreateTime != null) {
        this.comment.commentCreateTime = date.split("T")[0];
      }
    },
    delCom() {
      let commentId = this.comment.commentId;
      let preComId = this.comment.preCommentId;
      this.$emit("wantDel", commentId, preComId);
    },
    // formatText() {},
  },
};
</script>

<style scoped>
i {
  font-size: 18px;
}
h4 {
  margin: 0;
  padding: 0;
}
.content {
  width: 90%;
  /* height: 300px; */
  padding: 10px 10px 0 10px;
  margin: auto;
  /* background-color: antiquewhite; */
}
.box header {
  display: flex;
  margin-bottom: 10px;
}
.box header .img_box {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: aquamarine;
}
header .img_box img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.box header .info_box {
  flex: 1;
  margin-left: 15px;
  /* background-color: lightcoral; */
}
.info_box span {
  display: block;
  font-size: 15px;
  color: lightslategray;
}
.info_box .username {
  font-size: 25px;
  color: black;
  margin-bottom: 10px;
}
.info_box .del {
  margin-top: 10px;
  margin-right: 10px;
  float: right;
}
.box main {
  margin-bottom: 10px;
  /* white-space: pre-line; */
  white-space: pre-wrap;
  /* background-color: lightskyblue; */
}
.box footer {
  /* margin-bottom: 10px; */
  /* background-color: lightsteelblue; */
  padding: 3px 0;
  border-top: 1px solid lightgrey;
  display: flex;
  justify-content: space-around;
}
/* .box footer .el-icon-star-on {
  color: lightpink;
  font-size: 20px;
  -webkit-text-stroke: rgb(202, 147, 155);
  -webkit-text-stroke-width: 1px;
} */
</style>

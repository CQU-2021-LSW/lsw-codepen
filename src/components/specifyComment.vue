<template>
  <div class="container">
    <div class="box">
      <header>
        <div class="img_box">
          <img :src="userImg" alt="" />
        </div>
        <div class="info_box">
          <span class="username">{{ comment.userName }}</span>
          <span>{{ comment.commentCreateTime }}</span>
        </div>
      </header>
      <main>
        <div class="mainContent">{{ comment.commentText }}</div>
        <div class="subComments">
          <header>
            <span>评论</span
            ><span>点赞&nbsp;&nbsp;{{ likeCount ? likeCount : "" }}</span>
          </header>
          <div
            class="subCommentBox"
            v-for="(item, idx) in subComments"
            :key="idx"
          >
            <sub-comment :subComment="item"></sub-comment>
          </div>
        </div>
      </main>
    </div>
    <div id="dialog" v-if="isShow">
      <my-dialog :clickedId="beClickedId"></my-dialog>
    </div>
    <footer>
      <span @click.stop="give_a_subcomment"
        ><i class="el-icon-chat-dot-round"></i
      ></span>
      <span @click.stop="give_a_like">
        <Icon type="ios-heart-outline" size="20" v-if="!isLike" />
        <Icon type="ios-heart" size="20" color="lightPink" v-if="isLike" />

        &nbsp;{{ likeCount ? likeCount : "" }}</span
      >
    </footer>
  </div>
</template>
<script>
import subComment from "./subComment.vue";
import myDialog from "./myDialog.vue";
export default {
  name: "comment-card",
  data() {
    return {
      // flag: false,
      isLike: false,
      userImg: "",
      comment: null,
      subComments: null,
      likeCount: 0,
      isShow: false,
      beClickedId: 0,
    };
  },
  components: { subComment, myDialog },
  created() {
    if (this.$store.state.commentInfo == null) {
      console.log(2222);
      // console.log(localStorage.getItem("commentInfo"));
      this.comment = JSON.parse(localStorage.getItem("commentInfo"));
      // console.log(this.comment);
    } else {
      console.log(33333);
      this.comment = this.$store.state.commentInfo;
    }
  },
  mounted() {
    if (this.comment.userPhoto == null) {
      this.userImg = "http://1.15.53.152:9999/img/photo/524.jpg";
    } else {
      this.userImg = "http://" + this.comment.userPhoto;
    }
    this.isLike = this.comment.liked;
    this.beClickedId = this.comment.commentId;
    // console.log(typeof this.isLike);

    console.log(!!this.isLike);
    this.likeCount = this.comment.likeCount;
    // console.log(!!this.isLike);
    this.getSubSomments();
    // console.log(this.comment);
    // this.formatDate(this.comment.commentCreateTime);
  },
  // updated() {
  //   this.liked = this.comment.liked;
  //   this.likeCount = this.comment.likeCount;
  // },
  methods: {
    getSubSomments() {
      let data;
      if (this.$store.state.userId == null) {
        data = { commentId: this.comment.commentId };
      } else {
        data = {
          commentId: this.comment.commentId,
          userId: this.$store.state.userId,
        };
      }
      this.$http({
        method: "get",
        url: "/comments/getSubComment",
        params: data,
      }).then((res) => {
        this.subComments = res.data.data;
        // console.log(this.subComments);
        // console.log(res.data.data);
      });
    },
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
              this.likeCount++;
              this.comment.likeCount++;
              this.comment.liked = 1;
              // localStorage.setItem("liked", 1);
              // localStorage.setItem("likeCount", this.likeCount);
              localStorage.setItem("commentInfo", JSON.stringify(this.comment));
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
              this.likeCount--;
              this.comment.likeCount--;
              this.comment.liked = 0;
              // localStorage.setItem("liked", 0);
              // localStorage.setItem("likeCount", this.likeCount);
              localStorage.setItem("commentInfo", JSON.stringify(this.comment));
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
      this.isShow = true;
      // console.log(245121);
    },
    // toSpecifyComment() {
    //   this.$store.commit("getCommentId", this.comment);
    //   this.$router.push({ path: "/specifyComment" });
    //   console.log(656232);
    // },
    formatDate(date) {
      // console.log(date);
      // var time = date.split("T");
      // console.log(time);
      this.comment.commentCreateTime = date.split("T")[0];
    },
    // formatText() {},
  },
};
</script>

<style scoped>
#dialog {
  position: absolute;
  display: block;
}
i {
  font-size: 18px;
}
h4 {
  margin: 0;
  padding: 0;
}
.container {
  position: relative;
  border: 3px dashed lightpink;
  border-radius: 10px;
  /* background-color: lightpink; */
  width: 60%;
  /* height: 100%; */
  margin: auto;
  margin-top: 5px;
}
.container .box {
  display: flex;
  flex-direction: column;
  border: 3px outset rgba(211, 211, 211, 0.5);
  border-radius: 5px;
  background-color: rgb(225, 245, 240);
  width: 70%;
  /* height: 100%; */
  margin: auto;
  /* margin-bottom: 30px; */
}
.box > header {
  display: flex;
  margin-bottom: 10px;
}
.box > header .img_box {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: aquamarine;
}
.box > header .img_box img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.box > header .info_box {
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
.box main {
  /* flex: 1; */
  height: 80%;
  /* margin-bottom: 10px; */
  /* white-space: pre-line; */
  white-space: pre-wrap;
  /* background-color: lightskyblue; */
}
.container footer {
  /* margin-bottom: 10px; */
  /* background-color: lightsteelblue; */
  position: fixed;
  bottom: 5px;
  left: 50%;
  height: 40px;
  border: 3px outset rgba(211, 211, 211, 0.5);
  border-radius: 5px;
  background-color: rgb(225, 245, 240);
  margin-left: -21%;
  width: 42%;
  padding: 3px 0;
  line-height: 40px;
  border-top: 1px solid lightgrey;
  display: flex;
  justify-content: space-around;
}
.subComments {
  margin-top: 30px;
  border-top: 2px solid lightcoral;
  /* border-bottom: 2px solid lightcoral; */
}
.subComments > header {
  border-bottom: 2px solid lightcoral;
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
}
.subComments > .subCommentBox {
  margin-top: 20px;
  border-bottom: 2px solid lemonchiffon;
}
</style>

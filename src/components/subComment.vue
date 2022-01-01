<template>
  <div class="containerBox">
    <div class="box">
      <div class="left">
        <div class="img_box">
          <img :src="userImg" alt="" />
        </div>
      </div>
      <main>
        <div class="info_box">
          <span
            class="del"
            v-if="userId == subComment.userId || userId === fatherComId"
            @click.stop="delCom"
            ><el-icon class="el-icon-delete"></el-icon
          ></span>
          <span class="username">{{ subComment.userName }}</span>
          <span>{{ subComment.commentText }}</span>
        </div>
        <span>{{ subComment.commentCreateTime }}</span>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "subComment",
  props: ["subComment", "fatherComId"],
  data() {
    return {
      userImg: "",
      userId: null,
    };
  },
  created() {
    this.userId = this.$cookies.get("userId");
    // console.log(this.subComment);
    console.log(this.fatherComId);
  },
  mounted() {
    this.formatDate(this.subComment.commentCreateTime);
    // console.log(this.subComment);
    if (this.subComment.userPhoto == null) {
      this.userImg = "http://1.15.53.152:9999/img/photo/0.jpg";
    } else {
      this.userImg = "http://" + this.subComment.userPhoto;
    }
    // this.isLike = this.subComment.liked;
  },
  methods: {
    formatDate(date) {
      // console.log(date);
      // var time = date.split("T");
      // console.log(time);
      this.subComment.commentCreateTime = date.split("T")[0];
    },
    delCom() {
      let commentId = this.subComment.commentId;
      this.$emit("wantDel", commentId);
    },
  },
};
</script>


<style scoped>
.containerBox {
  /* width: 90%; */
  /* height: 300px; */
  padding: 10px 10px 0 30px;
  /* margin: auto; */
  /* background-color: antiquewhite; */
}
/* .containerBox h4 {
  margin: 0;
  padding: 0;
  font-size: 5px;
} */
.box {
  display: flex;
}
.box .left .img_box {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: aquamarine;
}
.left .img_box img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.box main {
  flex: 1;
  margin-left: 15px;
  /* background-color: lightcoral; */
}
.info_box span {
  display: block;
  font-size: 15px;
  margin-bottom: 10px;
  /* color: lightslategray;
   */
}
.info_box .username {
  font-size: 15px;
  color: black;
  /* margin-bottom: 10px; */
}
.info_box .del {
  margin-top: 20px;
  margin-right: 50px;
  float: right;
}
.box main {
  margin-bottom: 10px;
  /* white-space: pre-line; */
  white-space: pre-wrap;
  /* background-color: lightskyblue; */
}
.box main > span {
  margin-top: 20px;
  font-size: 10px;
  color: rgb(163, 157, 157);
}
</style>
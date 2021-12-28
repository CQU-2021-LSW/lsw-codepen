<template>
  <div class="content">
    <div class="box">
      <header>
        <div class="img_box"></div>
        <div class="info_box">
          <span class="username">{{ comment.userName }}</span>
          <span>{{ comment.commentCreateTime }}</span>
        </div>
      </header>
      <main>{{ comment.commentText }}</main>
      <footer>
        <span><i class="el-icon-chat-dot-round"></i></span>
        <span @click="give_a_like"
          ><i :class="[isLike ? 'el-icon-star-on' : 'el-icon-star-off']"></i
          >&nbsp;{{ comment.likeCount ? comment.likeCount : "" }}</span
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
    };
  },
  methods: {
    give_a_like() {
      if (!this.flag) {
        this.comment.likeCount++;
        this.flag = true;
        this.isLike = true;
      } else {
        this.comment.likeCount--;
        this.flag = false;
        this.isLike = false;
      }
    },
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
  width: 500px;
  /* height: 300px; */
  padding: 10px 100px;
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
.box header .info_box {
  flex: 1;
  margin-left: 15px;
  background-color: lightcoral;
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
  margin-bottom: 10px;
  background-color: lightskyblue;
}
.box footer {
  margin-bottom: 10px;
  background-color: lightsteelblue;
  display: flex;
  justify-content: space-around;
}
.box footer .el-icon-star-on {
  color: lightpink;
  font-size: 20px;
  -webkit-text-stroke: rgb(202, 147, 155);
  -webkit-text-stroke-width: 1px;
}
</style>
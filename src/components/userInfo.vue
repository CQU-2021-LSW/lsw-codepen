<template>
  <div>
    <el-form
      :model="newUserInfo1"
      status-icon
      :rules="rules"
      ref="newUserInfo"
      label-width="55px"
      class="demo-newUserInfo"
    >
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="newUserInfo1.userName"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="userGender">
        <el-input v-model="newUserInfo1.userGender"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="userPhone">
        <el-input v-model.number="newUserInfo1.userPhone"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="userAddr">
        <el-input v-model="newUserInfo1.userAddr"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="userEmail">
        <el-input v-model="newUserInfo1.userEmail"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="userMotto">
        <el-input type="textarea" v-model="newUserInfo1.userMotto"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="ghost" @click="update" class="submit_btn"
          >提交</el-button
        >
        <el-button @click="cancel" class="reset_btn">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (value === "") {
        setTimeout(() => {
          callback(new Error("请输入用户名、(*￣3￣)╭"));
        }, 1000);
      } else {
        callback();
      }
    };
    var validatePhoneNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value + "".length < 9) {
            callback(new Error("号码过短"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      userInfo1: null,
      // userInfo: {
      //   userName: "",
      //   userPhone: "",
      //   userGender: "",
      //   userMotto: "",
      //   userCreateTime: "",
      //   userAddr: "",
      //   userEmail: "",
      // },
      newUserInfo1: null,
      // newUserInfo: {
      //   userName: "",
      //   userPhone: "",
      //   userGender: "",
      //   userMotto: "",
      //   userCreateTime: "",
      //   userAddr: "",
      //   userEmail: "",
      // },
      // isChanging: false,
      rules: {
        userName: [{ validator: checkName, trigger: "blur" }],
        userPhone: [{ validator: validatePhoneNumber, trigger: "blur" }],
      },
    };
  },
  methods: {
    getUserInfo1() {
      this.userInfo1 = this.$store.state.userData;
      this.newUserInfo1 = this.$store.state.userData;
      // console.log(111);
      // console.log(this.userInfo1);
    },
    // getUserInfo() {
    //   this.$http
    //     .get("user/userInfo", {
    //       params: {
    //         userId: this.$store.state.userId,
    //       },
    //     })
    //     .then(({ data }) => {
    //       console.log(data);
    //       this.userInfo.userName = data.data.userName;
    //       this.userInfo.userPhone = data.data.userPhone;
    //       this.userInfo.userGender = data.data.userGender;
    //       this.userInfo.userMotto = data.data.userMotto;
    //       this.userInfo.userCreateTime = data.data.userCreateTime;
    //       this.userInfo.userAddr = data.data.userAddr;
    //       this.userInfo.userEmail = data.data.userEmail;
    //       this.newUserInfo.userName = data.data.userName;
    //       this.newUserInfo.userPhone = data.data.userPhone;
    //       this.newUserInfo.userGender = data.data.userGender;
    //       this.newUserInfo.userMotto = data.data.userMotto;
    //       this.newUserInfo.userCreateTime = data.data.userCreateTime;
    //       this.newUserInfo.userAddr = data.data.userAddr;
    //       this.newUserInfo.userEmail = data.data.userEmail;
    //     });
    // },
    // logout() {
    //   this.$store.commit("unAuth");
    //   this.$store.state.userId = "";
    //   localStorage.setItem("Token", "NONE");
    //   console.log(localStorage.getItem("Token"));
    //   console.log(this.$store.state.isAuth);
    //   this.$router.push({ path: "/editor" });
    // },
    // doChange() {
    //   this.isChanging = true;
    //   console.log("changing");
    // },
    update() {
      var tableUser = this.newUserInfo1;
      tableUser = Object.assign({}, tableUser, {
        userId: this.$store.state.userId,
      });
      console.log(tableUser);
      //   tableUser.userId = this.$store.state.userId;
      //   console.log(1111);
      this.$http({
        method: "post",
        url: "/user/update",
        data: tableUser,
      }).then(({ data }) => {
        // console.log(data.code);
        if (data && data.code === 0) {
          // console.log(data);
          // this.getUserInfo();
          // this.isChanging = false;
          // this.$store.state.userName = this.newUserInfo1.userName;
          this.$store.commit("updateUserInfo", this.newUserInfo1);
          this.$message({
            message: "修改成功┗|｀O′|┛ 嗷~~",
            type: "success",
          });
          this.$emit("cancelUpdate");
        } else {
          this.$message({
            message: "修改失败(∪.∪ )...zzz用户名or手机号重复",
            type: "warning",
          });
        }
      });
    },
    cancel() {
      //   this.$store.state.isWantEdit = false;
      this.$emit("cancelUpdate");
    },
  },
  created() {
    // console.log("我创建了");
    // this.getUserInfo();
    this.getUserInfo1();
  },
};
</script>

<style scoped>
.submit_btn {
  background-color: rgb(212, 243, 245);
}
.submit_btn:hover,
.reset_btn:hover {
  background-color: rgb(248, 228, 184);
  color: black;
  /* font-weight: 10px; */
}
.reset_btn {
  margin-left: 20px;
}
</style>
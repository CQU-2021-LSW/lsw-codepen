<template>
  <div id="a">
    <!-- <img id="bg" src="../assets/bg.jpg"/> -->
    <div id="b">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('ruleForm')" plain
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')" plain>重置</el-button>
          <el-button type="primary" @click="toRegister()" plain>注册</el-button>
          <el-button type="danger" @click="toFindbackPassword()" plain
            >找回密码</el-button
          >
        </el-form-item>
      </el-form>
    </div>
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        userName: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        userName: [{ validator: checkName, trigger: "blur" }],
      },
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            method: "post",
            url: "/user/login",
            data: {
              userName: this.ruleForm.userName,
              password: this.ruleForm.password,
            },
          })
            .then(({ data }) => {
              // 保存Token和登录信息
              console.log(data)
              if (data.state) {
                console.log("认证成功")
                console.log(this.ruleForm.userName)
                var args = {
                  uid: data.userId,
                  token: data.token,
                  name: this.ruleForm.userName
                }
                this.$store.commit("auth", args)
                this.$cookies.set("userId", data.userId)
                this.$cookies.set("userName", this.ruleForm.userName)
                this.$router.push({ path: "/user-hub" })
              } else {
                console.log("失败")
              }
            })
            .catch(({ error }) => {
              console.log("err")
              console.log(error)
            });
        } else {
          console.log("error submit!!")
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    toRegister() {
      this.$router.push({ path: "/register" })
    },
    toFindbackPassword() {
      this.$router.push({ path: "/findBackPwd" })
    },
  },
};
</script>

<style scoped>
#a {
  height: 100%;
  background-image: url("../assets/bg.jpg");
  background-size: 100% 100%;
}
#b {
  position: absolute;
  background-color: rgba(255, 192, 203, 0.5);
  border-radius: 10px;
  height: 300px;
  width: 400px;
  padding: 20px 20px 0px 20px;
  top: 50%;
  left: 50%;
  margin: -150px -200px;
}
.el-button {
  margin: 10px 10px;
}
.el-form-item__label {
  font-size: 24px;
}
/* #bg{
  position:absolute;
  left:0px;
  top:0px;
  z-index:-1;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
} */
</style>
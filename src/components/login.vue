<template>
  <div id="a">
    <!-- <img id="bg" src="../assets/bg.jpg"/> -->
    <div id="input">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
        <el-form-item prop="userName">
          <div class="line">
            <el-tag>用户名:</el-tag>
            <div class="inputdiv">
              <el-input v-model="ruleForm.userName"></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item prop="password">
          <div class="line">
            <el-tag>密码:</el-tag>
            <div class="inputdiv">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="btndiv">
            <el-button @click="login('ruleForm')" type="primary">登录</el-button>
            <el-button @click="resetForm('ruleForm')" type="info">重置</el-button>
            <el-button @click="toRegister()" type="success">注册</el-button>
            <el-button @click="toFindbackPassword()" type="danger">找回密码</el-button>
          </div>
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
          callback(new Error("请输入用户名、(*￣3￣)╭"))
        }, 1000)
      } else {
        callback()
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else {
        callback()
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
              console.log(data.data)
              if (data.code === 0) {
                console.log("认证成功")
                // console.log(this.ruleForm.userName)
                var args = {
                  data: data.data,
                  token: data.token,
                  // name: this.ruleForm.userName
                }
                this.$store.commit("auth", args)
                this.$cookies.set("userId", data.data.userId)
                //this.$cookies.set("userName", this.ruleForm.userName)
                if (this.$store.state.isCache){
                  this.$router.push({ path: "/editor" })
                } else {
                  this.$router.push({ path: "/user-hub" })
                }
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
#input {
  position: absolute;
  background-color: rgba(255, 192, 203, 0.5);
  border-radius: 10px;
  height: 220px;
  width: 360px;
  padding: 20px 20px 0px 20px;
  top: 50%;
  left: 50%;
  margin: -110px -180px;
}
/*.el-button {
  margin: 10px 10px;
}*/
.el-form-item__label {
  font-size: 24px;
}
.line{
  display: flex;
  flex-direction: row;
  margin: 10px 0px 0px 0px;
}
.inputdiv{
  height: 40px;
  width: 250px;
}
.el-tag{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 90px;
  font-size: 14px;
  margin: 0px 20px 0px 0px;
}
.btndiv{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 10px 0px 0px 0px;
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
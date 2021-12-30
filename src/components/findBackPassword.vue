<template>
  <div id="bg">
    <candle></candle>
    <div class="input">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
        <el-form-item prop="userName">
          <div class="line">
            <el-tag><i class="el-icon-postcard"></i>用户名:</el-tag>
            <div class="inputdiv">
              <el-input v-model="ruleForm.userName"></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item prop="userPhone">
          <div class="line">
            <el-tag><i class="el-icon-mobile-phone"></i>手机号:</el-tag>
            <div class="inputdiv">
              <el-input v-model.number="ruleForm.userPhone"></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item prop="password">
          <div class="line">
            <el-tag><i class="el-icon-lock"></i>新密码:</el-tag>
            <div class="inputdiv">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item prop="checkPass">
          <div class="line">
            <el-tag><i class="el-icon-lock"></i>确认密码:</el-tag>
            <div class="inputdiv">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </div>
          </div>
        </el-form-item>
      </el-form>  
          <slide-verify></slide-verify>
      <div class="btndiv">
        <el-button type="primary" @click="findbackPassword('ruleForm')"><i class="el-icon-check"></i>提交</el-button>
        <el-button type="danger" @click="resetForm('ruleForm')"><i class="el-icon-refresh-right"></i>重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import candle from './candle.vue';
import SlideVerify from './slideVerify.vue';
export default {
  components: { candle, SlideVerify },
  data() {
    var checkName = (rule, value, callback) => {
      if (value === '') {
        setTimeout(() => {
          callback(new Error('请输入用户名、(*￣3￣)╭'));
        }, 500);
      } else{
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码(￣o￣) . z Z'));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码||ヽ(*￣▽￣*)ノミ|Ю'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!(⊙﹏⊙)'));
      } else {
        callback();
      }
    };
    var validatePhoneNumber = (rule,value,callback) =>{
      if (!value) {
        return callback(new Error('号码不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value + ''.length < 9) {
            callback(new Error('号码过短'));
          } else {
            callback();
          }
        }
      }, 1000);
    }
    return {
      ruleForm: {
      password: '',
      checkPass: '',
      userName: '',
      userPhone: ''
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        userName: [
          { validator: checkName, trigger: 'blur' }
        ],
        userPhone: [
          { validator: validatePhoneNumber, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    findbackPassword(formName) {
      if (this.$store.state.isVerify) {
        this.$refs[formName].validate((valid) => {
          if (valid) { // 验证成功发送请求
            this.$http({
              method: 'post',
              url: '/user/findBackPwd',
              data: {
                userName: this.ruleForm.userName,
                userPhone: this.ruleForm.userPhone,
                password: this.ruleForm.password
              }
            })
            .then(({ data }) => {
              console.log(data);
              if (data.code === 0) {
                new Promise((resove) => {
                  this.$message({ message: '修改成功啦！'})
                  setTimeout(resove, 2000)
                })
                .then(() => {
                  this.$store.state.isVerify = false
                  if (this.$store.state.isAuth === 0){
                    this.$router.push({ path: "/login" })
                  } else {
                    this.$router.push({ path: "/user-hub" })
                  }
                })
              } else {
                this.$message({ message: '输入的手机号与用户名不匹配！'})
              }
            })
            .catch(({ error }) => {
              console.log(error);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      } else {
        this.$message({ message: '请先完成滑块验证┗|｀O′|┛ 嗷~~'})
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
}
</script>

<style scoped>
#bg {
  height: 100%;
}
.input{
  position: absolute;
  background-color: rgba(255, 192, 203, 0.5);
  border-radius: 10px;
  height: 430px;
  width: 400px;
  padding: 20px 20px 0px 20px;
  top: 50%;
  left: 50%;
  margin: -215px -200px;
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
  width: 100px;
  font-size: 14px;
  margin: 0px 20px 0px 0px;
}
.btndiv{
  display: flex;
  justify-content: center;
}
.el-button{
  margin: 25px 20px 0px 20px;
}
</style>
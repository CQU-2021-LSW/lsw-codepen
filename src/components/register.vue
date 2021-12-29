<template>
  <div id="bg">
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
        <el-form-item prop="password">
          <div class="line">
            <el-tag><i class="el-icon-lock"></i>密码:</el-tag>
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
        <el-form-item prop="userPhone">
          <div class="line">
            <el-tag><i class="el-icon-mobile-phone"></i>手机号:</el-tag>
            <div class="inputdiv">
              <el-input v-model.number="ruleForm.userPhone"></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item prop="userGender">
          <div class="line">
            <el-tag><i class="el-icon-s-custom"></i>性别:</el-tag>
            <div class="inputdiv">
              <el-radio-group v-model="ruleForm.userGender">
                <el-radio :label="0">神秘</el-radio>
                <el-radio :label="1"><i class="el-icon-male"></i></el-radio>
                <el-radio :label="2"><i class="el-icon-female"></i></el-radio>
              </el-radio-group>
            </div>
          </div>
        </el-form-item>
        <!-- <el-form-item prop="userMotto">
            <el-input type="textarea" v-model="ruleForm.userMotto"></el-input>
        </el-form-item> -->
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"><i class="el-icon-check"></i>提交</el-button>
            <el-button el-button @click="resetForm('ruleForm')"><i class="el-icon-refresh-right"></i>重置</el-button>
        </el-form-item>
      </el-form>
      <slide-verify></slide-verify>
    </div>
  </div>
</template>

<script>
import slideVerify from './slideVerify.vue';

export default {
  components: { slideVerify },
  data() {
    var checkName = (rule, value, callback) => {
      if (value === '') {
        setTimeout(() => {
          callback(new Error('请输入用户名、(*￣3￣)╭'));
        }, 1000);
      }
      else{
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码(￣o￣) . z Z'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码ヽ(*￣▽￣*)ノ'));
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
        userPhone: '',
        userGender: 0,
        // userMotto: ''
      },
      state: false, 
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            method: 'post',
            url: '/user/register',
            data: {
              userName: this.ruleForm.userName,
              password: this.ruleForm.password,
              userPhone: this.ruleForm.userPhone,
              userGender: this.ruleForm.userGender //,
              // userMotto: this.ruleForm.userMotto
            }
          })
          .then(({data}) => {
              console.log(data);
              this.state = data.state
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  computed: {
    isVerify() {
      return this.$store.state.isVerify
    }
  }
}
</script>

<style scoped>
.input{
  position: absolute;
  background-color: rgba(255, 192, 203, 0.5);
  border-radius: 10px;
  height: 500px;
  width: 400px;
  padding: 20px 20px 0px 20px;
  top: 50%;
  left: 50%;
  margin: -250px -200px;
}
#bg{
  height: 100%;
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
</style>
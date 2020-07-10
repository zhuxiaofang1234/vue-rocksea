<template>
  <div class="login">
    <div class="loginbox">
      <div class="message">武汉嘉测科技</div>
      <div id="darkbannerwrap"></div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户账号" prop="userNameOrEmailAddress">
          <el-input v-model="ruleForm.userNameOrEmailAddress"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="ruleForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登陆</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        userNameOrEmailAddress: '',
        password: ''
      },
      rules: {
        userNameOrEmailAddress: [
          {
            required: true,
            message: '请输入用戶账号',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入用户密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          console.log(this.ruleForm.userNameOrEmailAddress)

          this.$http.post('/api/TokenAuth/Authenticate', this.ruleForm).then(
            response => {
              this.$message({
                message: '登录成功',
                type: 'success'
              });
              //存储token
              let accessToken = response.result.accessToken
              window.sessionStorage.setItem('accessToken', accessToken)
              //跳转到后台主页
              this.$router.push('/home')
            },
            err => {
              console.log(err);
              this.$message({
                showClose: true,
                message: '用户名或密码错误',
                type: 'warning'
              })
            }
          )
        } else {
          this.$message.error('登录失败')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    postLogin(data) {
      console.log(data)
    }
  }
}
</script>
<style scoped lang="scss">
.login {
  height: 100%;
  width: 100%;
  background: url(../assets/pageBg/web_login_bg.jpg) no-repeat center;
  background-size: 100% 100%;
  overflow: hidden;
}
.loginbox {
  margin: 150px auto 0 auto;
  min-height: 420px;
  max-width: 420px;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 4px;
  box-sizing: border-box;
}
.message {
  margin: 10px 0 0 -58px;
  padding: 18px 10px 18px 20px;
  background: #27a9e3;
  position: relative;
  color: #fff;
  font-size: 18px;
}
#darkbannerwrap {
  background: url(../assets/pageBg/aiwrap.png);
  width: 18px;
  height: 10px;
  margin: 0 0 20px -58px;
  position: relative;
}
.input_outer {
  height: 46px;
  padding: 0 5px;
  margin-bottom: 30px;
  border-radius: 50px;
  position: relative;
  border: 1px solid #cad2db;
}
.text-none {
  width: 220px;
  height: 46px;
  outline: none;
  display: inline-block;
  font: 14px 'microsoft yahei', Helvetica, Tahoma, Arial, 'Microsoft jhengHei';
  margin-left: 50px;
  border: none;
  background: none;
  line-height: 46px;
  color: #717171;
}
input.text-none:focus .input_outer {
  border: 1px solid #d58512;
}
.u_user {
  width: 25px;
  height: 25px;
  background: url(../assets/pageBg/login_ico.png);
  background-position: -125px 0;
  position: absolute;
  margin: 10px 13px;
}
.us_uer {
  width: 25px;
  height: 25px;
  background: url(../assets/pageBg/login_ico.png);
  background-position: -125px -34px;
  position: absolute;
  margin: 10px 13px;
}
input[type='submit'],
input[type='button'] {
  display: inline-block;
  vertical-align: middle;
  padding: 12px 24px;
  margin: 0px;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  color: #ffffff;
  background-color: #27a9e3;
  border-radius: 50px;
  border: none;
  -webkit-appearance: none;
  outline: none;
  width: 100%;
}
hr.hr15 {
  height: 15px;
  border: none;
  margin: 0px;
  padding: 0px;
  width: 100%;
}
hr.hr20 {
  height: 20px;
  border: none;
  margin: 0px;
  padding: 0px;
  width: 100%;
}
</style>

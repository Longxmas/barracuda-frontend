<template>
  <div class="login-view">
    <el-container class="login">

      <el-main>
        <el-card class="login-card">
          <el-form :model="registerForm" ref="registerForm" label-width="auto" class="login-form">
            <h1 align="left" style="color: #fff;font-size: 32px;font-weight: 700; margin: 0 0 28px; padding: 0;">
              注册
            </h1>
            <el-form-item
                prop="username">
              <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
            </el-form-item>

            <el-form-item
                prop="email">
              <el-input v-model="registerForm.email" placeholder="邮箱"></el-input>
            </el-form-item>

            <el-form-item
                prop="password">
              <el-input type="password" v-model="registerForm.password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="submitRegisterForm(registerForm)"
                         style="width: 100%;
                       margin-top: 24px;
                       margin-bottom: 12px;
                       background-color: crimson;
                       font: 16px Helvetica Neue,Helvetica,Arial,sans-serif;">
                注册
              </el-button>
              <div class="login-form-help">
                <div style="float:right; position:absolute; right: 0;">
                  <a class="login-help-link" href="/LoginHelp">需要帮助？</a>
                </div>
              </div>
            </el-form-item>

          </el-form>
        </el-card>
      </el-main>
    </el-container>
  </div>

</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      registerForm: {
        username: '',
        password: '',
        email:'',
      },
      isRememberAccount: true
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    submitRegisterForm(registerForm) {
      console.log(registerForm.valueOf());

      //Api.Login()
    },
    addUser() {
      // Vue.$router.push()
    }
  }
}
</script>

<style>

.login-signup-now {
  margin-top: 16px;
  color: #737373;
}

.login-help-link {
  color: #737373;
}

.login-remember-me-label-text {
  color: #b3b3b3;
}

.login-href {
  color: crimson;
}

.login-form-help {
  display: flex;
}

.el-checkbox__input.is-checked+.el-checkbox__label{
  color: #42b983 !important;
}

.el-input__inner:focus {
  border: #ffb921 1px solid;
}

.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  border-color: #42b983 !important;
  background-color: #42b983 !important;
}

.el-input__inner {
  background-color: rgba(0,0,0,0.61);
  color: #ffb921;
  caret-color: #ffb921;
}

.el-input__inner::placeholder {
  color: #ffb921;
}

.nav-header {
  background: linear-gradient(180deg, rgba(0,0,0,.5) 0, transparent);
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  padding: 0;
  border: 0;
}

.login-view {
  background: url('../assets/background.jpg');
  background-size: cover;
}

.login-card {
  background-color: transparent;
  margin-top: 3%;
  margin-left: 32%;
  margin-right: 32%;
  border: transparent;
}

.login-form {
  background-color: rgba(0,0,0,.75);
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 660px;
  padding: 60px 68px 40px;
  width: 100%;
}


</style>

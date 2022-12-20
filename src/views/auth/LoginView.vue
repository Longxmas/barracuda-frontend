<template>
  <div class="login-view">
    <el-container class="login">
      <el-header></el-header>
      <el-main>
        <el-card class="login-card">
          <el-form :model="loginForm" ref="loginForm" label-width="auto" class="login-form">
            <h1 style="color: #fff;font-size: 32px;font-weight: 700; margin: 0 0 28px; padding: 0;">
              登录
            </h1>
            <el-form-item
                prop="username">
              <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item
                prop="password">
              <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="submitLoginForm(loginForm)"
                         style="width: 100%;
                       margin-top: 24px;
                       margin-bottom: 12px;
                       background-color: crimson;
                       font: 16px Helvetica Neue,Helvetica,Arial,sans-serif;">
                登录
              </el-button>
              <div class="login-form-help">
                <div class="ui-binary-input login-remember-me" style="float:left">
                  <el-checkbox v-model="isRememberAccount" value="true" tabindex="0" class="login-remember-me-label-text">
                    记住我
                  </el-checkbox>
                </div>
                <div style="float:right; position:absolute; right: 0;">
                  <a class="login-help-link" href="/LoginHelp">需要帮助？</a>
                </div>
              </div>
            </el-form-item>
            <div class="login-signup-now">
              还没有账号？
              <a class="login-href" target="_self" href="/register">马上注册！</a>
            </div>
          </el-form>
        </el-card>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>

</template>

<script>
import * as api from "@/api/request";

export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      loginForm: {
        username: '',
        password: '',
      },
      isRememberAccount: true
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    async submitLoginForm(loginForm) {
      console.log(loginForm)
      let it = await api.postRequest('/login/', loginForm);
      console.log(it);
      alert(it.status);
      if (it.status === 200) {
        let user_info = await api.getRequest('/userinfo/', '');
        this.$store.commit('user/setId', user_info.data.id);
        this.$store.commit('user/setUsername', loginForm.username);
        this.$store.commit('user/setNickname', user_info.data.nickname);
        this.$store.commit('user/setEmail', user_info.data.email);
        this.$store.commit('user/setRole', 'NormalUser');
        this.$store.commit('user/setAvatar', 'http://localhost:8080/api/' + user_info.data.avatar);
        this.$store.commit('user/setIslogin', 'true');
        await this.$router.push('/')
      }
    },
    addUser() {
      this.$router.push('/register')
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
  background: url('../../assets/background.jpg');
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

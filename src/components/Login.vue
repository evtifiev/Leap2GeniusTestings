<template>
  <div class="g-center login-page" @keyup.enter="login">
    <h1>Please Login</h1>
    <el-form class="login-form">
      <el-form-item>
        <el-input
          :autofocus="username"
          placeholder="Email"
          v-model="username">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="Password"
          :type="pwdType"
          v-model="password">
        </el-input>
        <span class="show-pwd" @click="showPwd">
						</span>
      </el-form-item>
      <el-form-item>
        <el-button style="width:100%" @click.native="login" type="primary" :loading="isBtnLoading">{{btnText}}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        username: '',
        password: '',
        isBtnLoading: false,
        pwdType: "password"
      }
    },
    computed: {
      btnText() {
        if (this.isBtnLoading) return 'Authorization...';
        return 'Login';
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === "password") {
          this.pwdType = "";
        } else {
          this.pwdType = "password";
        }
      },
      login() {
        var vm = this;
        if (!vm.username) {
          vm.$message.error('Please enter your username');
          return;
        }
        if (!vm.password) {
          vm.$message.error('Please enter your password');
          return;
        }
        vm.isBtnLoading = false;
        let data = JSON.stringify({
          password: vm.password,
          username: vm.username
        });
        vm.$store.dispatch('login', data)
          .then(() => this.$router.push('/tests'))
          .catch(err => console.log(err))
      }
    },
    created() {
      window.addEventListener('load', () => {
        let page = this.$store.getters.getPageByAccessUrl(window.location.pathname);
        document.title = page.title;
        this.content = page.content;
      });
    }
  }
</script>

<style scoped>
  .login-page h1 {
    text-align: center;
  }

  .login-form {
    width: 350px;
    margin: 3% auto 0;
  }

  .login-form .show-pwd {
    position: absolute;
    right: 30px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }
</style>

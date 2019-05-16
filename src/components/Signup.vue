<template>
  <div class="g-center login-page" @keyup.enter="register">
    <h1>Signup</h1>
    <el-form class="login-form">
      <el-form-item>
        <el-input
          :autofocus="email"
          placeholder="Email"
          v-model="email"
          :rules="[
              { required: true, message: 'Please input email address', trigger: 'blur' },
              { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
            ]">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width:100%" @click.native="register" type="primary" :loading="isBtnLoading">{{btnText}}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "Signup",
    data() {
      return {
        email: '',
        isBtnLoading: false,
      }
    },
    computed: {
      btnText() {
        if (this.isBtnLoading) return 'Registration...';
        return 'Register';
      }
    },
    methods: {
      register() {
        var vm = this;
        if (!vm.email) {
          vm.$message.error('Please enter your email');
          return;
        }

        vm.isBtnLoading = true;
        let data = JSON.stringify({
          email: vm.email
        });
        vm.$store.dispatch('register', data)
          .then(() => {
            vm.isBtnLoading = false;
            this.$router.push('/tests');
          })
          .catch(err => console.log(err))
      }
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

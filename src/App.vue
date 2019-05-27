<template>
  <el-container class="container">
    <el-header>
      <a class="logo pull-left">
        Logo
      </a>
      <div class="pull-right header__main">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="/test" v-if="!isLoggedIn">
            <router-link to="/test">Test</router-link>
          </el-menu-item>
          <el-menu-item index="/signup" v-if="!isLoggedIn">
            <router-link to="/signup">Signup</router-link>
          </el-menu-item>
          <el-menu-item index="/login" v-if="!isLoggedIn">
            <router-link to="/login">Login</router-link>
          </el-menu-item>
          <el-menu-item index="/tests" v-if="isLoggedIn ">
            <router-link to="/tests">Tests</router-link>
          </el-menu-item>
          <el-menu-item index="/passed" v-if="isLoggedIn ">
            <router-link to="/passed">Passed</router-link>
          </el-menu-item>
          <el-menu-item index="/logout" v-if="isLoggedIn "><a @click="logout">Logout</a></el-menu-item>
        </el-menu>
      </div>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
    <el-footer>
      <el-container class="footer__section">
        &nbsp;
      </el-container>
      <el-container class="padding-set1">
        &copy; 2019
      </el-container>
    </el-footer>
  </el-container>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        activeIndex: window.location.pathname
      };
    },
    computed: {
      isLoggedIn: function () {
        return this.$store.getters.isLoggedIn
      },
      isAdminStatus: function () {
        return this.$store.getters.isAdminStatus
      }
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/')
          })
      }
    },
    created: function () {
      this.$http.interceptors.response.use(undefined, function (err) {
        return new Promise(function (resolve, reject) {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch(logout)
          }
          throw err;
        });
      });
      this.$store.dispatch('loading_pages');
    }
  }
</script>

<style>
@import url('./assets/main.css');

</style>

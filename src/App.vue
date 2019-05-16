<template>
  <el-container class="container">
    <el-header>
      <a class="logo pull-left">
        Logo
      </a>
      <div class="pull-right header__main">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="/home" v-if="!isLoggedIn">
            <router-link to="/">Home</router-link>
          </el-menu-item>
          <el-menu-item index="/test" v-if="!isLoggedIn">
            <router-link to="/test">Test</router-link>
          </el-menu-item>
          <el-menu-item index="/about" v-if="!isLoggedIn">
            <router-link to="/about">About</router-link>
          </el-menu-item>
          <el-menu-item index="/contact" v-if="!isLoggedIn">
            <router-link to="/contact">Contact</router-link>
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
  @import url(//fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,600,600i,700,700i,800,800i&amp;subset=cyrillic,cyrillic-ext,latin-ext);

  body {
    font: 14px Roboto, Arial, sans-serif;
    width: 100%;
    height: 100%;
    line-height: 20px;
    background: #fff;
    color: #2E3E5E;
  }

  a {
    color: #2E3E5E;
    outline: none;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  img {
    border: 0;
    max-width: 100%;
  }

  input, button, select, textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  button {
    cursor: pointer;
    border: 0;
    outline: none;
  }

  input {
    vertical-align: middle;
    outline: none;
    border: 0;
  }

  input[type="submit"], input[type="button"] {
    cursor: pointer;
    -webkit-appearance: none;
  }

  textarea {
    outline: none;
    resize: none;
  }

  :invalid {
    box-shadow: none;
  }

  ol, ul {
    list-style-position: inside;
  }

  h1 {
    color: #10274E;
    font-size: 32px;
    font-weight: 500;
    line-height: 40px;
    margin-bottom: 15px;
  }
  h2{
    color: #10274E;
    font-size: 26px;
    font-weight: 500;
    line-height: 40px;
    margin-bottom: 15px;
  }

  ::-webkit-input-placeholder {
    color: #9299A8;
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  ::-moz-placeholder {
    color: #9299A8;
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  :-moz-placeholder {
    color: #9299A8;
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  :-ms-input-placeholder {
    color: #9299A8;
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  :focus::-webkit-input-placeholder {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  :focus::-moz-placeholder {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  :focus:-moz-placeholder {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  :focus:-ms-input-placeholder {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  a, .btn {
    -webkit-transition: .3s;
    -moz-transition: .3s;
    -o-transition: .3s;
    -ms-transition: .3s;
    transition: .3s;
  }

  .btn {
    display: inline-block;
    vertical-align: top;
  }

  .wrapper {
    min-height: 100%;
    height: auto;
    overflow: hidden;
  }

  .container {
    max-width: 1170px;
    padding-left: 15px;
    padding-right: 15px;
    margin: 0 auto;
  }

  .pull-left {
    float: left;
  }

  .pull-right {
    float: right;
  }

  .align-left {
    text-align: left;
  }

  .align-center {
    text-align: center;
  }

  .align-right {
    text-align: right;
  }

  .hidden {
    overflow: hidden;
  }

  .clearfix:before, .clearfix:after {
    content: "";
    display: table;
  }

  .clearfix:after {
    clear: both;
  }

  .btn {
    display: inline-block;
    box-sizing: border-box;
    text-decoration: none;
    cursor: pointer;
    text-align: center;
  }

  .text-desc {
    font-size: 18px;
    line-height: 28px;
    margin-bottom: 40px;
  }

  .btn:hover {
    text-decoration: none;
  }

  .container {
    max-width: 1170px;
    padding-left: 15px;
    padding-right: 15px;
    margin: 0 auto;
  }

  .el-header {
    padding-top: 19px;
    min-height: 80px;
    box-sizing: border-box;
    margin-bottom: 25px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background: #fff;
    z-index: 50;
  }

  .el-header .logo {
    width: 158px;
  }

  .el-main {
    padding-top: 105px;
    padding-bottom: 80px;
  }

  .footer__section {
    border-bottom: 1px solid #E0E8F4;
    padding-top: 45px;
    padding-bottom: 25px;
  }

  .padding-set1 {
    padding-top: 23px;
    padding-bottom: 20px;
  }

  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }

  .el-menu--horizontal > .el-menu-item {
    line-height: 40px;
  }

  .el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: 2px solid #14CD89;
    color: #10274E;
  }

  .el-menu--horizontal > .el-menu-item a {
    color: #10274E;
    text-decoration: none;
  }

  .el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    color: #10274E;
    border-bottom: 2px solid #14CD89;
  }

</style>

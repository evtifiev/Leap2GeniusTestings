import Vue from 'vue';
import Router from 'vue-router';
import Tests from './views/TestList.vue'
import Passed from './views/Passed.vue'
import Test from './views/Test.vue'
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import Char from './views/Char.vue'
import AuthenticateUserTestResult from './views/AuthenticateUserTestResult.vue'
import AuthenticateUserTestStart from './views/AuthenticateUserTestStart.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
      {
      path: '/tests',
      name: 'tests',
      component: Tests
    },{
      path: '/tests/:id',
      name: 'test-start',
      component: AuthenticateUserTestStart
    },{
      path: '/passed',
      name: 'passed',
      component: Passed
    },
    { path: '/passed/:id', name:'result-view',component: AuthenticateUserTestResult }
  ]
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
});

export default router

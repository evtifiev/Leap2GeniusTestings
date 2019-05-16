import Vue from 'vue';
import VueCookie from 'vue-cookie';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';
import ChartRadar from './components/ChartRadar'
import App from './App.vue';
import router from './router';
import store from './store';
import Axios from 'axios';

Vue.use(ElementUI, { locale });
Vue.use(VueCookie);
Vue.component(ChartRadar.name, ChartRadar);

Vue.prototype.$http = Axios;

const token = localStorage.getItem('token');
Vue.prototype.$http.defaults.xsrfHeaderName = 'X-CSRFToken';
Vue.prototype.$http.defaults.xsrfCookieName = 'csrftoken';
Vue.prototype.$http.defaults.crossdomain = true;
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] =  `Token ` + token;
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})

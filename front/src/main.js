// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Store from './Store'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import API from './API'

axios.defaults.baseURL = 'http://192.168.1.35:3000';

window.axios = axios
window.API = API
window.Store = Store

Vue.config.productionTip = false

router.beforeEach(function (to, from, next) {
    if (to.meta.requiresAuth && !Store.state.authenticated ) {
        next({ path: '/' });
    } else {
    	  axios.defaults.headers.common['Authorization'] ='JWT ' + Store.state.tokens.token;
        next()
    }
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

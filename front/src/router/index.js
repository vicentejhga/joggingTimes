import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Times from '@/pages/Times'
import Users from '@/pages/Users'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/times',
      name: 'Times',
      component: Times
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    }
  ]

})



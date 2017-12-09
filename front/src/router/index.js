import Vue from 'vue'
import Router from 'vue-router'

import Register from '@/components/Register'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Weekly from '@/components/Weekly'
import Times from '@/components/Times'


Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    }, 
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/times',
      name: 'Times',
      component: Times
    }, 
    {
      path: '/weekly',
      name: 'Weekly',
      component: Weekly
    }
  ]
})

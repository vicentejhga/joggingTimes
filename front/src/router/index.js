import Vue from 'vue'
import Router from 'vue-router'

import Register from '@/components/Register'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Weekly from '@/components/Weekly'
import Times from '@/components/Times'
import Users from '@/components/Users'


Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false }
    }, 
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true }
    },
     {
      path: '/times/:user',
      name: 'UserTimes',
      component: Times,
      meta: { requiresAuth: true }
    },
    {
      path: '/times',
      name: 'Times',
      component: Times,
      meta: { requiresAuth: true }
    }, 
    {
      path: '/weekly',
      name: 'Weekly',
      component: Weekly,
      meta: { requiresAuth: true }
    }, 
    {
      path: '/users',
      name: 'Users',
      component: Users,
      meta: { requiresAuth: true }
    }
  ]
})

import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      auth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, _from, next) => {
  if (to.meta.auth) {
    if (store.state.user.isLogin) {
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`)
    }
  } else {
    next()
  }
})

export default router

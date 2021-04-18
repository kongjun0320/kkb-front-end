import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login')
  },

  // {
  //   path: '/detail/:name',
  //   name: 'detail',
  //   component: () => import('../views/detail')
  // },
  {
    path: '*',
    name: 'notFound',
    component: () => import('../views/notFound')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, _from, next) => {
//   console.log(to, window.isLogin)
//   if (to.path === '/admin' && to.meta.auth) {
//     if (!window.isLogin) {
//       next(`/login?redirect=${to.fullPath}`)
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

router.beforeEach((to, _from, next) => {
  if (!window.isLogin) {
    if (to.path === '/login') {
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`)
    }
  } else {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  }
})

export default router

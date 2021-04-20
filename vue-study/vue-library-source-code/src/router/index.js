import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from './k-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    children: [
      {
        name: 'Child',
        path: 'child',
        component: {
          name: 'Child',
          render(h) {
            return h('div', 'child page')
          }
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router

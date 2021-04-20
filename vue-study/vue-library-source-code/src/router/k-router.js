// Vue-Router是Vuejs的一个插件
let _Vue
class KRouter {
  constructor(options) {
    this.$options = options
    this.routeMap = {}
    options.routes.forEach((route) => {
      this.routeMap[route.path] = route
    })

    const init = window.location.hash.slice(1)
    _Vue.util.defineReactive(this, 'current', init)

    window.addEventListener('hashchange', this.handleHashChange.bind(this))
    window.addEventListener('load', this.handleHashChange.bind(this))
  }
  handleHashChange() {
    this.current = window.location.hash.slice(1)
  }
}

KRouter.install = function(Vue) {
  _Vue = Vue
  // 将rotuer实例挂载到全局
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })
  // 创建两个组件
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        default: ''
      }
    },
    render(h) {
      return h(
        'a',
        {
          attrs: {
            href: '#' + this.to
          }
        },
        this.$slots.default
      )
    }
  })
  Vue.component('router-view', {
    render(h) {
      // const routes = this.$router.$options.routes
      // const route = routes.find((r) => r.path === this.$router.current)
      // const comp = routes ? route.component : null

      const { routeMap, current } = this.$router
      const currentRoute = routeMap[current]
      const comp = currentRoute ? currentRoute.component : null

      return h(comp)
    }
  })
}

export default KRouter

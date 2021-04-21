// Vue-Router是Vuejs的一个插件
let _Vue
class KRouter {
  constructor(options) {
    this.$options = options
    this.routeMap = {}
    options.routes.forEach((route) => {
      this.routeMap[route.path] = route
    })

    // const init = window.location.hash.slice(1)
    // _Vue.util.defineReactive(this, 'current', init)

    // 嵌套路由处理
    this.current = window.location.hash.slice(1) || '/'
    _Vue.util.defineReactive(this, 'matched', [])
    this.match()

    window.addEventListener('hashchange', this.handleHashChange.bind(this))
    window.addEventListener('load', this.handleHashChange.bind(this))
  }
  handleHashChange() {
    this.current = window.location.hash.slice(1)
    this.matched = []
    this.match()
  }
  match(routes) {
    routes = routes || this.$options.routes
    for (const route of routes) {
      if (route.path === '/' && this.current === '/') {
        this.matched.push(route)
        return
      }
      if (route.path !== '/' && this.current.indexOf(route.path) !== -1) {
        this.matched.push(route)
        if (route.children) {
          this.match(route.children)
        }
        return
      }
    }
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
    name: 'RouterLink',
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
    name: 'RouterView',
    render(h) {
      // const routes = this.$router.$options.routes
      // const route = routes.find((r) => r.path === this.$router.current)
      // const comp = routes ? route.component : null

      // router-view的深度标记
      this.$vnode.data.routerView = true
      let depth = 0
      let parent = this.$parent
      while (parent) {
        const vnodeData = parent.$vnode && parent.$vnode.data
        if (vnodeData) {
          if (vnodeData.routerView) {
            depth++
          }
        }
        parent = parent.$parent
      }

      // const { routeMap, current } = this.$router
      // const currentRoute = routeMap[current]
      // const comp = currentRoute ? currentRoute.component : null
      // 嵌套路由处理
      let component = null
      const route = this.$router.matched[depth]
      if (route) {
        component = route.component
      }

      return h(component)
    }
  })
}

export default KRouter

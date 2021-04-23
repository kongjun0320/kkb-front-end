let _Vue

class Store {
  constructor(options) {
    this._mutations = options.mutations
    this._actions = options.actions

    this._wrappedGetters = options.getters

    const computed = {}
    this.getters = {}

    const store = this

    Object.keys(this._wrappedGetters).forEach((key) => {
      const fn = this._wrappedGetters[key]
      computed[key] = function() {
        return fn(store.state)
      }
      Object.defineProperty(store.getters, key, {
        get: () => store._vm[key]
      })
    })

    this._vm = new _Vue({
      data: {
        // $$state不会代理到Vue实例上
        $$state: options.state
      },
      computed
    })

    // 为什么可以解构出action
    const { commit, action } = store

    this.commit = function bindCommit(type, payload) {
      commit.call(store, type, payload)
    }

    this.action = function bindAction(type, payload) {
      return action.call(store, type, payload)
    }
  }
  get state() {
    return this._vm._data.$$state
  }
  set state(_v) {
    console.error('no')
  }
  commit(type, payload) {
    this._mutations[type](this.state, payload)
  }
  dispatch(type, payload) {
    return this._actions[type](this, payload)
  }
}

function install(Vue) {
  _Vue = Vue
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        // 全局挂载store实例
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default {
  Store,
  install
}

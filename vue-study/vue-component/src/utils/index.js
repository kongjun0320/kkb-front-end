import Vue from 'vue'

export const Bus = class Bus {
  constructor() {
    this.bus = {}
  }
  on(type, handler) {
    this.bus[type] = this.bus[type] || []
    this.bus[type].push(handler)
  }
  emit(type, args) {
    this.bus[type].forEach((handler) => handler(args))
  }
}
/**
 * Component: 挂载组件
 * props: 组件的参数
 */
export const create = (Component, props) => {
  const vm = new Vue({
    render(h) {
      return h(Component, { props })
    }
  }).$mount()
  document.body.appendChild(vm.$el)

  const comp = vm.$children[0]
  comp.remove = () => {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }
  return comp
}

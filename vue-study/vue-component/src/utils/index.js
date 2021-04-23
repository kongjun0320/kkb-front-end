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
  // 1.Vue.extend 如何实现
  const Ctrl = Vue.extend(Component)
  const comp = new Ctrl({ propsData: props })
  comp.$mount()
  document.body.appendChild(comp.$el)
  comp.remove = () => {
    document.body.removeChild(comp.$el)
    comp.$destroy()
  }
  return comp
  // 2.render
  // const vm = new Vue({
  //   render(h) {
  //     return h(Component, { props })
  //   }
  // }).$mount()
  // document.body.appendChild(vm.$el)

  // const comp = vm.$children[0]
  // comp.remove = () => {
  //   document.body.removeChild(vm.$el)
  //   vm.$destroy()
  // }
  // return comp
}

export const dispatch = (componentName, eventName) => {
  let parent = this.$parent || this.$root
  const name = parent.$options.name
  while (name !== componentName) {
    parent = parent.$parent
  }
  if (parent) {
    parent.$emit.apply(parent, eventName)
  }
}

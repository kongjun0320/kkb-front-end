class KVue {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data

    if (this.$el) {
      // 代理
      this.proxy(this.$data)
      // 响应式
      new Observer(this.$data)
      // 编译
      new Compiler(this.$el, this)
    }
  }
  proxy(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        get() {
          return data[key]
        },
        set(newVal) {
          console.log(1111)
          data[key] = newVal
        }
      })
    })
  }
}

class Dep {
  constructor() {
    this.subs = []
  }
  addSub(watcher) {
    this.subs.push(watcher)
  }
  notify() {
    this.subs.forEach((watcher) => watcher())
  }
}

class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm
    this.expr = expr
    this.cb = cb
    this.oldValue = this.get()
  }
  get() {
    return compileUtil.getVal(this.vm, this.expr)
  }
  update() {
    const value = compileUtil.getVal(this.vm, this.expr)
    if (value !== this.oldValue) {
      this.cb(value)
    }
  }
}

class Compiler {
  constructor(el, vm) {
    // 获取DOM模板
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
    let fragment = this.node2Fragment(this.el)
    this.compile(fragment)
    this.el.appendChild(fragment)
  }
  compile(node) {
    const childNodes = node.childNodes
    Array.from(childNodes).forEach((child) => {
      if (this.isElementNode(child)) {
        this.compileElement(child)
        // 递归
        if (child.childNodes && child.childNodes.length) {
          this.compile(child)
        }
      } else {
        this.compileText(child)
      }
    })
  }
  compileElement(node) {
    const attrs = node.attributes
    Array.from(attrs).forEach((attr) => {
      const { name, value: expr } = attr
      if (this.isDirective(name)) {
        const [, directive] = name.split('-')
        compileUtil[directive](node, expr, this.vm)
      }
    })
  }
  compileText(node) {
    const content = node.textContent
    const reg = /\{\{(.+?)\}\}/
    if (reg.test(content)) {
      compileUtil['text'](node, content, this.vm)
    }
  }
  node2Fragment(el) {
    let fragment = document.createDocumentFragment()
    let firstchild
    while ((firstchild = el.firstChild)) {
      fragment.appendChild(firstchild)
    }
    return fragment
  }
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }
  isElementNode(node) {
    return node.nodeType === 1
  }
}

class Observer {
  constructor(data) {
    this.observer(data)
  }
  observer(data) {
    if (data !== null && typeof data === 'object') {
      Object.keys(data).forEach((key) => {
        this.defineReactive(data, key, data[key])
      })
    }
  }
  defineReactive(data, key, value) {
    // 递归
    this.observer(value)
    Object.defineProperty(data, key, {
      get() {
        console.log('get: ', value)
        return value
      },
      set: (newVal) => {
        this.observer(newVal)
        if (newVal !== value) {
          value = newVal
        }
        console.log('set: ', value)
      }
    })
  }
}

const compileUtil = {
  getVal(vm, expr) {
    return expr.split('.').reduce((current, next) => current[next], vm.$data)
  },
  model(node, expr, vm) {
    const value = this.getVal(vm, expr)
    this.updator.modelUpdator(node, value)
  },
  html() {},
  text(node, expr, vm) {
    const content = expr.replace(/\{\{(.+?)\}\}/g, (...args) =>
      this.getVal(vm, args[1].trim())
    )
    this.updator.textUpdator(node, content)
  },
  updator: {
    modelUpdator(node, value) {
      node.value = value
    },
    htmlUpdator() {},
    textUpdator(node, value) {
      node.textContent = value
    }
  }
}

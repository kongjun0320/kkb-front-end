class KVue {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data

    if (this.$el) {
      // 编译
      new Compiler(this.$el, this)
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
        console.log('element--', node)
        const [, directive] = name.split('-')
        compileUtil[directive](node, expr, this.vm)
      }
    })
  }
  compileText(node) {
    const content = node.textContent
    const reg = /\{\{(.+?)\}\}/
    if (reg.test(content)) {
      console.log('text--', content)
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

const compileUtil = {
  getVal(vm, expr) {},
  model(node, expr, vm) {
    const value = this.getVal(vm, expr)
    this.updator.modelUpdator(node, value)
  },
  html() {},
  text() {},
  upator: {
    modelUpdator(node, value) {
      node.value = value
    },
    htmlUpdator() {}
  }
}

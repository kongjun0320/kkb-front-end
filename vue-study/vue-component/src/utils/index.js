export const Bus = class Bus {
  constructor() {
    // { name: ['handler1', 'handler2'] }
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

<template>
  <div class="k-input">
    <input v-bind="$attrs" :type="type" :value="value" @input="onInput" />
  </div>
</template>

<script>
export default {
  name: 'KInput',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    dispatch(componentName, eventName) {
      let parent = this.$parent || this.$root
      // element-ui的源码是使用componentName自定义的属性表示组件名
      let name = parent.$options.name

      while (parent && name !== componentName) {
        parent = parent.$parent

        if (parent) {
          name = parent.$options.name
        }
      }
      if (parent) {
        parent.$emit(eventName)
      }
    },
    onInput(e) {
      this.$emit('input', e.target.value)
      // 分发校验 this.$parent不严谨
      // console.log(this.$parent.$options.name)
      // this.$parent.$emit('validate')
      this.dispatch('KFormItem', 'validate')
    }
  }
}
</script>

<style lang="scss" scoped></style>

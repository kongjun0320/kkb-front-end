<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'KForm',
  provide() {
    return {
      form: this
    }
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: Object
  },
  methods: {
    validate(cb) {
      // this.$children不严谨
      const tasks = this.$children
        .filter((item) => item.prop)
        .map((item) => item.validate())
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false))
    }
  }
}
</script>

<style lang="scss" scoped></style>

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
    onInput(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped></style>

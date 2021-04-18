<template>
  <div class="k-form-item">
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'KFormItem',
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      error: 'some error'
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  color: #f00;
}
</style>

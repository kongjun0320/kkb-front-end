<template>
  <div class="k-form-item">
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import Schema from 'async-validator'
export default {
  name: 'KFormItem',
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      error: ''
    }
  },
  mounted() {
    this.$on('validate', () => {
      this.validate()
    })
  },
  methods: {
    validate() {
      const rule = this.form.rules[this.prop]
      const value = this.form.model[this.prop]
      const schema = new Schema({ [this.prop]: rule })
      return schema.validate({ [this.prop]: value }, (errors) => {
        if (errors) {
          this.error = errors[0].message
        } else {
          this.error = ''
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  color: #f00;
}
</style>

<template>
  <div class="form">
    <k-form-item label="用户名">
      <k-input placeholder="请输入用户名" v-model="inputValue" />
    </k-form-item>
    <k-input placeholder="请输入密码" type="password" v-model="inputValue" />
  </div>
</template>

<script>
import KInput from './KInput.vue'
import KFormItem from './KFormItem'
export default {
  components: { KInput, KFormItem },
  name: 'Form',
  data() {
    return {
      inputValue: ''
    }
  }
}
</script>

<style lang="scss" scoped></style>

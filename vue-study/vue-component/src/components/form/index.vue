<template>
  <div class="form">
    <k-form :model="model" :rules="rules" ref="loginForm">
      <k-form-item label="用户名" prop="username">
        <k-input placeholder="请输入用户名" v-model="model.username" />
      </k-form-item>
      <k-form-item label="密码" prop="password">
        <k-input
          placeholder="请输入密码"
          type="password"
          v-model="model.password"
        />
      </k-form-item>
      <k-form-item>
        <button @click="login">登录</button>
      </k-form-item>
    </k-form>
  </div>
</template>

<script>
import KInput from './KInput.vue'
import KFormItem from './KFormItem'
import KForm from './KForm'
import Notice from '../notice'
import { create } from '../../utils'
export default {
  components: { KInput, KFormItem, KForm },
  name: 'Form',
  data() {
    return {
      model: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码'
          }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.loginForm.validate((isValid) => {
        if (isValid) {
          alert('登录')
        } else {
          create(Notice, {
            title: 'hello'
          }).show()
          // alert('用户名/密码错误')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>

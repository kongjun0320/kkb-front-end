<template>
  <div>
    <button @click="login" v-if="isLogin">登录</button>
    <button @click="logout" v-else>注销</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    login() {
      console.log(this.$route.query)
      window.isLogin = true
      this.$router.addRoutes([
        {
          path: '/admin',
          name: 'Admin',
          meta: {
            auth: true
          },
          component: () => import('@/views/admin'),
          children: [
            {
              path: 'course/:name',
              name: 'detail',
              component: () => import('@/views/detail')
            }
          ]
        }
      ])
      this.$router.push(this.$route.query.redirect)
    },
    logout() {
      window.isLogin = false
    }
  },
  computed: {
    isLogin() {
      return !window.isLogin
    }
  }
}
</script>

<style lang="scss" scoped></style>

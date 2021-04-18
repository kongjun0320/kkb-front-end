<template>
  <div>
    <button @click="_login">登录</button>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  name: 'Login',
  computed: {
    ...mapState({
      isLogin: (state) => state.user.isLogin
    })
  },
  mounted() {
    console.log(this.isLogin)
  },
  methods: {
    ...mapActions({ loginAction: 'user/login' }),
    ...mapMutations({ loginMutation: 'user/login' }),
    _login() {
      // this.$store.dispatch('user/login', true).then(() => {
      //   this.$router.push(this.$route.query.redirect)
      // })

      this.loginAction(true).then(() => {
        this.$router.push(this.$route.query.redirect)
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>

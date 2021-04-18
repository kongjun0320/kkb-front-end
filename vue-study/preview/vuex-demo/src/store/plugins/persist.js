export default (store) => {
  if (localStorage) {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      store.commit('user/login', user.username)
    }
  }

  store.subscribe((mutations, state) => {
    console.log(mutations.type)
    if (mutations.type === 'user/login') {
      const user = JSON.stringify({ username: 'tom' })
      localStorage.setItem('user', user)
    }
  })
}

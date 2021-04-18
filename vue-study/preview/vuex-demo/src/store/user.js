const state = {
  isLogin: false,
  user: {
    username: 'jack'
  }
}
const getters = {
  welcome(state) {
    return 'welcome ' + state.isLogin && 'jack'
  }
}
const mutations = {
  login(state, payload) {
    // state.isLogin = payload
    state.user = { username: payload }
  }
}
const actions = {
  login({ commit }, payload) {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        commit('login', payload)
        resolve()
      }, 1000)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

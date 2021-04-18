import Vue from 'vue'
import Vuex from 'vuex'
import persist from './plugins/persist'

import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [persist],
  modules: { user }
})

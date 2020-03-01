import Vue from 'vue'
import Vuex from 'vuex'

// modules
import app from './modules/app'
import user from './modules/user'

// getters
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
  },
  getters
})

export default store
import Vue from 'vue'
import Vuex from 'vuex'

// modules
import app from './modules/app'
import user from './modules/user'
import cart from './modules/cart'
import address from './modules/address'

// getters
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    cart,
    address,
  },
  getters
})

export default store
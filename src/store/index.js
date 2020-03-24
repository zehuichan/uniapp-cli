import Vue from 'vue'
import Vuex from 'vuex'

// modules
import app from './modules/app'
import user from './modules/user'
import cart from './modules/cart'
import address from './modules/address'
import coupon from './modules/coupon'

// getters
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    cart,
    address,
    coupon,
  },
  getters
})

export default store

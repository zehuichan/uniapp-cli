import Vue from 'vue'

import './static/scss/index.scss'

import App from './App'
import store from './store/index'

// utils
import {
  _navigateTo,
  _redirectTo,
  _reLaunch
} from './utils/index.js'

// 高德地图API
import AmapPlugin from './plugins/amap/index'

Vue.use(AmapPlugin)

import * as filters from './filters'

// register global utility filters.
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Vue.prototype.$store = store
Vue.prototype.$navigateTo = _navigateTo
Vue.prototype.$redirectTo = _redirectTo
Vue.prototype.$reLaunch = _reLaunch

// TIM相关
import './tim'

App.mpType = 'app'

Vue.config.productionTip = false

const app = new Vue({
  store,
  ...App
})
app.$mount()

import Vue from 'vue'

import './static/scss/index.scss'

import App from './App'
import store from './store'

// utils
import {_navigateTo} from './utils'
// wxcomponents
import Toast from './wxcomponents/vant/dist/toast/toast'

Toast.setDefaultOptions({
  duration: 800
})

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

App.mpType = 'app'

Vue.config.productionTip = false

const app = new Vue({
  store,
  ...App
})
app.$mount()

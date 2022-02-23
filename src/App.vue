<script>
// vue
import Vue from 'vue'
// vuex
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['items_length'])
  },
  watch: {
    items_length: {
      handler(val) {
        uni.setTabBarBadge({
          index: 3,
          text: val + ''
        })
      },
      immediate: true
    }
  },
  onLaunch() {
    console.log('App Launch')
    uni.getSystemInfo({
      success(e) {
        // #ifndef MP
        Vue.prototype.StatusBar = e.statusBarHeight
        if (e.platform == 'android') {
          Vue.prototype.CustomBar = e.statusBarHeight + 50
        } else {
          Vue.prototype.CustomBar = e.statusBarHeight + 45
        }
        // #endif

        // #ifdef MP-WEIXIN
        Vue.prototype.StatusBar = e.statusBarHeight
        let custom = wx.getMenuButtonBoundingClientRect()
        Vue.prototype.Custom = custom
        Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight
        // #endif

        // #ifdef MP-ALIPAY
        Vue.prototype.StatusBar = e.statusBarHeight
        Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight
        // #endif
      }
    })
  },
  onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  }
}
</script>

<style>
/*每个页面公共css */
@import './wxcomponents/vant/dist/common/index.wxss';
</style>

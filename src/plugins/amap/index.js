import amap from './amap-wx.js'
// 您申请的key值
const key = 'b23463f24d425daab4efb26562ffa905'

export default {
	install(Vue) {
		Vue.prototype.$amap = new amap.AMapWX({
			key: key
		})
	}
}

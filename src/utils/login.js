// 判断是否登录 judge:（默认值） 如果未登录询问是否登录  force：未登录直接强制登录
export default function judgeLogin(type = 'judge') {
  // 获取用户信息，判断是否登录
  const user = uni.getStorageSync('user')
  return new Promise((resolve, reject) => {
    if (user) {
      resolve()
    } else if (!user) {
      if (type === 'force') {
        uni.navigateTo({
          url: '/pages/auth/login',
          animationType: 'slide-in-bottom',
          animationDuration: 300
        })
      } else {
        uni.showModal({
          title: '提示',
          content: '您还未登录，请先登录~',
          confirmText: '去登录',
          cancelText: '再逛会',
          success: (res) => {
            if (res.confirm) {
              uni.navigateTo({
                url: '/pages/auth/login',
                animationType: 'slide-in-bottom',
                animationDuration: 300
              })
            }
          }
        })
      }
    }
  })
}

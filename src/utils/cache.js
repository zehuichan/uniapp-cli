//缓存的Key
export const Keys = {
  uuid: 'uuid',
  wxopenid: 'wxopenid',
  user: 'user',
  wxauth: 'wxauth',
  loginResult: 'loginResult',
  accessToken: 'accessToken',
  searchHistory: 'searchHistory',
  refreshToken: 'refreshToken',
  tokenExpTime: 'tokenExpTime',
  site: 'site'
}

class Cache {
  setItem(key, value) {
    try {
      uni.setStorageSync(key, value)
      if (key === Keys.accessToken) {
        uni.setStorageSync(Keys.tokenExpTime, new Date().getTime())
      }
    } catch (e) {
      console.log(e)
    }
  }

  getItem(key) {
    return uni.getStorageSync(key)
  }

  removeItem(key) {
    return uni.removeStorageSync(key)
  }

  /**
   * 登录后的会员信息
   * @return {如果返回null，则需要重新登录}
   */
  user() {
    const user = uni.getStorageSync(Keys.user)
    if (user === '' || user === null) {
      return null
    }
    return user
  }
}


export default new Cache()

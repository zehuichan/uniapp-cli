class Cache {
  setItem(key, value) {
    try {
      uni.setStorageSync(key, value)
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
}


export default new Cache()

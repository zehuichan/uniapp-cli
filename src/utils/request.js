const config = require('../../config')

function http({ url, data, header = {}, method, timeout = 60 * 1000, dataType }) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${config.BASE_API}${url}`,
      data: data,
      header: header,
      method: method,
      timeout: timeout,
      dataType: dataType,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

export default http

const Fly = require('flyio/dist/npm/wx')

//创建fly实例
const http = new Fly()

http.config.baseURL = 'https://iot.gaobat.com:8443/thingsnet'
http.config.timeout = 5000

http.interceptors.request.use(
  config => {
    console.log(config.body)
    return config
  },
  error => {
    console.log(`err,${error}`)
    Promise.reject(error)
  },
)

http.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log(`err,${error}`)
    return Promise.reject(error)
  }
)

export default http

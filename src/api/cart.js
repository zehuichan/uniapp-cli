import request from '@/utils/request'

export function test(data = {}) {
  return request({
    url: 'http://www.baidu.com',
    data,
    method: 'GET'
  })
}

import request from '@/utils/request'

export function getProducts() {
  return request.get('/uniapp-mall/gateway/products')
}

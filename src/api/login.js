// 用户相关请求模块
import request from '@/utils/request.js'
const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
export default login

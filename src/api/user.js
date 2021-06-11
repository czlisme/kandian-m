// 用户相关请求模块
import request from '@/utils/request.js'
// 登录功能
const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
// 发送验证码
const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
// 获取用户自己的信息
const getUserInfo = data => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}
export { login, sendSms, getUserInfo }

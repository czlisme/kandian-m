import request from '@/utils/request'
const getAllChannels = () => {
  return request({
    url: '/app/v1_0/channels',
    method: 'GET'
  })
}
const addMyChannel = (channel) => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels: [channel]
    }
  })
}
const deleteMyChannel = (channel) => {
  return request({
    url: `/app/v1_0/user/channels/${channel.id}`,
    method: 'DELETE'
  })
}
export { getAllChannels, addMyChannel, deleteMyChannel }

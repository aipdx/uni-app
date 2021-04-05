import { request } from '../utils/request'
export function getVideo(data) {
  return request({
    customUrl: 'http://157.122.54.189:9088/videoimg/v1/videowp/featured',
    method: 'get',
    data // 都是data，没有params
  })
}